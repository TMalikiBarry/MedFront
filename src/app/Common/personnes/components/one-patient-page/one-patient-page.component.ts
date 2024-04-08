import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "src/app/services/patient/patient.service";

@Component({
  selector: 'app-one-patient-page',
  templateUrl: './one-patient-page.component.html',
  styleUrls: ['./one-patient-page.component.sass']
})
export class OnePatientPageComponent implements OnInit {
  contextPage: string = 'Nouveau Patient';
  patientToUpdateId!: number;
  groupeSanguinOptions: string[] = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  patientForm: FormGroup = this.fb.group({
    genre: ['', Validators.required],
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    telephone: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    groupeSanguin: [''],
    adresse: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactUrgence: ['', Validators.required],
    ficheAccessible: [''],
    allergies: [''],
    maladiesChroniques: [''],
  });
  btnText: string = 'Enregistrer';
  today = new Date();
  private maxDate: string;

  constructor(public router: Router,
              private fb: FormBuilder,
              private api: PatientService) {
    this.maxDate = this.today.toISOString().split('T')[0]; // Convertit en format YYYY-MM-DD
  }

  disabledDate = (current: Date): boolean => {
    // Renvoie true si la date actuelle est postérieure à aujourd'hui
    return current.getTime() > this.today.getTime();
  };

  ngOnInit(): void {
  }


  enregistrer() {
  }

  modifier() {
  }

}
