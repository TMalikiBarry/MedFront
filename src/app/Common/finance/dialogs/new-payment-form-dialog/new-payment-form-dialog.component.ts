import { Component } from '@angular/core';
import {listService, my_prescription, Service} from "../../../../models/Utils/constants";
import {FormBuilder, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {PrestationService} from "../../../../services/prestation/prestation.service";

@Component({
  selector: 'app-new-payment-form-dialog',
  templateUrl: './new-payment-form-dialog.component.html',
  styleUrls: ['./new-payment-form-dialog.component.sass']
})
export class NewPaymentFormDialogComponent {
  titleForm = "Nouvelle prestation";
  formDesc = "Veuillez remplir ce formulaire pour ajouter une prestation";
  btnText = "Valider";
  isConfirmLoading = false;
  listOfService!: Service[];
  listPrescription!: any;

  prestationForm = this.fb.group({
    service: ['', Validators.required],
    diagnostic:['', Validators.required],
    conclusion:['', Validators.required],
    prescription: '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private fb: FormBuilder,
              private utils: UtilsService,
              private api: PrestationService) {
  }
  ngOnInit(): void {
    this.listOfService = listService;
    this.listPrescription = my_prescription;
  }


  handleCancel() {
    this.modal.close();
  }

  addPayment() {
/*
    if (this.prestationForm.valid) {
      console.log(" CREATION DE PRESTATION ")
      this.isConfirmLoading = true;
      const formData = this.prestationForm.value;
      const prestation = this.createPrestationFromForm(formData);

      this.api.save(prestation).subscribe({
        next: (response) => {
          console.log(" SUCCES DE PRESTATION ")

          console.log('Prestation enregistrée avec succès ', response);
        },
        error: (error) => console.error('Erreur lors de l\'enregistrement de la prestation', error),
        complete: () => {this.isConfirmLoading = false}
      });
    }
*/
  }
}
