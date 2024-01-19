import { Component } from '@angular/core';
import {PersonnelInterface} from "../../../../models/personnel.interface";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-detail-rdv-patient',
  templateUrl: './detail-rdv-patient.component.html',
  styleUrls: ['./detail-rdv-patient.component.sass']
})
export class DetailRdvPatientComponent {
  titleForm = "Detail patient";
  formDesc = "les modifications de ce patient seront enregistrees";
  btnText = "Enregistrer";
  date !: string
  isConfirmLoading = false;
  data : any

  RvForm = this.fb.group({
    prenom : '',
    nom : '',
    date : '',
    telephone: '',
    genre : '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData
    console.log(this.data as PersonnelInterface)


    let dateRv : Date = new Date(this.data.personne.datenaissance)
    this.RvForm.controls.date.setValue(dateRv.toISOString())

    this.RvForm.controls.prenom.setValue(this.data.personne.prenom)
    this.RvForm.controls.nom.setValue(this.data.personne.nom)
    this.RvForm.controls.telephone.setValue(this.data.personne.telephone)
    this.RvForm.controls.genre.setValue(this.data.personne.genre)
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    console.log(this.RvForm.value)
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
