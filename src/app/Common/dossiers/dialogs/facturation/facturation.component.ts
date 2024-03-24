import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "src/app/services/transaction/transaction.service";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {ApiResponseInterface} from "src/app/models/api-response.interface";
import {ParametreService} from "src/app/services/parametre/parametre.service";
import {ParametreInterface} from "src/app/models/parametre.interface";
import {ServiceInterface} from "src/app/models/service.interface";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {PersonneInterface} from "src/app/models/personne.interface";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {NotifService} from "src/app/services/notification/notif.service";
import {Observable} from "rxjs";


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
  btnText = "Payer";
  parametres !: ParametreInterface[]
  agency_code  = 'CGFB23069'
  domain_name = 'gutouch.net';
  secure_code = 'SMBbr8S6zlUULluHeG6rVS5YBMhN8AV0M0H6JXYdVq4IkxTusH';
  showFinalStep = false;
  dossierData?: DossierMedicalInterface;

  myServicesList!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  listOfPole!: PoleInterface[];

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

  nomAssuranceCtrl!: FormControl;
  tauxAssuranceCtrl!: FormControl;
  showAssuranceForm$!: Observable<boolean>;
  moyenPaiementCtrl!: FormControl;
  showMoyenPaiementCtrl$!: Observable<boolean>

  FacForm!: FormGroup;

  constructor(private modal: NzModalRef,
              private parametreService : ParametreService,
              private transactionService : TransactionService,
              private fb: FormBuilder,
              private dossierMApi: DossierMedicalService,
              private serviceApi: CliniqueServiceService,
              private notify: NotifService) {
  }

  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData as PrestationInterface
    console.log("Data " + this.data);
    this.initFormControls();
    this.loadParametre();
    this.loadTouchPayScript();
    this.loadPatients();
    this.serviceApi.getAllService().subscribe({
      next: result => {
        this.myServicesList = result.reponse as ServiceInterface[];
        /*this.listOfPole = this.myServicesList.map(s => {
          // return this.listOfPole.some( p => p.id == s.pole?.id) ? s.pole : undefined
          return s.pole!
        });*/
        this.listOfPole = this.myServicesList
          .map(s => s.pole!) // Créez un tableau de tous les pôles
          .filter((pole, index, self) =>
            pole && self.findIndex(p => p.id === pole.id) === index
          ); // Filtrez pour ne garder que les pôles uniques

      },
      error: () => {
        this.modal.close();
      }
    })
  }

  initFormControls() {
    this.nomAssuranceCtrl = this.fb.control('');
    this.tauxAssuranceCtrl = this.fb.control('');
    /*
        this.assuranceForm = this.fb.group({
          referentielPartenaire: this.nomAssuranceCtrl,
          couverture: this.tauxAssuranceCtrl
        });
    */
    this.moyenPaiementCtrl = this.fb.control('', Validators.required)

    this.FacForm = this.fb.group({
      estAssure: '',
      parUnTiers: '',
      referentielPartenaire: this.nomAssuranceCtrl,
      couverture: this.tauxAssuranceCtrl,
      prestation: '',
      dossier: '',
      service: '',
      amount: '',
      // assurance: this.assuranceForm,
      moyenPayment: this.moyenPaiementCtrl,
      transactionAmount: '',
      transactionType: 'ENCAISSEMENT'
    })
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
    this.isConfirmLoading = true;
    this.FacForm.controls['prestation'].setValue(this.data)
    console.log(this.FacForm.value)
    let trans = this.FacForm.value
    let moyen = ''
    if (this.FacForm.controls['moyenPayment'].value) {
      moyen = this.FacForm.controls['moyenPayment'].value
    }

    // Appeler le service pour créer la transaction
    this.transactionService.saveTransaction(trans, moyen).subscribe(
      {
        next: (response: ApiResponseInterface) => {
          let transaction = response.reponse
          if (moyen != "CASH")
            this.touchPay(transaction)
          this.modal.close()
        },
        error: (error) => {
          console.log(error);
          this.isConfirmLoading = false;
        },
        complete: () => {
          this.isConfirmLoading = false
        }
      }
    );
  }

  loadParametre() {
    this.parametreService.getParametreByCode("AGENCY_CODE").subscribe({
      next : value => {
        this.agency_code = value.reponse.stringValue
      }
    })

    this.parametreService.getParametreByCode("DOMAINE_NAME").subscribe({
      next : value => {
        this.domain_name = value.reponse.stringValue
      }
    })

    this.parametreService.getParametreByCode("SECURE_CODE").subscribe({
      next : value => {
        this.secure_code = value.reponse.stringValue
      }
    })
    this.parametreService.getParametreByCode("URL_REDIRECTION_SUCCESS").subscribe({
      next : value => {
        this.url_redirection_success = value.reponse.stringValue
      }
    })

    this.parametreService.getParametreByCode("URL_REDIRECTION_FAILED").subscribe({
      next : value => {
        this.url_redirection_failed = value.reponse.stringValue
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

  loadPatients(patientId?: number) {
    this.dossierMApi.getAll().subscribe({
      next: result => {
        this.listOfDossierMedical = result.filter(dossier => !!dossier.patient?.personne);
        const prestation: PrestationInterface = this.modal.getConfig().nzData;
        if (prestation) {
          this.dossierData = this.listOfDossierMedical.find(d => d.id === prestation.dossierMedical!.id)!;
          this.FacForm.controls['prestation'].setValue(prestation.id!);
          this.FacForm.controls['service'].setValue(prestation.service!.id);
          this.FacForm.controls['amount'].setValue(prestation.montant);
          this.FacForm.controls['transactionAmount'].setValue(prestation.montant);
        } else if (patientId) {
          this.dossierData = this.listOfDossierMedical.find(d => d.patient?.id === patientId)!;
        }
        if (this.dossierData) {
          this.FacForm.controls['dossier'].setValue(this.dossierData.id!);
        }
      }
    });
  }

  getPatientFullName(dossier: DossierMedicalInterface | number, context ?: string): string {
    // Vérifier si dossier est un objet (et donc potentiellement un DossierMedicalInterface)
    let personne: PersonneInterface | undefined;

    if (dossier !== null && typeof dossier !== 'number') {
      // Supposons que si 'dossier' a une propriété 'patient', c'est un DossierMedicalInterface
      if ('patient' in dossier && dossier.patient?.personne) {
        personne = dossier.patient.personne;
        if (context) {
          console.log('DOSSIER CHOISI ', dossier);
          console.log('PERSONNE CORRESPONDANT ', personne);
        }
      }
    } else {  // Ici, vous pouvez gérer le cas où dossier est un number
      personne = this.listOfDossierMedical.find(d => d.id === dossier)?.patient?.personne;
    }

    return `${personne!.prenom} ${personne!.nom}`;
    // Gérer les cas non couverts ou retourner une valeur par défaut
    // return 'Default Name'
  }

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.myServicesList.filter(s => s.pole?.id === pole.id);
  }

}
