import {Component, OnInit} from '@angular/core';
import {listService, Service} from "../../../../models/Utils/constants";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PrestationService} from "../../../../services/prestation/prestation.service";

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
      ()=>{}
    );

  }
}
