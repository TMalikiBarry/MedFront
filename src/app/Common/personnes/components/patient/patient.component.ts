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
import {WeeklyDataStat} from "src/app/models/weekly-data-stat";
import {UtilsService} from "../../../../services/utils/utils.service";
import {Page} from "../../../../models/pagination.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  patients!: PatientInterface[];
  choosenDate!: Date[];
  chartPatient!: any;
  pageIndex: number = 0;
  pageSize: number = 10;

  chartGenrePatient!: any;

  serviceId!: number;

  isLastWeek = false;
  ageMin!: number;
  ageMax!: number;
  private patientsInscrits!: WeeklyDataStat;
  private patientsVenus!: WeeklyDataStat;
  patientPers!: PersonneInterface;
  /*ageRange = [0, 130];
  marks: NzMarks = {
    5: '5',
    18: {
      style: {
        color: '#266141',
        fontSize: '10px',
        fontWeight: '300'
      },
      label: '<code>Adulte</code>'
    },
    30: '30',
    40: '40',
    60: '60',
    80: '80',
    100: '100',
    120: '120',
  };*/

  paginatedData!: Page<PatientInterface>;

  constructor(private patientService: PatientService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute,
              public utils: UtilsService,
  ) {}

  ngOnInit() {
    this.loadPatients();
    this.getPatientByPage();
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
        scales: {
          y: {
            min: 0,
            type: 'linear', // Utiliser une échelle linéaire
            ticks: {
              // stepSize: 1, // Taille du pas de l'axe des ordonnées
              precision: 0 // Précision des étiquettes (aucune décimale)
            }
          }
        }
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
            data: ["5", "5", "5", "5"],
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
        maintainAspectRatio: false
        }
      }
    );
  }

  getPatientByPage(page: number = 0, size: number = 10, firstName?: string, lastName?: string, telephone?: string,
                   startDate?: Date, endDate?: Date, status?: string, genre?: string) {

    this.patientService.getPaginatedFilteredData(page, size, firstName, lastName,
      telephone, startDate, endDate, status, genre,
      this.ageMin, this.ageMax)
      .subscribe({
      next: response => {
        this.paginatedData = response;

      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex - 1;
    this.pageSize = params.pageSize;

    this.filterData();
  }


  filterData() {
    let startDate = undefined;
    let endDate = undefined;
    if (this.choosenDate) {
      startDate = this.choosenDate[0] ? this.choosenDate[0] : undefined;
      endDate = this.choosenDate[1] ? this.choosenDate[1] : undefined;
    }
    let prenom = null;
    let nom = null;
    let telephone = null;

    if (this.patientPers) {
      prenom = this.patientPers.prenom;
      nom = this.patientPers.nom;
      telephone = this.patientPers.telephone
    }
    console.log('RECUPERER LES DONNEES');
    this.getPatientByPage(this.pageIndex, this.pageSize, prenom!, nom!,
      telephone!, startDate, endDate);
    console.log('BIEN RECU LES DONNEES');

  }

  loadPatients() {
    this.getChartData(this.isLastWeek);
    this.patientService.getAll().subscribe({
        next: patients => {
          this.patients = patients;
          console.log('Recuperation de patient ', patients);
          this.updateChartGenreData();

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des patients', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }

  updateChartGenreData() {
    let hommes = 0;
    let femmes = 0;
    let garcons = 0;
    let filles = 0;

// Parcourir la liste des patients et mettre à jour les compteurs
    this.patients.forEach(patient => {
      // const genre = patient.personne.genre;
      const age = this.utils.getAge(patient.personne.datenaissance!);

      // let isHomme= ['m', 'h'].some(g => genre.startsWith(g));
      if (patient.personne.genre == 'M') {
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
          res => {
            this.patientsVenus = res;

            this.updatePatientStatsChart(lastWeek, this.patientsInscrits, this.patientsVenus);
          }
        )
      }
    )
  }

  updatePatientStatsChart(lastWeek: boolean = false, patientsInscrits: WeeklyDataStat, patientsVenus?: WeeklyDataStat): void {

    this.chartPatient.data.datasets[0].data = lastWeek ? patientsInscrits.previousWeekCounts : patientsInscrits.currentWeekCounts;
    if (patientsVenus)
      this.chartPatient.data.datasets[1].data = lastWeek ? patientsVenus.previousWeekCounts : patientsVenus.currentWeekCounts;

    this.chartPatient.update(); // Mettez à jour le graphique
  }


  OnWeekChange(event: any) {
    this.getChartData(event);
  }

  addNewPatient() {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 750,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result)
          // this.loadPatients()
          // this.getPatientByPage(this.pageIndex, this.pageSize);
          this.filterData();
      }
    );
  }

  updatePatient(idPatient: number) {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 750,
      nzCentered: true,
      nzData: idPatient
    }).afterClose.subscribe(
      (result) => {
        if (result)
          // this.loadPatients()
          // this.getPatientByPage(this.pageIndex, this.pageSize);
          this.filterData();
      }
    );
  }


  addNewPrestation(data: PatientInterface) {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzData: data,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result === 'toPrestations')
          this.router.navigateByUrl('/admin/dossiers/prestation');
      }
    );
  }


  //TODO  à revoir
  getAgeDescription(personne: PersonneInterface): string | undefined {

    // Si 'dateNaissance' a une valeur non nulle et définie
    if (personne.datenaissance) {

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

  log(msg: any) {
    console.log(msg)
  }

  getPatienInfos(patient: PatientInterface): string {
    return `${patient.personne.prenom} ${patient.personne.nom} - ${patient.personne.telephone}`;
  }

  addNewRDV(patient: PatientInterface) {
  }

  handleExtremum(type: 'min' | 'max', event: any) {
    console.log('INPUT VALUE ', event)
    const ageDiff = this.ageMax - this.ageMin;
    if (type === 'min') {
      if (this.ageMin < 0)
        this.ageMin = 0
      this.ageMax = ageDiff < 1 ? this.ageMin + 1 : this.ageMax;
    } else {
      if (this.ageMax < 1)
        this.ageMax = 1
      this.ageMin = ageDiff <= 0 ? this.ageMax - 1 : this.ageMin;
    }
  }
}
