import {Component, OnInit} from '@angular/core';
import {PatientService} from 'src/app/services/patient/patient.service';
import {PatientInterface} from 'src/app/models/patient.interface';

import {NzModalService} from "ng-zorro-antd/modal";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {NouveauPatientComponent} from "../../dialogs/nouveau-patient-form-dialog/nouveau-patient.component";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonneInterface} from "src/app/models/personne.interface";
import * as Chart from 'chart.js/auto';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  patients!: PatientInterface[];
  choosenDate!: Date[];
  chartPatient!: any;
  chartGenrePatient!: any;
  serviceId!: number;
  // listOfService!: ServiceInterface[];
  // listOfDossierMedical!: DossierMedicalInterface[];
  // paginatedData!: Page<PatientInterface>;
  // patientPers!: PersonneInterface;
  // pageIndex: number = 0;
  // pageSize: number = 10;
  constructor(private patientService: PatientService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute,


  ) {}

  ngOnInit() {
    this.loadPatients();
    this.createCanvasFigures();
  }

  loadPatients() {
    this.patientService.getAll().subscribe({
     next: patients => {
        this.patients = patients;
        console.log('Recuperation de patient ', patients);
        },
    error: (error) => {
       console.error('Erreur lors de la récupération des patients', error);
      // Gérez l'erreur selon vos besoins
    }
  }
    );
  }

  createCanvasFigures() {
    // const canvasPatientsStats = document.getElementById('patientsStats')

    this.chartPatient = new Chart.Chart("patientsStats", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Dim', 'Lun', 'Mar','Mer',
          'Jeu', 'Ven', 'Sam'],
        datasets: [
          {
            label: "Inscrits",
            data: ['467','576', '572', '79', '92',
              '574', '573'],
            backgroundColor: '#266141'
          },
          {
            label: "Venus",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538'],
            backgroundColor: '#84BE38'
          }
        ]
      },
      options: {
        aspectRatio:1.8
      }

    });

    this.chartGenrePatient = new Chart.Chart( "genrePatient", {
        type: 'doughnut',
        data: {
          labels: [
            'Hommes',
            'Femmes',
            'Garçons',
            'Filles'
          ],
          datasets: [{
            // label: 'My First Dataset',
            data: [100, 150, 190, 180],
            backgroundColor: [
              '#266141',
              '#84BE38',
              '#FDCD51',
              '#ffebbe'
            ],
            hoverOffset: 35
          }]
        }
      }

    )

  }

  getDayInfo(dateString: string): { id: number, label: string } {
    // Créer un objet Date à partir de la chaîne de date
    const date = new Date(dateString);

    // Jours de la semaine
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    // Index du jour de la semaine (0 pour Dimanche, 1 pour Lundi, ..., 6 pour Samedi)
    const dayIndex = date.getDay();

    // Renvoyer un objet avec l'index et le nom du jour
    return { id: dayIndex, label: daysOfWeek[dayIndex] };
  }

  addNewPatient() {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 750
    }).afterClose.subscribe(
      ()=>{
        this.loadPatients()
      }
    );
  }

  addNewPrestation(data: PatientInterface) {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzData: data,
      nzClosable: false,
    }).afterClose.subscribe(
      (result) => {
        if (result === 'toPrestations')
          this.router.navigateByUrl('/admin/dossiers/prestation');
      }
    );
  }

  getAgeDescription(personne: PersonneInterface): string | undefined {
    // Si le champ 'age' est présent
    if (personne.age && personne.age !== "NaN") {
      return `${personne.age} ans`;
    }

    // Si 'dateNaissance' a une valeur non nulle et définie
    if (personne.datenaissance) {
      const birthDate = new Date(personne.datenaissance);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      // Si le mois actuel est avant le mois de naissance,
      // ou si c'est le mois de naissance mais que le jour actuel est avant le jour de naissance,
      // soustraire 1 de l'âge
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return `${age} ans`;
    }
    return undefined

    // Si aucune des conditions n'est remplie, la fonction ne renvoie rien
  }
  redirectToDossierMedical() {
    // Assurez-vous que vous avez l'ID du patient disponible
    const patientId = this.route.snapshot.params['id']; // Assurez-vous que 'id' correspond au nom du paramètre dans votre route
    if (patientId) {
      // Redirection vers le dossier médical avec l'ID du patient
      this.router.navigateByUrl('/admin/personnes/dossiers-medicaux', patientId);
    }
  }
}
