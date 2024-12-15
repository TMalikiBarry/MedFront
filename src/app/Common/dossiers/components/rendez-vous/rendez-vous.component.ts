import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {RendezVousFormDialogComponent} from "../../dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PatientInterface} from "src/app/models/patient.interface";
import {RendezVousService} from "src/app/services/rendez-vous/rendez-vous.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Page} from "src/app/models/pagination.interface";
import {RDVStatus, RendezVousInterface, WeeklyRDVStats} from "src/app/models/rendez-vous.interface";
import {NotifService} from "src/app/services/notification/notif.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {PersonneInterface} from "src/app/models/personne.interface";
import {CancelRdvDialogComponent} from "../../dialogs/cancel-rdv-dialog/cancel-rdv-dialog.component";
import * as Chart from "chart.js/auto";
import {DetailRendezVousComponent} from "../../dialogs/detail-rendez-vous/detail-rendez-vous.component";
import {Router} from "@angular/router";
import {ProfilService} from "src/app/services/Profil/profil.service";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.sass']
})
export class RendezVousComponent implements OnInit {

  numberStats = [0, 0, 0, 0];
  descSats = ["Rendez-vous", "Rendez-vous à confirmer", "Rendez-vous confirmés", "Rendez-vous annulés"]
  colorStats = ['black', '#5D6273', '#20AC2E', '#A81735'];
  svgList = ['', '_created', '_validated', '_canceled'];

  // listDataMapToday!:Page<RendezVousInterface>;

  date: any;
  rdvStatut!: RDVStatus;
  serviceId!: number;
  listOfService!: ServiceInterface[];
  listOfPole!: PoleInterface[];
  choosenDate!: Date[];
  listOfPatients!: PatientInterface[];
  loading = true;
  total = 1;
  pageSize = 10;
  pageIndex = 0;
  paginatedData!: Page<RendezVousInterface>;
  prestationsList: PrestationInterface[] = [];
  patientPers!: PersonneInterface;
  isLastWeek = false;

  barGraph: any;
  doughnutGraph: any;
  private wBarFlowStats!: WeeklyRDVStats;


  // Chemin vers l'icône dans le dossier des actifs
  // customIconPath = 'assets/icon/calendar_small.svg';

  rdvStatusList: RDVStatus[] = Object.values(RDVStatus);

  getStatusLabel(status: RDVStatus): string {
    switch (status) {
      case RDVStatus.CREATED:
        return 'Créé';
      case RDVStatus.VALIDATED:
        return 'Validé';
      case RDVStatus.CANCELED:
        return 'Annulé';
      default:
        return 'Créé';
    }
  }

  constructor(private modalService: NzModalService,
              private api: RendezVousService,
              private notification: NotifService,
              private apiService: CliniqueServiceService,
              public router: Router,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.getRdvByPage();
    this.getAllService();
    this.getGraphData();
    this.initialiseCanvasGraphs();
    this.countByStatus();
    this.loadPatients();
  }

  countByStatus() {
    this.api.countByStatus().subscribe(
      value => {
        this.numberStats = value;
        this.updateDiscFlowStatus(value.slice(-3));

      },
    )
  }

  getRdvByPage(page: number = 0, size: number = 10, firstName?: string, lastName?: string,
               statut?: string, serviceId?: number, startDate?: string, endDate?: string) {
    this.api.getAllRdvPagination(page, size, firstName, lastName, statut, serviceId,
      startDate, endDate).subscribe({
      next: response => {
        console.log("Liste des rdv page ", response);
        this.paginatedData = response;
        this.prestationsList = this.paginatedData.content;
        // this.pageSize = this.paginatedData.pageable.pageSize;
        // this.pageIndex = this.paginatedData.pageable.pageNumber + 1;
        this.total = this.paginatedData.totalElements;
        this.loading = false;
      },
      error: (error) => {
        if(error.includes('Permission non accord')) {
          this.notification.snackMessage("Permission non accordée pour cette action", 3500, "error");
        }
        console.error('Erreur lors de la récupération des patients', error);
        // Gérez l'erreur selon vos besoins
      }
    })
  }

  private getAllService() {
    this.apiService.getAllService().subscribe({
      next : res => {
        this.listOfService = res.reponse;
        this.listOfPole = this.listOfService
          .map(s => s.pole!) // Créez un tableau de tous les pôles
          .filter((pole, index, self) =>
            pole && self.findIndex(p => p.id === pole.id) === index
          );
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex - 1;
    this.pageSize = params.pageSize
    /*const { pageSize, pageIndex} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;*/

    this.filtre();
  }

  filtre() {
    let startDate = undefined;
    let endDate = undefined;
    if (this.choosenDate) {
      startDate = this.choosenDate[0] ? this.choosenDate[0].toISOString() : undefined;
      endDate = this.choosenDate[1] ? this.choosenDate[1].toISOString() : undefined;
    }
    let prenom = null;
    let nom = null;
    if (this.patientPers) {
      prenom = this.patientPers.prenom;
      nom = this.patientPers.nom;
    }
    this.getRdvByPage(this.pageIndex, this.pageSize,
      prenom!, nom!, this.rdvStatut, this.serviceId, startDate, endDate)
  }

  getPatientInfos(patient: PatientInterface): string {
    return `${patient.personne.prenom} ${patient.personne.nom} - ${patient.personne.telephone}`
  }


  private loadPatients() {
    this.api.getAllPatients().subscribe({
      next: result => {
        this.listOfPatients = result.filter(patient => !!patient.personne);
      }
    })
  }

  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result == 'toPrestations') {
          this.router.navigateByUrl('/admin/dossiers/prestation');
        }
      }
    );

  }

  addRdv() {
    const dialog = this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzClosable: false,
      nzWidth: '40rem',
      nzCentered: true,
    })
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
      this.countByStatus();
      this.getGraphData(this.isLastWeek);
    });
  }

  updateRdv(data: RendezVousInterface) {
    if (!this.isCreated(data.statut!)) return;

    const dialog = this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzData : data,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
    });
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
      this.getGraphData(this.isLastWeek);
    })
  }

  seeDetails(rdv: RendezVousInterface) {
    this.modalService.create({
      nzContent: DetailRendezVousComponent,
      nzData: rdv,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
      nzFooter: null
    });
  }

  cancelOrValidateRDV(rdv: RendezVousInterface, type?: 'V' | 'C') {
    if (type && type == 'C') {
      if (this.isCanceled(rdv.statut!)) return;
      const dialog = this.modalService.create({
        nzContent: CancelRdvDialogComponent,
        nzData: rdv,
        nzClosable: false,
        nzWidth: '40rem',
        nzCentered: true,
      });
      dialog.afterClose.subscribe(() => {
        this.filtre();
        this.countByStatus();
        this.getGraphData(this.isLastWeek);
      })
    } else if (type && type == 'V') {
      if (this.isValidated(rdv.statut!)) return;
      rdv.motif = undefined;
      rdv.statut = RDVStatus.VALIDATED;
      this.api.updateRdv(rdv).subscribe({
        next: () => {
          // this.apiRdv.getAllRdv();
          this.notification.snackMessage(
            `Rendez-vous confirmé avec succés pour le patient ${rdv.patient.personne.prenom} ${rdv.patient.personne.nom}`,
            3000, 'success');
          this.filtre();
          this.countByStatus();
          this.getGraphData(this.isLastWeek);
        }
      })
    }


  }

  isCreated(rdvStatus: RDVStatus): boolean {
    return rdvStatus === RDVStatus.CREATED;
  }

  isCanceled(rdvStaus: RDVStatus): boolean {
    return rdvStaus === RDVStatus.CANCELED;
  }

  isValidated(rdvStatus: RDVStatus): boolean {
    // return [RDVStatus.CREATED, RDVStatus.CANCELED].indexOf(rdvStatus) === -1
    return rdvStatus === RDVStatus.VALIDATED;
  }

  getStatusInfo(status: RDVStatus): { color: string; text: string } {
    let color = '#5D6273';
    let text = 'à confirmer';

    switch (status) {
      case RDVStatus.CREATED:
        color = '#5D6273';
        text = 'à confirmer';
        break;
      case RDVStatus.VALIDATED:
        color = '#84BE38';
        text = 'confirmé';
        break;
      case RDVStatus.CANCELED:
        color = '#A81735';
        text = 'annulé';
        break;
    }

    return {color, text};
  }


  initialiseCanvasGraphs() {
    this.barGraph = new Chart.Chart("weeklyRDVStats", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Lundi', 'Mardi', 'Mercredi',
          'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "A Confirmer",
            data: ['0', '0', '0', '0', '0',
              '0', '0'],
            backgroundColor: '#5D6273',
            borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          },
          {
            label: "Confirmés",
            data: ['0', '0', '0', '0', '0',
              '0', '0'],
            backgroundColor: '#84BE38',
            borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          },
          {
            label: "Annulés",
            data: ['0', '0', '0', '0', '0',
              '0', '0'],
            backgroundColor: '#A81735',
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

    this.doughnutGraph = new Chart.Chart("discRDVStatusGraph", {
        type: 'doughnut',
        data: {
          labels: [
            'A Confirmer',
            'Confirmés',
            'Annulés',
          ],
          datasets: [{
            // label: 'My First Dataset',
            data: ["5", "5", "5"],
            backgroundColor: [
              '#5D6273',
              '#84BE38',
              '#A81735',
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

  getGraphData(lastWeek: boolean = false) {
    this.api.countWeeklyForAll().subscribe(
      result => {
        this.wBarFlowStats = result;
        this.updateGraphStats(lastWeek, result);
      }
    );
  }

  updateGraphStats(lastWeek: boolean = false, weeklyRDVStats: WeeklyRDVStats) {
    this.barGraph.data.datasets[0].data = lastWeek ?
      weeklyRDVStats.createdRDVStats.previousWeekCounts : weeklyRDVStats.createdRDVStats.currentWeekCounts;
    this.barGraph.data.datasets[1].data = lastWeek ?
      weeklyRDVStats.validatedRDVStats.previousWeekCounts : weeklyRDVStats.validatedRDVStats.currentWeekCounts;
    this.barGraph.data.datasets[2].data = lastWeek ?
      weeklyRDVStats.canceledRDVStats.previousWeekCounts : weeklyRDVStats.canceledRDVStats.currentWeekCounts;
    this.barGraph.update();
  }

  updateDiscFlowStatus(discData: number[]) {
    this.doughnutGraph.data.datasets[0].data = discData;
    this.doughnutGraph.update();
  }

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.listOfService.filter(s => s.pole?.id === pole.id);
  }

  OnWeekChange($event: any) {
    console.log('MODIFIER ', $event);
    this.updateGraphStats($event, this.wBarFlowStats);
  }

  hasAction(codeAction: string): boolean {
    if (this.profilService.isSuperAdmin()) return true;
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
