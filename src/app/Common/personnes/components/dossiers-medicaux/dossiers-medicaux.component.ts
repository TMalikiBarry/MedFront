import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PatientInterface } from 'src/app/models/patient.interface';

@Component({
  selector: 'app-dossiers-medicaux',
  templateUrl: './dossiers-medicaux.component.html',
  styleUrls: ['./dossiers-medicaux.component.sass'],
})
export class DossiersMedicauxComponent implements OnInit {
  patients: PatientInterface[] = [];

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  showEvent(event: any) {
    console.log(event)
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe(
      (patients: PatientInterface[]) => {
        this.patients = patients;
        console.log(patients);
      },
      (error) => {
        console.error('Erreur lors de la récupération des patients', error);
        // Gérez l'erreur selon vos besoins
      }
    );
  }
}
