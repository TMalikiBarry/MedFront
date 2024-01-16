import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {listService, my_prescription, Service} from "../../../../models/Utils/constants";
import {UtilsService} from "../../../../services/utils/utils.service";
import {PrestationInterface} from "../../../../models/prestation.interface";
import {PrestationService} from "../../../../services/prestation/prestation.service";

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

  addPrestation() {
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
  }

  triggerFileUpload() {
    document.getElementById('file_uploader')!.click();
  }

  getEvent(event: Event) {
  }

  createPrestationFromForm(formData: any): PrestationInterface {
    const cout  = this.listOfService.find(s => s.id === formData.service)?.cout ?? 12000;
    return {
      cout, // Supposé fixe, peut être ajusté en fonction de la logique de votre application
      prerequisities: "Venir à jeun", // Peut être ajusté ou récupéré du formulaire si nécessaire
      diagnostic: formData.diagnostic,
      conclusion: formData.conclusion,
      //personnel: { id: 3 }, // L'ID doit correspondre à la logique de votre application
      dossierMedical: { id: 1 }, // L'ID doit correspondre à la logique de votre application
      service: { id: formData.service } // Supposé que le service dans le formulaire est l'ID
    };
  }
}
