import { Component } from '@angular/core';
import {PersonnelInterface} from "../../../../models/personnel.interface";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {PatientService} from "../../../../services/patient/patient.service";
import {PersonneInterface} from "../../../../models/personne.interface";
import {RendezVousInterface} from "../../../../models/rendez-vous.interface";
import {DossierMedicalInterface} from "../../../../models/dossier-medical.interface";
import {AccesInterface} from "../../../../models/acces.interface";

@Component({
  selector: 'app-detail-rdv-patient',
  templateUrl: './detail-rdv-patient.component.html',
  styleUrls: ['./detail-rdv-patient.component.sass']
})
export class DetailRdvPatientComponent {
  titleForm = "Detail patient";
  formDesc = "les modifications de ce patient seront enregistrees";
  btnText = "Enregistrer";
  date !: string
  isConfirmLoading = false;
  data : any

  RvForm = this.fb.group({
    prenom : '',
    nom : '',
    date : '',
    telephone: '',
    genre : '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private api : PatientService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData
    console.log(this.data as PersonnelInterface)


    let dateRv : Date = new Date(this.data.personne.datenaissance)
    this.RvForm.controls.date.setValue(dateRv.toISOString())

    this.RvForm.controls.prenom.setValue(this.data.personne.prenom)
    this.RvForm.controls.nom.setValue(this.data.personne.nom)
    this.RvForm.controls.telephone.setValue(this.data.personne.telephone)
    this.RvForm.controls.genre.setValue(this.data.personne.genre)
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    console.log(this.RvForm.value)
    const formData = this.RvForm.value;
    let patient = this.createPatientFromForm(formData);
    console.log(patient)
    this.api.UpddatePatient(patient).subscribe({
      next: (response) => {
        this.modal.close();
        console.log('Patient mis a jour avec succès ', response);
      },
      error: (error) => console.error('Erreur lors de la mise a jour', error),
      complete: () => {this.isConfirmLoading = false}
    });
  }

  triggerFileUpload() {
    document.getElementById('file_uploader')!.click();
  }

  getEvent(event: Event) {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  createPatientFromForm(formData: any): {
    id : number
    contactEnCasUrgent: any;
    dateCreation: any;
    dossiermedical: any;
    groupeSanguin: any;
    dateModification: any;
    donneurOrgane: any;
    personne: PersonneInterface;
    personnel: PersonneInterface;
    rendezVous: any
  } {
    return {
      id : this.data.id,
      dateCreation : this.data.dateCreation,
      dateModification : this.data.dateModification,
      groupeSanguin : this.data.groupeSanguin,
      donneurOrgane : this.data.donneurOrgane,
      contactEnCasUrgent : this.data.contactEnCasUrgent,
      rendezVous : this.data.rendezVous,
      personne: this.data.personne = {
        id: this.data.personne.id,
        adresse: this.data.personne.adresse,
        hasAlreadyConnected: this.data.personne.hasAlreadyConnected,
        email: this.data.personne.email,
        datenaissance: this.data.personne.datenaissance,
        numeroCNI: this.data.personne.numeroCNI,
        numeroPassport: this.data.personne.numeroPassport,
        age: this.data.personne.age,
        otp: this.data.personne.otp,
        dategenerationOTP: this.data.personne.dategenerationOTP,
        dateValidationOTP: this.data.personne.dateValidationOTP,
        acces: this.data.personne.acces,
        supprime: this.data.personne.supprime,
        dateCreation: this.data.personne.dateCreation,
        dateModification : this.data.personne.dateModification,
        prenom : formData.prenom,
        nom : formData.nom,
        telephone: formData.telephone,
        genre : formData.genre,
      },
      personnel : this.data.personnel,
      dossiermedical : this.data.dossiermedical
    };
  }
}
