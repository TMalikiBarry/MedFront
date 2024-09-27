import {Component, OnInit} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {listService, my_prescription, Service} from "src/app/models/Utils/constants";
import {UtilsService} from "src/app/services/utils/utils.service";
import {PrestationInterface, PrestationStatut} from "src/app/models/prestation.interface";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {NotifService} from "src/app/services/notification/notif.service";
import {PersonneInterface} from "src/app/models/personne.interface";

import {
  NouveauPatientComponent
} from "../../../personnes/dialogs/nouveau-patient-form-dialog/nouveau-patient.component";
import {PoleInterface} from "src/app/models/pole.interface";
import {ProfilService} from "../../../../services/Profil/profil.service";

@Component({
  selector: 'app-prestation-form-dialog',
  templateUrl: './prestation-form-dialog.component.html',
  styleUrls: ['./prestation-form-dialog.component.sass']
})
export class PrestationFormDialogComponent implements OnInit{

  titleForm = "Nouvelle prestation";
  formDesc = "Veuillez remplir ce formulaire pour ajouter une prestation";
  btnText = "Valider";
  isConfirmLoading = false;
  listOfService!: Service[];
  dossierData?: DossierMedicalInterface
  myServicesList!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  listPrescription!: any;
  listOfPole!: PoleInterface[];
  prestationToUpdate!: PrestationInterface;

  prestationForm: FormGroup = this.fb.group({
    service: ['', Validators.required],
    dossier: ['', Validators.required],
    diagnostic: '',
    conclusion: '',
    prerequis: '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private fb: FormBuilder,
              private utils: UtilsService,
              private api: PrestationService,
              private dossierMApi: DossierMedicalService,
              private serviceApi: CliniqueServiceService,
              private notify: NotifService,
              private profilService: ProfilService
              ) {
  }
  ngOnInit(): void {

    this.listOfService = listService;
    this.listPrescription = my_prescription;
    this.loadPatients();
    const data = this.modal.getConfig().nzData;
    if (data && data.context && data.context === 'PUT_PRESTATION') {
      this.prestationToUpdate = data;
      this.titleForm = 'Modification Prestation'
      this.formDesc = this.formDesc.replace('ajouter une', 'modifier la');
      this.setForm();
    }

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
        if (patient && patient.contactEnCasUrgent) {
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

  addPrestation() {

    if (this.prestationForm.valid) {
      this.isConfirmLoading = true;
      const formData = this.prestationForm.value;

      const prestation = this.createPrestationFromForm(formData);
      if (this.prestationToUpdate) {
        prestation.id = this.prestationToUpdate.id;
        prestation.personnel = this.prestationToUpdate.personnel;
        prestation.dateCreation = this.prestationToUpdate.dateCreation;
        prestation.supprime = this.prestationToUpdate.supprime;

        this.updatePrestation(prestation);
        return;
      }

      this.api.save(prestation).subscribe({
        next: (response) => {

          this.notify.snackMessage(
            `Prestation pour le patient ${this.getPatientFullName(Number(formData.dossier), 'adding')} ajouté avec succès`,
            3000, 'success');
          this.prestationForm.reset();
          if (this.dossierData)  {
            this.prestationForm.controls['dossier'].setValue(this.dossierData.id);
          }
          this.handleCancel('toPrestations');

        },
        error: (error) => {
          console.error(error);
          this.isConfirmLoading = false;
        },
        complete: () => {this.isConfirmLoading = false}
      });
    }
  }

  handleCancel(code?: string) {
    this.modal.close(code);
  }

  createPrestationFromForm(formData: any): PrestationInterface {
    const cout = this.myServicesList.find(s => s.id === formData.service)?.cout ?? 10000;
    return {
      cout,
      montant: cout,
      prestationStatut: PrestationStatut.NOTPAID,
      prerequisities: formData.prerequis, // Peut être ajusté ou récupéré du formulaire si nécessaire
      diagnostic: formData.diagnostic,
      conclusion: formData.conclusion,
      //personnel: { id: 3 },
      dossierMedical: {id: formData.dossier}, // L'ID doit correspondre à la logique de l'application
      service: { id: formData.service } // Supposé que le service dans le formulaire est l'ID
    };
  }

  private setForm() {
    this.prestationForm.controls['dossier'].setValue(this.prestationToUpdate.dossierMedical?.id);
    this.prestationForm.controls['service'].setValue(this.prestationToUpdate.service?.id);
    if (this.prestationToUpdate.diagnostic) this.prestationForm.controls['diagnostic'].setValue(this.prestationToUpdate.diagnostic);
    if (this.prestationToUpdate.prerequisities) this.prestationForm.controls['prerequis'].setValue(this.prestationToUpdate.prerequisities);
    if (this.prestationToUpdate.conclusion) this.prestationForm.controls['conclusion'].setValue(this.prestationToUpdate.conclusion);
  }

  triggerFileUpload() {
    document.getElementById('file_uploader')!.click();
  }

  getEvent(event: Event) {
    console.log('EVENEMENT RECUPERER FICHIER ', event);
  }

  private updatePrestation(prestation: PrestationInterface) {
    this.api.update(prestation).subscribe({
      next: value => {
        this.notify.snackMessage(
          `Prestation pour le patient ${this.getPatientFullName(value.dossierMedical!)} modifié avec succès`,
          3000, 'success');
        this.handleCancel();
      },
      error: (error) => {
        console.error(error);
        this.isConfirmLoading = false;
      },
      complete: () => {
        this.isConfirmLoading = false
      }
    })
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
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }

}
