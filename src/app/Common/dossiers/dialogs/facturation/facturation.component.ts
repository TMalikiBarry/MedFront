import {Component, OnInit} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {TransactionService} from "../../../../services/transaction/transaction.service";
import {PrestationInterface} from "../../../../models/prestation.interface";
import {ApiResponseInterface} from "../../../../models/api-response.interface";
import {ParametreService} from "../../../../services/parametre/parametre.service";
import {ParametreInterface} from "../../../../models/parametre.interface";


declare global {
  interface Window {
    SendPaymentInfos: Function;
  }
}

declare function sendPaymentInfos(
  order_number: string,
  agency_code: string | undefined,
  secure_code: string | undefined,
  domain_name: string | undefined,
  url_redirection_success: string | undefined,
  url_redirection_failed: string | undefined,
  transactionAmount: number,
  city: string,
  email: string,
  clientFirstName: string,
  clientLastName: string,
  clientPhone: string,
): void;



@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.sass']
})
export class FacturationComponent implements OnInit{
  data : any
  titleForm = "Facturation";
  isConfirmLoading = false;
  formDesc = "Veuillez remplir ce formulaire pour effectuer une facturation";
  btnText = "Enregistrer";
  parametres !: ParametreInterface[]
  agency_code  = 'CGFB23069'
  domain_name = 'gutouch.net';
  secure_code = 'SMBbr8S6zlUULluHeG6rVS5YBMhN8AV0M0H6JXYdVq4IkxTusH';

  // TODO a revoir
  url_redirection_success = 'https://dev-touch-ssii.gutouch.net/touchmedportal/admin/finance/paymentsuccess';
  url_redirection_failed = 'https://dev-touch-ssii.gutouch.net/touchmedportal/admin/finance/paymentfailed';

  listMoyenPayment = [
    {
      libelle: "Orange Money",
      code: "ORANGE_MONEY"
    },
    {
      libelle: "Wave",
      code: "WAVE"
    },
    {
      libelle: "Free Money",
      code: "FREE_MONEY"
    },
    {
      libelle: "Carte Bancaire",
      code: "CARTE_BANCAIRE"
    },
    {
      libelle: "Cash / TouchPoint",
      code: "CASH_TOUCHPOINT"
    },
    {
      libelle: "Cash",
      code: "CASH"
    },

  ];

  FacForm = this.fb.group({
    prestation : '',
    moyenPayment : '',
    transactionType : 'ENCAISSEMENT'
  })

  constructor(private modal: NzModalRef,
              private parametreService : ParametreService,
              private transactionService : TransactionService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData as PrestationInterface
    console.log("Data "+this.data)
    this.loadParametre();
    this.loadTouchPayScript()
  }

  handleCancel() {
    this.modal.close()
  }

  handleOk() {
    // this.FacForm.controls.prestation.setValue(this.data)
    this.makePayment()
    // complete: () => {this.isConfirmLoading = false}
  }

  makePayment(): void {
    this.FacForm.controls.prestation.setValue(this.data)
    console.log(this.FacForm.value)
    let trans = this.FacForm.value
    let moyen = ''
    if(this.FacForm.controls.moyenPayment.value){
      moyen = this.FacForm.controls.moyenPayment.value
    }

    // Appeler le service pour créer la transaction
    this.transactionService.saveTransaction(trans, moyen).subscribe(
      (response : ApiResponseInterface) => {
        let transaction = response.reponse
        if(moyen != "CASH")
          this.touchPay(transaction)
        this.modal.close()
      }
    );
  }

  loadParametre() {
    this.parametreService.getAllParametre().subscribe({
      next : value => {
        this.parametres = value.reponse
      }
    })
  }

  loadTouchPayScript(): void {
    const script = document.createElement('script');
    script.src = 'https://touchpay.gutouch.net/touchpayv2/script/prod_touchpay-0.0.1.js';
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('TouchPay script loaded successfully');
      // Appel de la méthode makePayment() ici pour s'assurer que le script est chargé avant d'ouvrir la fenêtre de paiement
        // this.makePayment();
    };
    script.onerror = () => {
      console.error('Failed to load TouchPay script');
    };
    document.body.appendChild(script);
  }

  private touchPay(transaction: any) {
    // Ouvrir la fenêtre de paiement TouchPay Web
    const {
      token = transaction.token,
      amount = transaction.amount,
      city = transaction.prestation.dossierMedical.patient.personne.adresse,
      email = transaction.prestation.dossierMedical.patient.personne.email,
      clientFirstName = transaction.prestation.dossierMedical?.patient?.personne.prenom ,
      clientLastName = transaction.prestation.dossierMedical?.patient?.personne.nom ,
      clientPhone = transaction.prestation.dossierMedical?.patient?.personne.telephone,
    } = transaction;
    console.log("transaction after save "+JSON.stringify(transaction))
    const order_number = token;
    console.log("Constitution des éléménts")
    sendPaymentInfos(
      order_number,
      this.agency_code,
      this.secure_code,
      this.domain_name,
      this.url_redirection_success,
      this.url_redirection_failed,
      amount,
      city,
      email,
      clientFirstName,
      clientLastName,
      clientPhone
    );
    console.log("Envoie des éléménts")
    // Mettre à jour le compte client après la transaction réussie
    window.SendPaymentInfos = () => {
      console.log("Dans la fenetre")
      // Ajouter le numéro de compte à la transaction avant la mise à jour
      //transaction.accountNumber = this.accountNumber;
      console.log("Ecoute call back")
      // this.transactionService.handleCallBack('success', this.accountNumber).subscribe(
      //   (response) => {
      //     // Gérer la réponse du service
      //     console.log('Réponse du service :', response);
      //
      //     this.operationsService.depot({ montant: transactionAmount, numeroCompte: this.accountNumber }).subscribe(
      //       (response) => {
      //         // Gérer la réponse du service
      //         console.log('Réponse du service :', response);
      //       },
      //       (error) => {
      //         // Gérer l'erreur
      //         console.log('Erreur lors de la mise à jour du compte client :', error);
      //       }
      //     );
      //   },
      //   (error) => {
      //     // Gérer l'erreur
      //     console.log('Erreur lors de la mise à jour du compte client :', error);
      //   }
      // );
    };
  }
}
