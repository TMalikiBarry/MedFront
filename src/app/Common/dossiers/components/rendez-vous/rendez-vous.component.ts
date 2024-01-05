import {Component} from '@angular/core';

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

}
