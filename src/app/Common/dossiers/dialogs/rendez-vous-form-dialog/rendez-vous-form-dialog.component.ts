import { Component } from '@angular/core';
import {listService, Service} from "../../../../models/Utils/constants";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {listMedecins} from "../../../../models/Utils/medecins";
import {listPoles, Poles} from "../../../../models/Utils/poles";
import {PersonnelInterface} from "../../../../models/personnel.interface";
import {PatientInterface} from "../../../../models/patient.interface";
import {RendezVousInterface} from "../../../../models/rendez-vous.interface";
import {RendezVousService} from "../../../../services/rendez-vous/rendez-vous.service";

@Component({
  selector: 'app-rendez-vous-form-dialog',
  templateUrl: './rendez-vous-form-dialog.component.html',
  styleUrls: ['./rendez-vous-form-dialog.component.sass']
})
export class RendezVousFormDialogComponent {

  titleForm = "Nouvelle Rendez-vous";
  formDesc = "Veuillez remplir ce formulaire pour ajouter un rendez-vous";
  btnText = "Enregistrer";
  date !: string
  isConfirmLoading = false;
  listOfMedecin!: PersonnelInterface[];
  listOfPole!: Poles[];
  listService!: Service[];
  listOfPatient !: PatientInterface[]
  rendezVous !: RendezVousInterface;

  RvForm = this.fb.group({
    medecin: '',
    pole:'',
    service:'',
    date: '',
    patient: '',
    presence: '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private api : RendezVousService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.listOfMedecin = listMedecins;
    this.listOfPole = listPoles;
    this.listService = listService;
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    console.log(this.RvForm.value)
    this.api.saveRdv(this.RvForm.value).subscribe({
      next: (response) => {
        console.log('RendezVous enregistrée avec succès ', response);
      },
      error: (error) => console.error('Erreur lors de l\'enregistrement', error),
      complete: () => {this.isConfirmLoading = false}
    });
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
