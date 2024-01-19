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
import {PoleService} from "../../../../services/pole/pole.service";
import {CliniqueServiceService} from "../../../../services/service/clinique-service.service";
import {PrestationService} from "../../../../services/prestation/prestation.service";
import {PersonnelService} from "../../../../services/personnel/personnel.service";
import {PatientService} from "../../../../services/patient/patient.service";
import {PrestationInterface} from "../../../../models/prestation.interface";

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
    //medecin: '',
    //pole:'',
    service:'',
    dateRv: '',
    patient: '',
    presence: '',
    duree: 30,
    remarques: "doit venir avec des gangs",
    rappels: "",
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private api : RendezVousService,
              private apiPole : PoleService,
              private apiService : CliniqueServiceService,
              private apiPatient : PatientService,
              private apiPersonnel : PersonnelService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.apiPole.getAllPole().subscribe({
      next : res => {
        this.listOfPole = res.reponse
        console.log(this.listOfPole)
      }
    })

    this.apiPatient.getAll().subscribe({
      next : res => {
        this.listOfPatient = res as PatientInterface[]
      }
    })

    this.apiPersonnel.getAllPersonnel().subscribe({
      next : res => {
        this.listOfMedecin = res.reponse
      }
    })

    this.apiService.getAllService().subscribe({
      next : res => {
        this.listService = res.reponse
      }
    })
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    const formData = this.RvForm.value;
    const rv = this.createRdvFromForm(formData);
    console.log(rv)
    this.api.saveRdv(rv).subscribe({
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

  getDay(dateString : string): Date {
    const dateObject: Date = new Date(dateString);
    return dateObject;
  }

  createRdvFromForm(formData: any): {
    dateRv: any;
    remarques: string;
    patient: { id: any };
    rappels: string;
    service: { id: any };
    duree: number
  } {
    return {
      dateRv: formData.dateRv,
      duree: 0,
      patient: {id : formData.patient},
      rappels: "",
      remarques: "",
      service: {id : formData.service},
    };
  }

}
