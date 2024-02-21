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
import {WeeklyPatientStat} from "src/app/models/weekly-patient-stat";
import {UtilsService} from "../../../../services/utils/utils.service";

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
  private patientsInscrits!: WeeklyPatientStat;
  private patientsVenus!: WeeklyPatientStat;

  constructor(private patientService: PatientService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute,
              private utils: UtilsService,
  ) {}

  ngOnInit() {
    this.loadPatients();
    this.initialiseChartsData();
  }

  initialiseChartsData() {

    this.chartPatient = new Chart.Chart("patientsStats", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Lundi', 'Mardi', 'Mercredi',
          'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "Inscrits",
            data: ['0', '0', '0', '0', '0',
              '0', '0'],
            backgroundColor: '#266141',
            borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          },
          {
            label: "Venus",
            data: ['0', '0', '0', '0', '0',
              '0', '0'],
            backgroundColor: '#84BE38',
            borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          }
        ]
      },
      options: {
        aspectRatio: 1.87,
        plugins: {
          legend: {
            display: false // Désactive l'affichage de la légende
          }
        },
        layout: {
          padding: {
            // Ajustement de l'espacement entre le bord du graphique et les barres
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        responsive: true,
        // barPercentage: 0.7 // Réglage de la largeur des barres
      }

    });

    this.chartGenrePatient = new Chart.Chart("genrePatient", {
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
            data: [5, 5, 5, 5],
            backgroundColor: [
              '#266141',
              '#84BE38',
              '#FDCD51',
              '#ffebbe'
            ],
            hoverOffset: 35
          }]
        },
      options: {
        plugins: {
          legend: {
            display: false // Désactive l'affichage de la légende
          }
        },
        }
      }
    );
  }

  loadPatients() {
    this.getChartData(true);
    this.patientService.getAll().subscribe({
        next: patients => {
          this.patients = patients;
          console.log('Recuperation de patient ', patients);
          this.updateChartGenreData(patients);

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des patients', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }

  updateChartGenreData(patients: PatientInterface[]) {
    let hommes = 0;
    let femmes = 0;
    let garcons = 0;
    let filles = 0;

// Parcourir la liste des patients et mettre à jour les compteurs
    this.patients.forEach(patient => {
      const genre = patient.personne.genre.toLowerCase();
      const age = this.utils.getAge(patient.personne.datenaissance!);

      if (['m', 'h'].some(g => genre.startsWith(g))) {
        if (age >= 18) {
          hommes++;
        } else {
          garcons++;
        }
      } else if (age >= 18) {
        femmes++;
      } else {
        filles++;
      }
    });

// Mettre à jour les données du graphique
    this.chartGenrePatient.data.datasets[0].data = [hommes, femmes, garcons, filles];
    this.chartGenrePatient.update();
  }

  getChartData(lastWeek: boolean = false) {
    this.patientService.getWeeklyPatientsInscrits().subscribe(
      result => {
        this.patientsInscrits = result
        this.patientService.getWeeklyPatientsVenus().subscribe(
          result => {
            this.patientsVenus = result;
            this.updatePatientStatsChart(lastWeek, this.patientsInscrits, this.patientsVenus);
          }
        )
      }
    )
  }

  updatePatientStatsChart(lastWeek: boolean = false, patientsInscrits: WeeklyPatientStat, patientsVenus?: WeeklyPatientStat): void {

    this.chartPatient.data.datasets[0].data = lastWeek ? patientsInscrits.previousWeekCounts : patientsInscrits.currentWeekCounts;
    if (patientsVenus)
      this.chartPatient.data.datasets[1].data = lastWeek ? patientsVenus.previousWeekCounts : patientsInscrits.currentWeekCounts;

    this.chartPatient.update(); // Mettez à jour le graphique
  }


  addNewPatient() {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 750
    }).afterClose.subscribe(
      (result) => {
        if (result)
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
      /*const birthDate = new Date(personne.datenaissance);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      // Si le mois actuel est avant le mois de naissance,
      // ou si c'est le mois de naissance mais que le jour actuel est avant le jour de naissance,
      // soustraire 1 de l'âge
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }*/

      return `${this.utils.getAge(personne.datenaissance)} ans`;
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
