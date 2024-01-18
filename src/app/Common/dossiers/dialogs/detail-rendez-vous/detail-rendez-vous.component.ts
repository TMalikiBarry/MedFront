import { Component } from '@angular/core';
import {listMedecins, Medecin} from "../../../../models/Utils/medecins";
import {listPoles, Poles} from "../../../../models/Utils/poles";
import {listPrestations, Prestations} from "../../../../models/Utils/prestations";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {listService, Service} from "../../../../models/Utils/constants";

@Component({
  selector: 'app-detail-rendez-vous',
  templateUrl: './detail-rendez-vous.component.html',
  styleUrls: ['./detail-rendez-vous.component.sass']
})
export class DetailRendezVousComponent {
  titleForm = "Detail du Rendez-vous";
  formDesc = "les modifications de ce rendez-vous seront enregistrees";
  btnText = "Enregistrer";
  date !: string
  isConfirmLoading = false;
  listOfMedecin!: Medecin[];
  listOfPole!: Poles[];
  listOfServices !: Service[];
  listOfPrestation!: Prestations[];

  prestationForm = this.fb.group({
    patient : '',
    number : '',
    service : '',
    medecin: '',
    date: '',
    presence : '',
    note : '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.listOfMedecin = listMedecins;
    this.listOfPole = listPoles;
    this.listOfPrestation = listPrestations;
    this.listOfServices = listService;
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
  }

  triggerFileUpload() {
    document.getElementById('file_uploader')!.click();
  }

  getEvent(event: Event) {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
