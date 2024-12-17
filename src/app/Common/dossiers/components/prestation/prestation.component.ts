import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {PrestationInterface, PrestationStatut, WeeklyPrestationStats} from "src/app/models/prestation.interface";

import {Page} from "src/app/models/pagination.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {PersonneInterface} from "src/app/models/personne.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {FacturationComponent} from "../../dialogs/facturation/facturation.component";
import {NotifService} from "src/app/services/notification/notif.service";
import * as Chart from "chart.js/auto";
import {DetailsPrestationComponent} from "../../dialogs/details-prestation/details-prestation.component";
import {ProfilService} from "src/app/services/Profil/profil.service";

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.sass']
})
export class PrestationComponent implements OnInit{

  numberStats = [3, 0, 2, 0];
  descSats = ["Prestations", "Prestations non payées", "Prestations payées", "Prestations annulées"]
  colorStats = ['black', '#5D6273', '#20AC2E', '#A81735'];
  svgList = ['', '_notpaid', '_paid', '_canceled'];
  choosenDate!: Date[];
  serviceId!: number;
  listOfService!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  paginatedData!: Page<PrestationInterface>;
  patientPers!: PersonneInterface;
  pageIndex: number = 0;
  pageSize: number = 10;
  barGraph: any;
  doughnutGraph: any;
  isLastWeek: boolean = false;
  firstTime = true;

  // prestationsList: PrestationInterface[] = [];
  listOfPole!: PoleInterface[];
  private wBarFlowStats!: WeeklyPrestationStats;

  constructor(private modalService: NzModalService,
              private api: PrestationService,
              private serviceApi: CliniqueServiceService,
              private dossierMApi: DossierMedicalService,
              private notify: NotifService,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    // this.listOfService = <ServiceInterface[]>listService;
    this.getServicesAndPoles();
    this.initialiseCanvasGraphs();
    this.getGraphData();
    // this.countByStatus();
    this.loadPatients();
    this.getPrestationsByPage();
  }

  countByStatus() {
    this.api.countByStatus().subscribe(
      value => {
        this.numberStats = value;
        this.updateDiscFlowStatus(value.slice(-3));
      },
    )
  }

  getPrestationsByPage(page: number = 0,
                       size: number = 10,
                       firstName?: string,
                       lastName?: string,
                       serviceId?: number,
                       startDate?: string,
                       endDate?: string) {

    this.api.getPaginatedFilteredData(page, size, firstName, lastName, serviceId,
      startDate, endDate).subscribe({
      next: response => {
        console.log("Liste des prestations ", response);
        this.paginatedData = response;

        // SET STATS
        if (!firstName && !lastName && !serviceId && !startDate && !endDate) {
          this.countByStatus();
          // this.prestationsList = this.paginatedData.content;
        }

      },
      error: (error) => {
        if(error.includes('Permission non accord')) {
          this.notify.snackMessage("Permission non accordée pour cette action", 3500, "error");
        }
        console.error('Erreur lors de la récupération des patients', error);
        // Gérez l'erreur selon vos besoins
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex -1;
    this.pageSize = params.pageSize
    /*const { pageSize, pageIndex} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;*/
    if (!this.firstTime) this.filterData();

    this.firstTime = false;

  }

  filterData(recount?: boolean) {
    let startDate = undefined;
    let endDate = undefined;
    if (this.choosenDate) {
      startDate = this.choosenDate[0] ? this.choosenDate[0].toISOString(): undefined;
      endDate = this.choosenDate[1] ? this.choosenDate[1].toISOString(): undefined;
    }

    let prenom = null;
    let nom = null;
    if (this.patientPers){
      prenom = this.patientPers.prenom;
      nom = this.patientPers.nom;
    }

    if (recount) {
      this.countByStatus();
      this.getGraphData(this.isLastWeek);
    }

    this.getPrestationsByPage(this.pageIndex, this.pageSize,
      prenom!, nom!, this.serviceId, startDate, endDate)
  }

/*
  onChange(result: Date): void {
    if (typeof result == 'object')
      console.log('onChange: ', result.toISOString());
    console.log('SELECTION: ', result)
  }
*/

  getServicesAndPoles() {
    this.serviceApi.getAllService().subscribe({
      next: result => {
        this.listOfService = result.reponse as ServiceInterface[];
        console.log('LES SERVICES ', this.listOfService);
        console.log('LES POLES ', this.listOfService.map(s => s.pole!));
        this.listOfPole = this.listOfService
          .map(s => s.pole!) // Créez un tableau de tous les pôles
          .filter((pole, index, self) =>
            pole && self.findIndex(p => p.id === pole.id) === index
          );
      },
    });
  }

  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzWidth: 750,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      ()=>{
        this.getPrestationsByPage();
        this.getGraphData(this.isLastWeek);
      }
    );
  }

  // TODO Finaliser UPDATE PRESTATION
  updatePrestation(prestation: PrestationInterface) {
    if (!this.isNotPaid(prestation)) return;
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzWidth: 750,
      nzData: {
        ...prestation,
        context: 'PUT_PRESTATION'
      },
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      () => {
        this.filterData();
      }
    );
  }

  cancelPrestation(p: PrestationInterface) {
    if (this.isCanceled(p)) {
      p.prestationStatut = PrestationStatut.NOTPAID;
    } else if (this.isNotPaid(p)) {
      p.prestationStatut = PrestationStatut.CANCELED;
    }
    this.api.update(p).subscribe({
      next: p => {
        let verb = 'validé';
        if (this.isCanceled(p)) {
          verb = 'annulé'
        } else if (this.isNotPaid(p)) {
          verb = 'validé';
        }
        this.notify.snackMessage(
          `La prestation pour le patient ${this.getPatientName(p.dossierMedical!)} a été ${verb} avec succès`,
          2000, 'success');
        this.filterData(true);
      }
    });
  }

  /*
    addNewPayment() {
      this.modalService.create({
        nzContent: NewPaymentFormDialogComponent,
        nzClosable: false,
        nzCentered: true,
      }).afterClose.subscribe(
        ()=>{
          this.getPrestationsByPage()
        }
      );

    }
  */

  loadPatients() {
    this.dossierMApi.getAll().subscribe({
      next: result => {
        this.listOfDossierMedical = result.filter(dossier => !!dossier.patient?.personne);
      }
    });
  }

  /*  getPatientID(prestation: PrestationInterface): number {
      return ( prestation.id!*17*1000 + prestation.dossierMedical?.id!*19*10 + prestation.dossierMedical?.patient?.id!)
    }*/

  getPatientName(dossierMedical: DossierMedicalInterface):string {
    return `${dossierMedical?.patient?.personne.prenom} ${dossierMedical?.patient?.personne.nom}`
  }
  // TODO METTRE DANS UN PIPE POUR GENERALISER SON UTILISATION DANS LES AUTRES COMPONENTS

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.listOfService.filter(s => s.pole?.id === pole.id);
  }


/*  getData(event: any, context: string) {
    console.log(`MY EVENT ${context}`, event);
    this.getPrestationsByPage(event);
  }*/

  facturer(prestation: PrestationInterface) {
    if (!this.isNotPaid(prestation)) return;
    console.log(prestation)
    this.modalService.create({
      nzContent : FacturationComponent,
      nzClosable: false,
      nzData : prestation,
      nzWidth: 650,
      nzCentered: true
    }).afterClose.subscribe(
      ()=>{
        this.getPrestationsByPage();
        this.getGraphData(this.isLastWeek);
      }
    );
  }

  seePrestationDetails(prestation: PrestationInterface) {
    this.modalService.create({
      nzContent: DetailsPrestationComponent,
      nzData: prestation,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
      nzFooter: null
    });
  }
  /*
    getPersonnelName(personnel: PersonnelInterface | undefined) {
      const personne = personnel ? personnel.personne : undefined
      return personne ? `${personne.prenom} ${personne.nom}` : undefined;

    }
  */
  initialiseCanvasGraphs() {
    this.barGraph = new Chart.Chart("weeklyPrestationStats", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Lundi', 'Mardi', 'Mercredi',
          'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "Pas Payés",
            data: ['0', '0', '0', '0', '0',
              '0', '0'],
            backgroundColor: '#5D6273',
            borderWidth: .75 // Ajustez l'épaisseur de la bordure pour contrôler la largeur de la barre
          },
          {
            label: "Payés",
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

    this.doughnutGraph = new Chart.Chart("discPrestationStatusGraph", {
        type: 'doughnut',
        data: {
          labels: [
            'Pas Payés',
            'Payés',
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


  updateGraphStats(lastWeek: boolean = false, weeklyPrestationStats: WeeklyPrestationStats) {
    this.barGraph.data.datasets[0].data = lastWeek ?
      weeklyPrestationStats.notPaidPrestationStats.previousWeekCounts : weeklyPrestationStats.notPaidPrestationStats.currentWeekCounts;
    this.barGraph.data.datasets[1].data = lastWeek ?
      weeklyPrestationStats.paidPrestationStats.previousWeekCounts : weeklyPrestationStats.paidPrestationStats.currentWeekCounts;
    this.barGraph.data.datasets[2].data = lastWeek ?
      weeklyPrestationStats.canceledPrestationStats.previousWeekCounts : weeklyPrestationStats.canceledPrestationStats.currentWeekCounts;
    this.barGraph.update();
  }

  updateDiscFlowStatus(discData: number[]) {
    this.doughnutGraph.data.datasets[0].data = discData;
    this.doughnutGraph.update();
  }


  getStatusInfo(statut: PrestationStatut): { color: string; text: string } {
    let color = '#5D6273';
    let text = 'à payer';

    switch (statut) {
      case PrestationStatut.NOTPAID:
        color = '#5D6273';
        text = 'à payer';
        break;
      case PrestationStatut.PAID:
        color = '#84BE38';
        text = 'payé';
        break;
      case PrestationStatut.CANCELED:
        color = '#A81735';
        text = 'annulé';
        break;
    }

    return {color, text};
  }


  isPaid(prestation: PrestationInterface) {
    return prestation.prestationStatut === 'PAID';
  }

  isCanceled(prestation: PrestationInterface) {
    return prestation.prestationStatut === 'CANCELED';
  }

  isNotPaid(p: PrestationInterface) {
    return p.prestationStatut === 'NOTPAID';
  }

  getContext(prestation: PrestationInterface): { message: string; svgName: string } {
    let message = '', svgName = '';
    if (this.isCanceled(prestation)) {
      message = 'Valider';
      svgName = 'confirm-yes.svg';
    }
    if (this.isNotPaid(prestation)) {
      message = 'Annuler';
      svgName = 'confirm-no.svg';
    }
    return {message, svgName}
  }


  formatDateString(inputDateStr: Date | string): string {
    const inputDate = new Date(inputDateStr);
    // const day = inputDate.getDate().toString().padStart(2, '0');
    // const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth() renvoie un mois indexé à 0
    // const year = inputDate.getFullYear();
    // const hour = inputDate.getHours().toString().padStart(2, '0');
    // const minute = inputDate.getMinutes().toString().padStart(2, '0');
    //
    // return `${day}/${month}/${year} ${hour}:${minute}`;
    return inputDate.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  OnWeekChange($event: any) {
    this.updateGraphStats($event, this.wBarFlowStats)
  }

  hasAction(codeAction: string): boolean {
    if (this.profilService.isSuperAdmin()) return true;
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
