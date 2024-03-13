import {Component} from '@angular/core';
import {listService, my_prescription, Service} from "src/app/models/Utils/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "src/app/services/utils/utils.service";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {NotifService} from "src/app/services/notification/notif.service";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {PersonneInterface} from "src/app/models/personne.interface";
import {
  NouveauPatientComponent
} from "../../../personnes/dialogs/nouveau-patient-form-dialog/nouveau-patient.component";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";

@Component({
  selector: 'app-new-payment-form-dialog',
  templateUrl: './new-payment-form-dialog.component.html',
  styleUrls: ['./new-payment-form-dialog.component.sass']
})
export class NewPaymentFormDialogComponent {
  titleForm = "Nouveau Paiement";
  formDesc = "Veuillez remplir ce formulaire pour effectuer un paiement";
  btnText = "Valider";
  isConfirmLoading = false;
  listOfService!: Service[];
  dossierData?: DossierMedicalInterface
  myServicesList!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  listPrescription!: any;
  listOfPole!: PoleInterface[];
  listOfPrestation!: PrestationInterface[];
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

  prestationForm: FormGroup = this.fb.group({
    service: ['', Validators.required],
    dossier: ['', Validators.required],
    diagnostic:['', Validators.required],
    conclusion:['', Validators.required],
    prerequis: ['', Validators.required],
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private fb: FormBuilder,
              private utils: UtilsService,
              private apiPrestation : PrestationService,
              private api: PrestationService,
              private dossierMApi: DossierMedicalService,
              private serviceApi: CliniqueServiceService,
              private notify: NotifService
  ) {
  }
  ngOnInit(): void {

    this.listOfService = listService;
    this.listPrescription = my_prescription;
    this.loadPatients();

    this.apiPrestation.getAll().subscribe({
      next : value => {
        this.listOfPrestation = value.reponse as PrestationInterface[]
      }
    })

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

  loadPatients(patientId?: number) {
    this.dossierMApi.getAll().subscribe({
      next: result => {
        this.listOfDossierMedical = result.filter(dossier => !!dossier.patient?.personne);
        const patient = this.modal.getConfig().nzData;
        if (patient) {
          this.dossierData = this.listOfDossierMedical.find(d => d.patient?.id === patient.id)!;
        } else if (patientId) {
          this.dossierData = this.listOfDossierMedical.find(d => d.patient?.id === patientId)!;
        }
        if (this.dossierData) {
          this.prestationForm.controls['dossier'].setValue(this.dossierData.id);
        }
      }
    });
  }

  handleCancel(code?: string) {
    this.modal.close(code);
  }


  addPrestation() {

    if (this.prestationForm.valid) {
      this.isConfirmLoading = true;
      const formData = this.prestationForm.value;

      const prestation = this.createPrestationFromForm(formData);

      this.api.save(prestation).subscribe({
        next: (response) => {
          console.log('TYPE DE ', typeof Number(formData.dossier));
          console.log('NOMBRE CHOISI ', Number(formData.dossier));
          this.notify.snackMessage(
            `Prestation pour le patient ${this.getPatientFullName(Number(formData.dossier), 'adding')} ajouté avec succès`,
            3000, 'success');
          console.log('Prestation enregistrée avec succès ', response);
          this.prestationForm.reset();
          if (this.dossierData)  {
            this.prestationForm.controls['dossier'].setValue(this.dossierData.id);
          }
          this.handleCancel('toPrestations');

        },
        error: (error) => {
          console.log(error);
          this.isConfirmLoading = false;
        },
        complete: () => {this.isConfirmLoading = false}
      });
    }
  }

  triggerFileUpload() {
    document.getElementById('file_uploader')!.click();
  }

  getEvent(event: Event) {
    console.log('EVENEMENT RECUPERER FICHIER ', event);
  }

  createPrestationFromForm(formData: any): PrestationInterface {
    const cout  = this.listOfService.find(s => s.id === formData.service)?.cout ?? 12000;
    return {
      cout, // Supposé fixe, peut être ajusté en fonction de la logique de votre application
      montant: cout,
      prerequisities: formData.prerequis, // Peut être ajusté ou récupéré du formulaire si nécessaire
      diagnostic: formData.diagnostic,
      conclusion: formData.conclusion,
      //personnel: { id: 3 }, // L'ID doit correspondre à la logique de votre application
      dossierMedical: { id: formData.dossier }, // L'ID doit correspondre à la logique de votre application
      service: { id: formData.service } // Supposé que le service dans le formulaire est l'ID
    };
  }

  getPatientFullName(dossier: DossierMedicalInterface | number, context ?: string):string {
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

  displayEvent(event: Event) {
    console.log(event);
  }

  addNewPatient() {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 700,
      nzCentered: true
    }).afterClose.subscribe((result: any) => {
      this.dossierData = undefined;
      console.log('Données reçues du modal :', result);
      this.loadPatients(result);
      // this.prestationForm.controls.dossier.setValue(result)
    });
  }

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.myServicesList.filter(s => s.pole?.id === pole.id);
  }
}
