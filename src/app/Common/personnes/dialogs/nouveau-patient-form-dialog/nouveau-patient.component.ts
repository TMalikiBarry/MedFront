// nouveau-patient-form-dialog.component.ts

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientService} from 'src/app/services/patient/patient.service';
import {NzModalRef} from "ng-zorro-antd/modal";
import {PersonneService} from "../../../../services/Personne/personne.service";
import {PersonneInterface} from "../../../../models/personne.interface";
import {PatientInterface} from "../../../../models/patient.interface";
import {RendezVousInterface} from "../../../../models/rendez-vous.interface";
import {PersonnelInterface} from "../../../../models/personnel.interface";
import {DossierMedicalInterface} from "../../../../models/dossier-medical.interface";

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

  constructor(private fb: FormBuilder,
              private modalRef : NzModalRef,
              private apiPersonne : PersonneService,
              private patientService: PatientService) {
    this.patientForm = this.fb.group({
      genre: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', Validators.required],
      contactUrgence: ['', Validators.required],
      medecinTraitant: [''],
      ficheAccessible: [''],
      allergies: ['']
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Convertit en format YYYY-MM-DD
  }

  ngOnInit() {
    // Vous pouvez retirer ce bloc car le formulaire a déjà été initialisé dans le constructeur
    // this.patientForm = this.fb.group({
    //   genre: ['', Validators.required],
    //   prenom: ['', Validators.required],
    //   nom: ['', Validators.required],
    //   telephone: ['', Validators.required],
    //   dateNaissance: ['', Validators.required],
    //   groupeSanguin: ['', Validators.required],
    //   adresse: ['', Validators.required],
    //   medecinTraitant: ['', Validators.required],
    //   ficheAccessible: ['', Validators.required]
    // });
  }

  enregistrerPatient() {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;
      let personneForm = this.createPersonneForm(patientData)
      let patientForm = <PatientInterface>this.createPatientForm(patientData, personneForm)
      this.patientService.save(patientForm).subscribe({
        next : res1 => {
          this.patient = res1.reponse.patient
          console.log(res1)
          this.modalRef.close(res1.reponse.patient.id)
        }
      })

      this.apiPersonne.savePersonne(personneForm).subscribe({
        next : res => {
          console.log(res)
          this.personne = <PersonneInterface>res.reponse
        }

      })

      // this.personne.nom = this.patientForm.controls['nom'].value
      // this.personne.prenom = this.patientForm.controls['prenom'].value
      // this.personne.genre = this.patientForm.controls['genre'].value
      // this.personne.telephone = this.patientForm.controls['telephone'].value
      // this.personne.adresse = this.patientForm.controls['adresse'].value


      this.patient = patientData

      console.log("Patient "+ this.patient)

    //   // Appelez le service pour ajouter le patient
    //   this.patientService.save(patientData).subscribe(
    //     (response) => {
    //       // Gérez la réponse ici, par exemple, affichez un message de succès
    //       console.log('Patient ajouté avec succès', response);
    //       this.modalRef.close(response.reponse)
    //
    //       // Réinitialisez le formulaire après avoir ajouté le patient
    //       this.patientForm.reset();
    //     },
    //     (error) => {
    //       // Gérez les erreurs ici, par exemple, affichez un message d'erreur
    //       console.error('Erreur lors de l\'ajout du patient', error);
    //     }
    //   );
    // } else {
    //   // Le formulaire est invalide, affichez un message ou effectuez une action appropriée
     }
  }

  getAge(dateNaissance: string | Date): string {
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Si le mois actuel est avant le mois de naissance,
    // ou si c'est le mois de naissance mais que le jour actuel est avant le jour de naissance,
    // soustraire 1 de l'âge
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age.toString();
  }

  createPersonneForm(formData : any): PersonneInterface
/*    {
    id ?: number;
    nom: string;
    prenom: string;
    adresse: string;
    genre: string;
    hasAlreadyConnected?: boolean;
    telephone: string;
    email?: string;
    datenaissance: string;
    numeroCNI?: string;
    numeroPassport?: string ;
    age?: string;
    otp?: string|null;
    dategenerationOTP?: string|null;
    dateValidationOTP?: string|null;
    acces?: AccesInterface;
    supprime?: boolean
    dateCreation?: string | null,
    dateModification ?: string | null
  } */
  {
    return {
      adresse: formData.adresse,
      genre: formData.genre,
      nom: formData.nom,
      prenom: formData.prenom,
      age: this.getAge(formData.dateNaissance),
      telephone: formData.telephone,
      email: formData.email,
      datenaissance: formData.dateNaissance,
      hasAlreadyConnected: false,
    };
  }

  createPatientForm(formData : any, personne: PersonneInterface):{
    dateCreation ?: Date
    dateModification ?: Date
    groupeSanguin : string
    donneurOrgane : Boolean
    contactEnCasUrgent : string
    rendezVous ?: RendezVousInterface[]
    personne ?: PersonneInterface
    personnel ?: PersonnelInterface
    dossiermedical ?: DossierMedicalInterface[]
    status ?: string
  } {
    return {
      contactEnCasUrgent: formData.contactUrgence,
      donneurOrgane: false,
      groupeSanguin: formData.groupeSanguin,
      personne
    };
  }

  handleCancel() {
      this.modalRef.close();
  }
}
