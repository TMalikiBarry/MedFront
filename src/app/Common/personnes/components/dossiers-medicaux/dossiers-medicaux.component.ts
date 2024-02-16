import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {PatientInterface} from 'src/app/models/patient.interface';
import {PersonneService} from 'src/app/services/Personne/personne.service';
import {PatientService} from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-dossiers-medicaux',
  templateUrl: './dossiers-medicaux.component.html',
  styleUrls: ['./dossiers-medicaux.component.sass']
})
export class DossiersMedicauxComponent implements OnInit {
  patientForm: FormGroup;
  patient!: PatientInterface;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalRef: NzModalRef,
    private apiPersonne: PersonneService,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      genre: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      adresse: ['', Validators.required],
      antecedant_patologie: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const patientId = params?.get('id');
      if (patientId) {
        this.loadPatientData(+patientId);
      }
    });
  }

  loadPatientData(patientId: number) {
    this.patientService.getPatientById(patientId).subscribe({
      next: (patient: PatientInterface) => {
        this.patient = patient;
        this.populateFormWithPatientData(patient);
      },
      error: (error) => {
        console.error('Error fetching patient data:', error);
      }
    });
  }

  populateFormWithPatientData(patient: PatientInterface) {
    this.patientForm.patchValue({
      genre: patient.personne.genre,
      prenom: patient.personne.prenom,
      nom: patient.personne.nom,
      telephone: patient.personne.telephone,
      dateNaissance: patient.personne.datenaissance,
      groupeSanguin: patient.groupeSanguin,
      adresse: patient.personne.adresse,
      // antecedant_patologie: patient.antecedant_patologie
    });
  }

  updatePatient() {
    // Add the logic to update the patient using patientForm values
    // This will be similar to the logic you use for creating a new patient
    // Make sure to handle the update operation in your patient service
  }

  closeModal() {
    this.modalRef.close();
  }
}
