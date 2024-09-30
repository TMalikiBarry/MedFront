import {Component, OnInit} from '@angular/core';
import {AuthInterface} from "../../models/auth.interface";
import * as Chart from "chart.js/auto";
import {DashboardService} from "../../services/Dashboard/dashboard.service";
import {PatientInterface} from "../../models/patient.interface";
import {UtilsService} from "../../services/utils/utils.service";
import {DashboardDataInterface} from "../../models/dashboard-data.interface";
import {StorageService} from "../../services/Storage/storage.service";
import {ProfilService} from "../../services/Profil/profil.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  patientList!: PatientInterface [];
  patientForRDV!: PatientInterface [];

  dashboardData!: DashboardDataInterface;
  currentUser?: AuthInterface;
  numberStats: number[] = [0, 0, 0];
  descSats: string[] = ['patients', 'docteurs', 'pôles'];
  chartPatient: any;
  chartTransaction: any;

  constructor(private api: DashboardService,
              private storage: StorageService,
              public utils: UtilsService,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    const storedUser = this.storage.getItem('TOUCHMED_currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;
    this.initialiseChartsData();
    this.getDashBoardData();
  }

  initialiseChartsData() {

    this.chartPatient = new Chart.Chart("dashB_patientsStats", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Lundi', 'Mardi', 'Mercredi',
          'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "Patients Venus",
            data: ['10', '13', '6', '8', '9',
              '5', '6'],
            backgroundColor: '#266141',
            borderColor: '#266141',
            tension: .43
            // borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          },
          /*{
            label: "Nouveaux",
            data: ['3', '1', '0', '4', '0',
              '0', '6'],
            backgroundColor: '#84BE38',
            borderColor: '#84BE38',
            tension: .43
            // borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          }*/
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
      }

    });
    this.chartTransaction = new Chart.Chart("transactionsStats", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Lundi', 'Mardi', 'Mercredi',
          'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "Transactions",
            data: ['15000', '30000', '20000', '75000', '67500',
              '23500', '44000'],
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
  }

  disabledDate = (current: Date): boolean => {
    const today = new Date();
    // Renvoie true si la date actuelle est postérieure à aujourd'hui
    return current.getMonth() !== today.getMonth() || current.getFullYear() !== today.getFullYear();
  };

  getDashBoardData() {
    this.api.getDashboardData().subscribe({
      next: rep => {
        this.dashboardData = rep;
        this.patientList = rep.nouveauxPatients.slice(0, 7);
        this.patientForRDV = rep.rdvsDuJour.map(rdv => rdv.patient).slice(0, 7);
        this.numberStats[0] = rep.nombrePatients;
        this.numberStats[1] = rep.nombreDocteurs;
        this.numberStats[2] = rep.nombrePoles;
      }
    })
  }

  getGenre(patient: PatientInterface): string {

    return patient.personne.genre.toLowerCase().startsWith('f') ? 'Femme' : 'Homme';
  }
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }


}
