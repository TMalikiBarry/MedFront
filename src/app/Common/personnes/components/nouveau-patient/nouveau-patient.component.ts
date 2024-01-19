import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient/patient.service';
@Component({
  selector: 'app-nouveau-patient',
  templateUrl: './nouveau-patient.component.html',
  styleUrls: ['./nouveau-patient.component.sass']
})
export class NouveauPatientComponent implements OnInit {
  patientForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patientForm = this.fb.group({
      genre: this.fb.array([], [Validators.required]),
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      adresse: ['', Validators.required],
      medecinTraitant: ['', Validators.required],
      ficheAccessible: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.patientForm = this.fb.group({
      genre: this.fb.array([], [Validators.required]),
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      adresse: ['', Validators.required],
      medecinTraitant: ['', Validators.required],
      ficheAccessible: ['', Validators.required]
    });
  }

  enregistrerPatient() {
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;

      // Appelez le service pour ajouter le patient
      this.patientService.save(patientData).subscribe(
        (response) => {
          // Gérez la réponse ici, par exemple, affichez un message de succès
          console.log('Patient ajouté avec succès', response);

          // Réinitialisez le formulaire après avoir ajouté le patient
          this.patientForm.reset();
        },
        (error) => {
          // Gérez les erreurs ici, par exemple, affichez un message d'erreur
          console.error('Erreur lors de l\'ajout du patient', error);
        }
      );
    } else {
      // Le formulaire est invalide, affichez un message ou effectuez une action appropriée
    }
  }
}
