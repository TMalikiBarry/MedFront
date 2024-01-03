import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-prestation-form-dialog',
  templateUrl: './prestation-form-dialog.component.html',
  styleUrls: ['./prestation-form-dialog.component.sass']
})
export class PrestationFormDialogComponent implements OnInit{

  titleForm = "Nouvelle prestation";
  isConfirmLoading = false;

  constructor(private modal: NzModalRef) {
  }
  ngOnInit(): void {
  }


  handleCancel() {

  }

  handleOk() {

  }
}
