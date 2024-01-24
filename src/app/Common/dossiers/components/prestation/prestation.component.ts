import {Component, OnInit} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {PrestationInterface} from "src/app/models/prestation.interface";

import {Page} from "src/app/models/pagination.interface";
import {
  NewPaymentFormDialogComponent
} from "../../../finance/dialogs/new-payment-form-dialog/new-payment-form-dialog.component";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {PersonneInterface} from "../../../../models/personne.interface";

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.sass']
})
export class PrestationComponent implements OnInit{

  numberStats = [3, 0, 2, 0];
  descSats = ["Prestations","Prestation facturée","Prestations non facturées", "Partiellement payée"]
  dateDebut!: Date;
  serviceId!: number;
  listOfService!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  paginatedData!: Page<PrestationInterface>;
  patientPers!: PersonneInterface;
  pageIndex: number = 0;
  pageSize: number = 5;

  // prestationsList: PrestationInterface[] = [];

  constructor(private modalService: NzModalService,
              private api: PrestationService,
              private serviceApi: CliniqueServiceService,
              private dossierMApi: DossierMedicalService) {
  }

  ngOnInit(): void {
    // this.listOfService = <ServiceInterface[]>listService;
    this.serviceApi.getAllService().subscribe({
      next: result => {
        this.listOfService = result.reponse as ServiceInterface[];
      },
    });
    this.dossierMApi.getAll().subscribe({
      next: result => {
        this.listOfDossierMedical = result.filter( dossier => !!dossier.patient?.personne);
      }
    });
    this.getPrestationsByPage();
  }

  getPrestationsByPage(page: number = 0,
                       size: number = 5,
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
        this.numberStats[0] = this.paginatedData.totalElements;
        this.numberStats[2] = this.paginatedData.totalElements;
        this.numberStats[1] = this.numberStats[0]- this.numberStats[2]
        // this.prestationsList = this.paginatedData.content;
      }
    })
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(" onQueryParamsChange FUNCTIONS ", params);
    this.pageIndex = params.pageIndex -1;
    this.pageSize = params.pageSize
    /*const { pageSize, pageIndex} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;*/
    let prenom = null;
    let nom = null;
    if (this.patientPers){
      prenom = this.patientPers.prenom;
      nom = this.patientPers.nom;
    }
    this.getPrestationsByPage(this.pageIndex, params.pageSize,
      prenom!, nom!, this.serviceId,
      this.dateDebut ? this.dateDebut.toISOString(): undefined)
  }

  filterData() {
    let prenom = null;
    let nom = null;
    if (this.patientPers){
      prenom = this.patientPers.prenom;
      nom = this.patientPers.nom;
    }
    this.getPrestationsByPage(0, 5,
      prenom!, nom!, this.serviceId,
      this.dateDebut ? this.dateDebut.toISOString(): undefined)
  }

  onChange(result: Date): void {
    if (typeof result == 'object')
      console.log('onChange: ', result.toISOString());
    console.log('SELECTION: ', result)
  }


  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzClosable: false,
    }).afterClose.subscribe(
      ()=>{
        this.getPrestationsByPage()
      }
    );

  }


  addNewPayment() {
    this.modalService.create({
      nzContent: NewPaymentFormDialogComponent,
      nzClosable: false,
    }).afterClose.subscribe(
      ()=>{
        this.getPrestationsByPage()
      }
    );

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

/*  getData(event: any, context: string) {
    console.log(`MY EVENT ${context}`, event);
    this.getPrestationsByPage(event);
  }*/
}
