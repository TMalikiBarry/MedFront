import {Component, OnInit} from '@angular/core';
import {ServiceInterface} from "src/app/models/service.interface";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {Page} from "src/app/models/pagination.interface";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {PersonneInterface} from "src/app/models/personne.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {TransactionService} from "src/app/services/transaction/transaction.service";
import * as Chart from "chart.js/auto";
import {
  MoyenPaymentFilter,
  TransactionInterface,
  TransactionStatus,
  TransactionStatusFilter
} from "src/app/models/transaction.interface";
import {WeeklyTransactionAmountStatInterface} from "src/app/models/weekly-transaction-amount-stat.interface";
import {UtilsService} from "src/app/services/utils/utils.service";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {NotifService} from "src/app/services/notification/notif.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {
  numberStats = [0, 0, 0, 0];
  descSats = ["Total de paiements", "Paiements initiés", "Paiements en succès", "Paiements échoués"]
  colorStats = ['black', '#5D6273', '#20AC2E', '#A81735'];
  svgList = ['', '_initie', '_success', '_failed']
  choosenDate!: Date[];
  moyenPaymentEnum = MoyenPaymentFilter;
  selectedMoyenPayment!: MoyenPaymentFilter;
  transactionStatusEnum = TransactionStatusFilter;
  selectedTransactionStatus!: TransactionStatusFilter;
  serviceId!: number;
  chartTrans!: any;
  listOfService!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  paginatedData!: Page<TransactionInterface>;
  patientPers!: PersonneInterface;
  choosenPrestation!: PrestationInterface;
  pageIndex: number = 0;
  pageSize: number = 10;
  isLastWeek = false;
  montantMin!: number;
  montantMax!: number;

  firstTime = true;

  // prestationsList: PrestationInterface[] = [];
  listOfPole!: PoleInterface[];
  listPrestation!: PrestationInterface[];

  constructor(private modalService: NzModalService,
              private apiTransaction : TransactionService,
              private serviceApi: CliniqueServiceService,
              private dossierMApi: DossierMedicalService,
              public utils: UtilsService,
              private profilService: ProfilService,
              private notify: NotifService) {
  }

  ngOnInit(): void {
    this.createCanvasFigures();
    // this.listOfService = <ServiceInterface[]>listService;
    this.getServicesAndPoles();
    this.countTransactionByStatus();
    this.getCountTransMoyen();
    this.loadPatients();
    this.loadPrestations();
    // this.getAllTransaction();
    this.getTransactionByPage(this.pageIndex, this.pageSize, true);

  }

  createCanvasFigures() {
    // const canvasPatientsStats = document.getElementById('patientsStats')

    this.chartTrans = new Chart.Chart("TransStats", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Lundi', 'Mardi','Mercredi',
          'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "Orange Money",
            data: ['0', '0', '0', '0', '0', '0', '0'],
            borderColor: '#266141',
            backgroundColor: '#266141',
            tension: .42,
            // pointRadius: [5, 5, 10, 5, 5, 5, 5], // Point central (Mercredi) avec un rayon plus grand pour indiquer l'extréma local
            // pointStyle: ['circle', 'circle', 'rect', 'circle', 'circle', 'circle', 'circle'], // Point central (Mercredi) de forme rectangulaire
          },
          {
            label: "Wave",
            data: ['0', '0', '0', '0', '0', '0', '0'],
            backgroundColor: '#84BE38',
            borderColor: '#84BE38',
            tension: .42
          },
          {
            label: "Paiement en espece",
            data: ['0', '0', '0', '0', '0', '0', '0'],
            backgroundColor: '#FDCD51',
            borderColor: '#FDCD51',
            tension: .42
          }
        ]
      },
      options: {
        aspectRatio: 1.8,
        plugins: {
          legend: {
            display: false // Supprimer la légende
          }
        },
        scales: {
          y: {
            min: 0, // Définit le minimum de l'axe des ordonnées à zéro
            // D'autres configurations d'échelle si nécessaire...
            type: 'linear', // Utiliser une échelle linéaire
            ticks: {
              // stepSize: 1, // Taille du pas de l'axe des ordonnées
              precision: 0 // Précision des étiquettes (aucune décimale)
            }
          }
        }
      }
    });

  }

  getServicesAndPoles() {
    this.serviceApi.getAllService().subscribe({
      next: result => {
        this.listOfService = result.reponse as ServiceInterface[];
        this.listOfPole = this.listOfService
          .map(s => s.pole!) // Créez un tableau de tous les pôles
          .filter((pole, index, self) =>
            pole && self.findIndex(p => p.id === pole.id) === index
          );
      },
    });
  }

  getChartData(lastWeek: boolean = false) {
    this.apiTransaction.getWeeklyTransactionAmountStats().subscribe({
      next: result => {
        const res: WeeklyTransactionAmountStatInterface = <WeeklyTransactionAmountStatInterface>result;
        this.updateTransactionStats(lastWeek, res);
      }
    })
  }

  updateTransactionStats(lastWeek: boolean = false, transactionStats: WeeklyTransactionAmountStatInterface) {
    this.chartTrans.data.datasets[0].data = lastWeek ? transactionStats.omTransactionStats.previousWeekCounts :
      transactionStats.omTransactionStats.currentWeekCounts;
    this.chartTrans.data.datasets[1].data = lastWeek ? transactionStats.waveTransactionStats.previousWeekCounts :
      transactionStats.waveTransactionStats.currentWeekCounts;
    this.chartTrans.data.datasets[2].data = lastWeek ? transactionStats.cashTransactionStats.previousWeekCounts :
      transactionStats.cashTransactionStats.currentWeekCounts;
    this.chartTrans.update();
  }

  OnWeekChange(event: any) {
    this.getChartData(event);
  }

  countTransactionByStatus() {
    this.apiTransaction.countByStatus().subscribe(
      value => this.numberStats = value,
    )
  }
  getTransactionByPage(page: number = 0,
                       size: number = 10, loadChartData: boolean = false) {

    if (loadChartData) {
      this.getChartData(this.isLastWeek)
    }
    let startDate = undefined;
    let endDate = undefined;

    if (this.choosenDate) {
      startDate = this.choosenDate[0] ? this.choosenDate[0].toISOString() : undefined;
      endDate = this.choosenDate[1] ? this.choosenDate[1].toISOString() : undefined;
    }

    this.apiTransaction.getAllTransactionPage(page, size, undefined, this.choosenPrestation?.id,
      undefined, this.serviceId, this.montantMin, this.montantMax,
      this.selectedTransactionStatus, this.selectedMoyenPayment, startDate, endDate)
      .subscribe({
      next: response => {
        console.log("Liste des transactions ", response);
        this.paginatedData = response;

        // SET STATS
        /*let allTransaction = this.paginatedData.content

        //let TransCash = allTransaction.filter(transaction => transaction.moyenPayment.toString() === 'CASH')
        let TransPrise = allTransaction.filter(transaction => transaction.moyenPayment.toString() === 'ASSURANCE')
        let TransPartiel = allTransaction.filter(transaction => transaction.moyenPayment.toString() === 'ASSURANCE')
          // Total Paiement
          this.numberStats[0] = this.paginatedData.totalElements;
          // Paiement espece
          //this.numberStats[1] = TransCash.length;
          // Prise en charge
          this.numberStats[2] = TransPrise.length
          // payement partiel
          this.numberStats[3] = TransPartiel.length
          // this.prestationsList = this.paginatedData.content;*/

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
    const sortOrder = (currentSort && currentSort.value) || null;    let prenom = null;
    let nom = null;
    if (this.patientPers){
      prenom = this.patientPers.prenom;
      nom = this.patientPers.nom;
    }*/
    if (!this.firstTime) this.filterData();
    this.firstTime = false;
  }

  filterData() {
    this.getTransactionByPage(this.pageIndex, this.pageSize)
  }

  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzWidth: 900,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      ()=>{
        this.getTransactionByPage(this.pageIndex, this.pageSize, true)
      }
    );
  }

  loadPatients() {
    this.dossierMApi.getAll().subscribe({
      next: result => {
        this.listOfDossierMedical = result.filter(dossier => !!dossier.patient?.personne);
      }
    });
  }

  getPatientName(dossierMedical: DossierMedicalInterface):string {
    return `${dossierMedical?.patient?.personne.prenom} ${dossierMedical?.patient?.personne.nom}`
  }
  // TODO METTRE DANS UN PIPE POUR GENERALISER SON UTILISATION DANS LES AUTRES COMPONENTS

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

  private getCountTransMoyen() {
    this.apiTransaction.getCountTransactionByMoyen().subscribe({
      next : value => {
        console.log(value)
      }
    })
  }

  formatPrestation(p: PrestationInterface) {
    return `${p.id} - ${this.getPatientInfos(p.dossierMedical?.patient?.personne!)} -- ${p.service?.nom} - ${p.service?.pole?.nom}`;
  }

  handleExtremumMontant(type: 'min' | 'max', event: any) {
    console.log('CHOISI NUMBER ', event);
    const montantDiff = this.montantMax - this.montantMin;
    if (type === 'min') {
      if (this.montantMin < 0)
        this.montantMin = 0
      this.montantMax = montantDiff < 500 ? this.montantMin + 500 : this.montantMax;
    } else {
      if (this.montantMax < 500)
        this.montantMax = 1000
      this.montantMin = montantDiff <= 0 ? this.montantMax - 500 : this.montantMin;
    }
  }

  private getPatientInfos(p: PersonneInterface) {
    return `${this.utils.getInitials(p.prenom)} ${p.nom.toUpperCase()} - ${p.telephone}`;
  }

  private loadPrestations() {
    this.apiTransaction.getAllPrestations().subscribe({
      next: (data) => this.listPrestation = data,
    })
  }


  getStatusInfo(status: TransactionStatus): { color: string; text: string } {
    let color = '#5D6273';
    let text = 'initié';

    switch (status) {
      case TransactionStatus.INITIATED:
        color = '#5D6273';
        text = 'initié';
        break;
      case TransactionStatus.SUCCESS:
        color = '#20AC2E';
        text = 'succès';
        break;
      case TransactionStatus.FAILED:
        color = '#A81735';
        text = 'échec';
        break;

      case TransactionStatus.PENDING:
        color = '#4c4efd';
        text = 'en cours';
        break;
    }

    return {color, text};
  }

  hasAction(codeAction: string): boolean {
    if (this.profilService.isSuperAdmin()) return true;
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }

  export() {

  }
}
