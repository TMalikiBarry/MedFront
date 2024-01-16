import {Component, OnInit} from '@angular/core';
import {listService, Service} from "../../../../models/Utils/constants";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PrestationService} from "../../../../services/prestation/prestation.service";
import {PrestationInterface} from "../../../../models/prestation.interface";

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.sass']
})
export class PrestationComponent implements OnInit{

  numberStats = [1428, 1000, 400, 28];
  descSats = ["Consultations","Consultations facturées","Consultations non facturées", "Partiellement payées"]
  date: any;
  singleValue!: Service;
  listOfService!: Service[];
  prestationsList!: PrestationInterface[];

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
        this.prestationsList = response.content;
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

  getPatientID(prestation: PrestationInterface): number {
    return ( prestation.id!*17*1000 + prestation.dossierMedical?.id!*19*10 + prestation.dossierMedical?.patient?.id!)
  }

  getPatientName(prestation: PrestationInterface):string {
    return `${prestation.dossierMedical?.patient?.personne.prenom} ${prestation.dossierMedical?.patient?.personne.nom}`
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
}
