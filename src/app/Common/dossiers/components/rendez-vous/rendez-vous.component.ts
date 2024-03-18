import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {RendezVousFormDialogComponent} from "../../dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PatientInterface} from "src/app/models/patient.interface";
import {RendezVousService} from "src/app/services/rendez-vous/rendez-vous.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {DetailRdvPatientComponent} from "../../dialogs/detail-rdv-patient/detail-rdv-patient.component";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Page} from "src/app/models/pagination.interface";
import {RDVStatus, RendezVousInterface} from "src/app/models/rendez-vous.interface";
import {NotifService} from "src/app/services/notification/notif.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {PoleInterface} from "src/app/models/pole.interface";
import {PersonneInterface} from "../../../../models/personne.interface";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.sass']
})
export class RendezVousComponent implements OnInit {

  listDataMapToday!:Page<RendezVousInterface>;

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

  // Chemin vers l'icône dans le dossier des actifs
  customIconPath = 'assets/icon/calendar_small.svg';

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
        return '';
    }
  }

  constructor(private modalService: NzModalService,
              private api: RendezVousService,
              private notification: NotifService,
              private apiService : CliniqueServiceService) {
  }

  ngOnInit(): void {
    this.getAllService();
    //this.getAllRdv();
    this.getRdvByPage();
    this.loadPatients();
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
  getAllRdv() {
    this.api.getAllRdv().subscribe({
      next: response => {
        console.log("Liste des rdv ", response);
        this.listDataMapToday = response
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
    /*let date = ''
    if(this.date){
      date = this.formatCustomDate(this.date)
    }
    this.api.getAllRdvPagination(0, 5,this.filtrePatient, this.filtrePatient,this.filtrePatient,this.serviceId,date).subscribe({
      next: response => {
        console.log("Liste des rdv filter page ", response);
        console.log(response)
        this.paginatedData = response;
        this.prestationsList = this.paginatedData.content;
        this.pageSize = this.paginatedData.pageable.pageSize;
        this.pageIndex = this.paginatedData.pageable.pageNumber + 1;
        this.total = this.paginatedData.totalElements;
        this.loading = false;
      }
    })*/
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

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }


  showEvent(event: any) {
    console.log(event)
  }

  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      ()=>{
        this.getAllRdv()
      }
    );

  }

  private loadPatients() {
    this.api.getAllPatients().subscribe({
      next: result => {
        this.listOfPatients = result.filter(patient => !!patient.personne);
      }
    })
  }
  // TODO METTRE DANS UN PIPE POUR GENERALISER SON UTILISATION DANS LES AUTRES COMPONENTS

  formatDateString(inputDateStr: Date | string): string {
    const inputDate = new Date(inputDateStr);
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth() renvoie un mois indexé à 0
    const year = inputDate.getFullYear();
    const hour = inputDate.getHours().toString().padStart(2, '0');
    const minute = inputDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}`;
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
    });
  }

  detailRdv(data : any) {
    const dialog = this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzData : data,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
    });
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
    })
  }

  getDayOfMonth(dateString : string): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getDate();
  }

  getMonthOfYear(dateString : string): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getMonth();
  }

  getYear(dateString : string):number {
    const dateObject : Date = new Date(dateString);
    return dateObject.getFullYear()
  }

  getHour(dateString: Date): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getHours();
  }

  getMinutes(dateString: Date): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getMinutes();
  }


  detailPatient(patient :any) {
    const dialog = this.modalService.create({
      nzContent: DetailRdvPatientComponent,
      nzData : patient,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
    });
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
    })
  }

  deleteRdv(id: any) {
    this.api.deleteRdv(id).subscribe({
      next : res =>{
        console.log(res);
        this.notification.snackMessage(`Rendez-vous mis supprimé avec succés`, 3000, 'success')

      }
    })
  }

  private formatCustomDate(inputDate: string): string {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.listOfService.filter(s => s.pole?.id === pole.id);
  }


}
