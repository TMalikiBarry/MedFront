import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PatientInterface } from 'src/app/models/patient.interface';
import {ProfilService} from "../../../../services/Profil/profil.service";

@Component({
  selector: 'app-dossiers-medicaux',
  templateUrl: './fiche-medicale.component.html',
  styleUrls: ['./fiche-medicale.component.sass'],
})
export class FicheMedicaleComponent implements OnInit {
  patients: PatientInterface[] = [];

  constructor(private patientService: PatientService,
              private profilService: ProfilService) {}

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
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
