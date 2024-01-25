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

  // le component nouveau-patient servira de vue pour modifier la fiche médicale à ce stade  on dois le load avec les données du patient

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
    this.patientService.getAll().subscribe(
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

  
  searchPatient(event: Event) {
    const searchValue = (event.target as HTMLInputElement)?.value;

    if (searchValue !== undefined) {
        this.patients = this.patients.filter((patient) => {
            return (
                patient.personne.nom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                patient.personne.prenom.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
            );
        });
    }
}

}
