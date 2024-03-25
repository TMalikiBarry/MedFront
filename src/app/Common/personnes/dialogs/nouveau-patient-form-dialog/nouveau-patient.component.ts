// nouveau-patient-form-dialog.component.ts

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from 'src/app/services/patient/patient.service';
import {NzModalRef} from "ng-zorro-antd/modal";
import {PersonneInterface} from "src/app/models/personne.interface";
import {PatientInterface} from "src/app/models/patient.interface";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {NotifService} from "src/app/services/notification/notif.service";
import {UtilsService} from "../../../../services/utils/utils.service";


@Component({
  selector: 'app-nouveau-patient-form-dialog',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.sass']
})
export class NouveauPatientComponent implements OnInit {
  patientForm: FormGroup;
  personne!: PersonneInterface
  patient !: PatientInterface
  maxDate: string;
  titleForm: string = "Nouveau Patient";
  isConfirmLoading = false;
  dossierToUpdate!: DossierMedicalInterface;

  constructor(private fb: FormBuilder,
              private modalRef : NzModalRef,
              private utils: UtilsService,
              private patientService: PatientService,
              private notify: NotifService) {

    this.patientForm = this.fb.group({
      genre: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      // telephone: ['', [Validators.required, Validators.pattern('^(\\+|00)?(221)?7[0-9]{8}$')]],
      telephone: ['', [Validators.required, Validators.pattern(/^(?:([+0])221\s)?(7[0-9])\s(\d{3})\s(\d{2})\s(\d{2})$/)]],
      datenaissance: ['', Validators.required],
      groupeSanguin: [''],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // contactEnCasUrgent: ['', [Validators.required, Validators.pattern('^(\\+|00)?(221)?7[0-9]{8}$')]],
      contactEnCasUrgent: ['', [Validators.required, Validators.pattern(/^(?:([+0])221\s)?(7[0-9])\s(\d{3})\s(\d{2})\s(\d{2})$/)]],

      allergies: [''],
      maladies: [''],
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Convertit en format YYYY-MM-DD
  }

  ngOnInit() {
    try {
      const patientID: number = <number>this.modalRef.getConfig().nzData;

      if (patientID)
        this.loadPatientForUpdate(patientID);
    } catch (s) {
      console.error(s)
    }

    this.initializeObservables();

  }

  enregistrerPatient() {
    if (this.patientForm.valid) {
      this.isConfirmLoading = true;
      const patientData = this.patientForm.value;
      let personneForm = this.createPersonneForm(patientData)
      let patientForm = <PatientInterface>this.createPatientForm(patientData, personneForm)
      const dossier: DossierMedicalInterface = {
        patient: patientForm,
        maladies: patientData.maladies,
        allergies: patientData.allergies,
        statut: "ACTIF",
      }
      if (this.dossierToUpdate) {
        dossier.id = this.dossierToUpdate.id;
        dossier.dateCreation = this.dossierToUpdate.dateCreation;
        dossier.supprime = this.dossierToUpdate.supprime;
        dossier.statut = this.dossierToUpdate.statut;
        dossier.prestations = this.dossierToUpdate.prestations;
        if (dossier.patient) {
          dossier.patient.id = this.dossierToUpdate.patient?.id;
          dossier.patient.donneurOrgane = this.dossierToUpdate.patient?.donneurOrgane!;
          dossier.patient.dateCreation = this.dossierToUpdate.patient?.dateCreation;
          dossier.patient.status = this.dossierToUpdate.patient?.status;
          dossier.patient.supprime = this.dossierToUpdate.patient?.supprime;
          if (dossier.patient.personne) {
            dossier.patient.personne.id = this.dossierToUpdate.patient?.personne?.id;
            dossier.patient.personne.dateCreation = this.dossierToUpdate.patient?.personne?.dateCreation;
            dossier.patient.personne.supprime = this.dossierToUpdate.patient?.personne?.supprime;
          }

        }

        this.updatePatient(dossier);
        return;
      }
      this.patientService.save(dossier).subscribe({
        next : res1 => {
          this.patient = res1.reponse.patient;
          console.log(res1);
          this.notify.snackMessage(`Le patient ${personneForm.prenom} ${personneForm.nom} a été ajouté`,
            3000, "success");
          this.modalRef.close(res1.reponse.patient.id);
        },
        error: (error) => {
          console.log(error);
          this.isConfirmLoading = false;
          if (error.status == 401)
            this.modalRef.close();
        },
        complete: () => this.isConfirmLoading = false,
      })

      this.patient = patientData

    } else {
      this.notify.snackMessage(`Certains champs sont mal renseignés `, 3000, "error");
    }
  }

  createPersonneForm(formData : any): PersonneInterface
  {
    return {
      adresse: formData.adresse,
      genre: formData.genre,
      nom: formData.nom,
      prenom: formData.prenom,
      age: this.utils.getAge(formData.datenaissance).toString(),
      telephone: formData.telephone.replace(/\s+/g, ''),
      email: formData.email,
      datenaissance: formData.datenaissance,
      hasAlreadyConnected: false,
    };
  }

  createPatientForm(formData: any, personne: PersonneInterface): PatientInterface {
    return {
      contactEnCasUrgent: formData.contactEnCasUrgent.replace(/\s+/g, ''),
      donneurOrgane: false,
      status: 'ACTIF',
      groupeSanguin: formData.groupeSanguin,
      personne
    };
  }

  private loadPatientForUpdate(patientID: number) {

    this.titleForm = 'Modifier Patient';
    this.patientService.getDossierByPatientId(patientID).subscribe({
      next: dossier => {
        this.dossierToUpdate = dossier;

        this.patientForm.controls['genre'].setValue(dossier.patient?.personne?.genre);
        this.patientForm.controls['prenom'].setValue(dossier.patient?.personne?.prenom);
        this.patientForm.controls['nom'].setValue(dossier.patient?.personne?.nom);
        this.patientForm.controls['telephone'].setValue(dossier.patient?.personne?.telephone);
        this.patientForm.controls['email'].setValue(dossier.patient?.personne?.email);
        this.patientForm.controls['adresse'].setValue(dossier.patient?.personne?.adresse);
        this.patientForm.controls['datenaissance'].setValue(dossier.patient?.personne?.datenaissance);
        this.patientForm.controls['contactEnCasUrgent'].setValue(dossier.patient?.contactEnCasUrgent);
        this.patientForm.controls['groupeSanguin'].setValue(dossier.patient?.groupeSanguin);
        this.patientForm.controls['allergies'].setValue(dossier.allergies);
        this.patientForm.controls['maladies'].setValue(dossier.maladies);
        // this.patientForm.setValue(dossier.patient?.personne!);
        // this.patientForm.setValue(dossier.patient!);
        // this.patientForm.setValue(dossier);
      }
    })
  }

  private updatePatient(dossier: DossierMedicalInterface) {

    this.patientService.update(dossier).subscribe({
      next: () => {
        this.notify.snackMessage(`Modification effectuée avec succés `, 3000, "success");
        this.patientForm.reset();
        this.modalRef.close('update-success');
      },
      error: (error) => {
        console.log(error);
        this.isConfirmLoading = false;
        if (error.status == 401)
          this.modalRef.close();
      },
      complete: () => this.isConfirmLoading = false,
    })
  }

  handleCancel() {
      this.modalRef.close();
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'veuillez renseignez un format d\'email correct';
    } else if (ctrl.hasError('pattern')) {
      return 'Ce format de numéro de téléphone n\'est pas pris en compte';
    } else if (ctrl.hasError('minlength')) {
      return 'Champ doit contenir au minimum ' + ctrl.errors!['minlength']['requiredLength'] + ' caracteres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Champ doit contenir au maximum ' + ctrl.errors!['maxlength']['requiredLength'] + ' caracteres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  initializeObservables() {
    this.patientForm.controls['telephone'].valueChanges.subscribe((value: string) => {

      let formattedNumber = '';
      if (['00221', '+221', '221'].some(v => value.startsWith(v))) {
        formattedNumber = this.removeCountryCodePrefix(value).replace(/\s+/g, '')
          .replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 $3 $4 $5')
      } else {
        formattedNumber = value!.replace(/\s+/g, '')
          .replace(/^(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4')
      }

      if (value !== formattedNumber) {
        this.patientForm.controls['telephone'].patchValue(formattedNumber, {emitEvent: false});
      }
    })

    this.patientForm.controls['contactEnCasUrgent'].valueChanges.subscribe((value: string) => {

      let formattedNumber = '';
      if (['00221', '+221', '221'].some(v => value.startsWith(v))) {
        formattedNumber = this.removeCountryCodePrefix(value).replace(/\s+/g, '')
          .replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 $3 $4 $5')
      } else {
        formattedNumber = value!.replace(/\s+/g, '')
          .replace(/^(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4')
      }

      if (value !== formattedNumber) {
        this.patientForm.controls['contactEnCasUrgent'].patchValue(formattedNumber, {emitEvent: false});
      }
    })
  }

  private removeCountryCodePrefix(value: string): string {
    // Supprime le préfixe "+" ou "00" s'il est présent au début de la chaîne
    return value.replace(/^(\+|00)/, '');
  }

}
