import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.sass']
})
export class PaymentFailedComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  retryPayment(): void {
    // Remplacez '/payment' par le chemin de votre page de paiement
    this.router.navigate(['/login']);
  }
}
