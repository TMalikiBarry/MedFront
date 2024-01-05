import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {listService, Service} from "../../../../models/Utils/constants";

@Component({
  selector: 'app-prestation-form-dialog',
  templateUrl: './prestation-form-dialog.component.html',
  styleUrls: ['./prestation-form-dialog.component.sass']
})
export class PrestationFormDialogComponent implements OnInit{

  titleForm = "Nouvelle prestation";
  formDesc = "Veuillez remplir ce formulaire pour ajouter une prestation";
  btnText = "Valider";
  isConfirmLoading = false;
  listOfService!: Service[];

  prestationForm = this.fb.group({
    service: '',
    diagnostic:'',
    conclusion:'',
    prescription: '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.listOfService = listService;
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
}
