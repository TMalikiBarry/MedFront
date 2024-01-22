import {Component, OnInit} from '@angular/core';
import {listService, Service} from "src/app/models/Utils/constants";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {PrestationInterface} from "src/app/models/prestation.interface";

import {Page} from "src/app/models/pagination.interface";
import {
  NewPaymentFormDialogComponent
} from "../../../finance/dialogs/new-payment-form-dialog/new-payment-form-dialog.component";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.sass']
})
export class PrestationComponent implements OnInit{

  numberStats = [3, 0, 2, 0];
  descSats = ["Prestations","Prestation facturée","Prestations non facturées", "Partiellement payée"]
  date: any;
  singleValue!: Service;
  listOfService!: Service[];
  loading = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  paginatedData!: Page<PrestationInterface>;
  prestationsList: PrestationInterface[] = [];

  constructor(private modalService: NzModalService,
              private api: PrestationService) {
  }

  ngOnInit(): void {
    this.listOfService = listService;
    this.getPrestationsByPage();
  }

  getPrestationsByPage(page: number = 0, size: number = 5) {
    this.api.getPaginatedData(page, size).subscribe({
      next: response => {
        console.log("Liste des prestations ", response);
        this.paginatedData = response;
        // SET STATS
        this.numberStats[0] = this.paginatedData.totalElements;
        this.numberStats[2] = this.paginatedData.totalElements;
        this.numberStats[1] = this.numberStats[0]- this.numberStats[2]
        this.prestationsList = this.paginatedData.content;
        this.pageSize = this.paginatedData.pageable.pageSize;
        this.pageIndex = this.paginatedData.pageable.pageNumber + 1;
        this.total = this.paginatedData.totalElements;
        this.loading = false;
      }
    })
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

  getPatientName(prestation: PrestationInterface):string {
    return `${prestation.dossierMedical?.patient?.personne.prenom} ${prestation.dossierMedical?.patient?.personne.nom}`
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

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(" onQueryParamsChange FUNCTIONS ", params);
    /*const { pageSize, pageIndex} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;*/
    this.getPrestationsByPage(params.pageIndex - 1, params.pageSize)
  }
}
