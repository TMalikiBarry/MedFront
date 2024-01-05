import {Component, OnInit} from '@angular/core';
import {listService, Service} from "../../../../models/Utils/constants";
import {NzModalService} from "ng-zorro-antd/modal";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";

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

  constructor(private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.listOfService = listService
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
      nzWidth:'50rem'
    });
  }
}
