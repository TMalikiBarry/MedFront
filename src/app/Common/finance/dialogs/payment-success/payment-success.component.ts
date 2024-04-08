import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.sass']
})
export class PaymentSuccessComponent implements OnInit {

  paymentToken!: string;
  commandNumber!: string;
  amount!: number;
  transactionAmount!: number;
  totalAmount!: number;
  errorCode!: number;
  paymentDate!: Date;
  formattedPaymentDate!: string;
  // fee = 1.5% of the amount
  fee!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentToken = params['num_transaction_from_gu'];
      this.commandNumber = params['num_command'];
      this.amount = parseFloat(params['amount']);
      this.errorCode = parseInt(params['errorCode'])
      this.paymentDate = new Date();
      this.formattedPaymentDate = this.formatDate(this.paymentDate);
      this.fee = Math.ceil(this.amount * 0.015);
      // Transaction amount doit etre amount - 1,5% mais le calcul doit pas avoir de virgule
      this.transactionAmount = Math.ceil(this.amount / 1.015);

    });
  }

  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // downloadInvoice(): void {
  //   const doc = new jsPDF();
  //   const cardElement = document.getElementById('card')!;
  //
  //   html2canvas(cardElement).then(canvas => {
  //     const imageData = canvas.toDataURL('image/png');
  //     doc.addImage(imageData, 'PNG', 10, 10, 190, 150);
  //     doc.save('invoice.pdf');
  //   });
  // }

  goToPaymentPage(): void {
    this.router.navigate(['/admin/finance/transactions']);
  }

  handleCancel() {
    this.router.navigate(['/admin/finance/transactions'])
  }
}
