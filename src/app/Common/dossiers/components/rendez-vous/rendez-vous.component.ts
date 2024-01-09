import {Component} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {RendezVousFormDialogComponent} from "../../dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component";
import {DetailRendezVousComponent} from "../../dialogs/detail-rendez-vous/detail-rendez-vous.component";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.sass']
})
export class RendezVousComponent {

  listDataMap = {
    eight: [
      {type: 'warning', content: 'Extraction dentaire'},
      {type: 'success', content: 'Consultation'}
    ],
    ten: [
      {type: 'warning', content: 'Consultation'},
      {type: 'success', content: 'Consultation'},
      {type: 'error', content: 'Consultation'}
    ],
    eleven: [
      {type: 'warning', content: 'Consultation'},
      {type: 'success', content: 'Consultation'},
      {type: 'error', content: 'Consultation'},
      {type: 'error', content: 'Consultation'},
      {type: 'error', content: 'Consultation'},
      {type: 'error', content: 'Consultation'}
    ]
  }

  constructor(private modalService: NzModalService) {
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  patients = ['Babacar Adje', 'Thierno Barry', 'Elimane Ndiaye'];

  heures = ['08h00','09h00','10h00'];

  doctor = ['Derneville', 'Sarr', 'Bathily']

  prestation = ['neurologie' , 'neurologie', 'neurologie']

  addRdv() {
    //TODO appele formulaire ajout rdv
    this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzClosable: false,
      nzWidth:'50rem'
    });
  }

  detailRdv() {
    this.modalService.create({
      nzContent: DetailRendezVousComponent,
      nzClosable: false,
      nzWidth:'50rem'
    });
  }

  getDetail() {
    this.modalService.create({
      nzContent: DetailRendezVousComponent,
      nzClosable: false,
      nzWidth:'50rem'
    });
  }
}
