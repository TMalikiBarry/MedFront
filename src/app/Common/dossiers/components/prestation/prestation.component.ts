import {Component, OnInit} from '@angular/core';
import {listService, Service} from "../../../../models/Utils/constants";

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

  constructor() {
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
}
