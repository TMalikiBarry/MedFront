import {Component} from '@angular/core';
import {ServiceInterface} from "src/app/models/service.interface";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {Page} from "src/app/models/pagination.interface";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {PersonneInterface} from "src/app/models/personne.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {NewPaymentFormDialogComponent} from "../../dialogs/new-payment-form-dialog/new-payment-form-dialog.component";
import {FacturationComponent} from "../../../dossiers/dialogs/facturation/facturation.component";
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {TransactionService} from "src/app/services/transaction/transaction.service";
import * as Chart from "chart.js/auto";
import {TransactionInterface} from "src/app/models/transaction.interface";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent {
  numberStats = [3, 0, 2, 0];
  descSats = ["Total des paiements","Paiement en espéces","Prise en charge", "Payée partiellement"]
  choosenDate!: Date[];
  serviceId!: number;
  chartTrans!: any;
  listOfService!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  paginatedData!: Page<TransactionInterface>;
  patientPers!: PersonneInterface;
  pageIndex: number = 0;
  pageSize: number = 10;

  // prestationsList: PrestationInterface[] = [];
  listOfPole!: PoleInterface[];

  constructor(private modalService: NzModalService,
              private api: PrestationService,
              private apiTransaction : TransactionService,
              private serviceApi: CliniqueServiceService,
              private dossierMApi: DossierMedicalService) {
  }

  ngOnInit(): void {
    // this.listOfService = <ServiceInterface[]>listService;
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
    this.getCountTransMoyen()
    this.loadPatients();
    this.getAllTransaction();
    this.getTransactionByPage();
    this.createCanvasFigures();
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
            label: "Momo",
            data: ['401000','415000', '380000', '365000', '421000',
              '411000', '400000'],
            borderColor: '#266141',
            backgroundColor: '#266141',
            tension: .42,
            // pointRadius: [5, 5, 10, 5, 5, 5, 5], // Point central (Mercredi) avec un rayon plus grand pour indiquer l'extréma local
            // pointStyle: ['circle', 'circle', 'rect', 'circle', 'circle', 'circle', 'circle'], // Point central (Mercredi) de forme rectangulaire
          },
          {
            label: "Paiement Espece",
            data: ['302000', '350000', '340000', '340000', '310000',
              '360000', '360000'],
            backgroundColor: '#84BE38',
            borderColor: '#84BE38',
            tension: .42
          },
          {
            label: "Prise en Charger",
            data: ['290000', '310000', '300000', '280000', '275000',
              '250000', '270000'],
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
        }
      }
    });

    //this.getAllTransaction();
    this.getTransactionByPage();
    this.getCountPaiementEspece();
  }

  getTransactionByPage(page: number = 0,
                       size: number = 10){
    this.apiTransaction.getAllTransactionPage(page, size).subscribe({
      next: response => {
        console.log("Liste des transactions ", response);
        this.paginatedData = response;

        // SET STATS
        let allTransaction = this.paginatedData.content

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
          // this.prestationsList = this.paginatedData.content;

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
    this.getTransactionByPage(this.pageIndex, params.pageSize)
  }

  filterData() {
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
    this.getTransactionByPage(this.pageIndex, this.pageSize)
  }

  /*
    onChange(result: Date): void {
      if (typeof result == 'object')
        console.log('onChange: ', result.toISOString());
      console.log('SELECTION: ', result)
    }
  */


  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzWidth: 900,
      nzClosable: false,
    }).afterClose.subscribe(
      ()=>{
        this.getTransactionByPage()
      }
    );
  }

  addNewPaiment() {
    this.modalService.create({
      nzContent: NewPaymentFormDialogComponent,
      nzWidth: 800,
      nzClosable: false,
    }).afterClose.subscribe(
      ()=>{
        this.getTransactionByPage()
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

  getPatientID(prestation: PrestationInterface): number {
    return ( prestation.id!*17*1000 + prestation.dossierMedical?.id!*19*10 + prestation.dossierMedical?.patient?.id!)
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


  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.listOfService.filter(s => s.pole?.id === pole.id);
  }

  /*  getData(event: any, context: string) {
      console.log(`MY EVENT ${context}`, event);
      this.getPrestationsByPage(event);
    }*/
  facturer(prestation: PrestationInterface) {
    console.log(prestation)
    this.modalService.create({
      nzContent : FacturationComponent,
      nzClosable: false,
      nzData : prestation,
    }).afterClose.subscribe(
      ()=>{
        this.getTransactionByPage()
      }
    );
  }
  getPersonnelName(personnel: PersonnelInterface | undefined) {
    const personne = personnel ? personnel.personne : undefined
    return personne ? `${personne.prenom} ${personne.nom}` : undefined;

  }

  displaySelected(event: any) {
    console.log(event)
  }

  export() {

  }

  private getAllTransaction() {
    this.apiTransaction.getAllTransaction().subscribe({
      next : value => {
        console.log(value)
      }
    })
  }

  private getCountTransMoyen() {
    this.apiTransaction.getCountTransactionByMoyen().subscribe({
      next : value => {
        console.log(value)
      }
    })
  }

  private getCountPaiementEspece() {
    this.apiTransaction.getCountTransactionCash().subscribe({
      next : value => {
        this.numberStats[1] = value.reponse
      }
    })
  }
}
