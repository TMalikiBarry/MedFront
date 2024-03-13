import {Component, OnInit} from '@angular/core';
import {listService, Service} from "src/app/models/Utils/constants";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {Poles} from "src/app/models/Utils/poles";
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {PatientInterface} from "src/app/models/patient.interface";
import {RendezVousInterface} from "src/app/models/rendez-vous.interface";
import {RendezVousService} from "src/app/services/rendez-vous/rendez-vous.service";
import {PoleService} from "src/app/services/pole/pole.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {PersonnelService} from "src/app/services/personnel/personnel.service";
import {PatientService} from "src/app/services/patient/patient.service";
import {
  NouveauPatientComponent
} from "../../../personnes/dialogs/nouveau-patient-form-dialog/nouveau-patient.component";
import {NotifService} from "src/app/services/notification/notif.service";

@Component({
  selector: 'app-rendez-vous-form-dialog',
  templateUrl: './rendez-vous-form-dialog.component.html',
  styleUrls: ['./rendez-vous-form-dialog.component.sass']
})
export class RendezVousFormDialogComponent implements OnInit {

  titleForm = "Nouveau Rendez-vous";
  formDesc = "Veuillez remplir ce formulaire pour ajouter un rendez-vous";
  btnText = "Enregistrer";
  date !: string
  isConfirmLoading = false;
  listOfMedecin!: PersonnelInterface[];
  listOfPole!: Poles[];
  listService!: Service[];
  listOfPatient !: PatientInterface[]
  rendezVous !: RendezVousInterface;
  filtreService !: Service[]
  data: any

  selectedDataFromSecondDialog: any;

  RvForm = this.fb.group({
    medecin: '',
    pole: '',
    service: '',
    dateRv: '',
    patient: '',
    presence: '',
    duree: '',
    remarques: '',
    rappels: '',
    resultat: ''
  })
  poleSelect: any;

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private api: RendezVousService,
              private apiPole: PoleService,
              private apiService: CliniqueServiceService,
              private apiPatient: PatientService,
              private apiRdv: RendezVousService,
              private apiPersonnel: PersonnelService,
              private notification: NotifService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.load()
    this.data = this.modal.getConfig().nzData
    console.log(this.data)

    if(this.data){

      this.RvForm.controls.patient.setValue(this.data.patient.id)
      // const formattedDate = this.formatCustomDate(this.data.dateRv);
      // console.log(formattedDate);

      //let dateRv : Date = new Date(this.data.dateRv)
      this.RvForm.controls.dateRv.setValue(this.data.dateRv)

      //this.RvForm.controls.dateRv.setValue(this.data.dateRv)
      this.RvForm.controls.medecin.setValue(this.data.personnel.id)
      this.RvForm.controls.service.setValue(this.data.service.id)
      this.RvForm.controls.pole.setValue(this.data.service.pole.id)
      this.RvForm.controls.duree.setValue(this.data.duree.toString())
      //this.RvForm.controls.number.setValue(this.data.patient.personne.telephone)
      this.RvForm.controls.remarques.setValue(this.data.remarques)
      this.RvForm.controls.presence.setValue("Non Confirmee")

    }
  }

  disabledDate = (current: Date): boolean => {
    const today = new Date();
    // Renvoie true si la date actuelle est antérieure à aujourd'hui
    return current.getTime() <= today.getTime();
  };

  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    const formData = this.RvForm.value;
    const rv = this.createRdvFromForm(formData);
    console.log(rv);
    this.isConfirmLoading = true;
    if(this.data){
      this.updateRdv(rv)
    }else{
      this.api.saveRdv(rv).subscribe({
        next: (response) => {
          this.modal.close();
          this.apiRdv.getAllRdv();
          console.log('RendezVous enregistrée avec succès ', response);
          this.notification.snackMessage(`Rendez-vous ajouté avec succés`, 3000, 'success')
        },
        error: (error) => {
          console.log(error);
          this.isConfirmLoading = false;
        },
        complete: () => {this.isConfirmLoading = false}
      });
    }
  }

  getDay(dateString : string): Date {
    return new Date(dateString);
  }

  createRdvFromForm(formData: any): {
    id : any
    dateRv: any;
    remarques: any;
    patient: { id: any };
    rappels: string;
    service: { id: any };
    duree: number;
    personnel: { id: any }
  } {
    return {
      id : null,
      dateRv: formData.dateRv,
      duree: formData.duree,
      patient: {id : formData.patient},
      rappels: "",
      remarques: formData.remarques,
      service: {id : formData.service},
      personnel : {id : formData.medecin}
    };
  }

  private load() {
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
        this.filtreService = res.reponse
        console.log(listService)
      }
    })

  }

  private updateRdv(rv: any) {
    rv.id = this.data.id
    this.api.updateRdv(rv).subscribe({
      next: (response) => {
        this.modal.close();
        this.apiRdv.getAllRdv();
        this.notification.snackMessage(`Rendez-vous mis à jour avec succés`, 3000, 'success')
        console.log('RendezVous mis a jour avec succès ', response);
      },
      error: (error) => {
        console.log(error);
        this.isConfirmLoading = false;
      },
      complete: () => {this.isConfirmLoading = false}
    });
  }

  NewPatient() {
    let dialog = this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 800,
      nzCentered: true,
    })
    dialog.afterClose.subscribe((result: any) => {
      console.log('Données reçues du modal :', result);
      this.load()
      this.RvForm.controls.patient.setValue(result)
    });
  }

  showEvent(event: any) {
    console.log(event)
    let idpole = event
    this.RvForm.controls.service.setValue(null)
    this.filtreService = this.listService.filter(service => service.pole?.id === idpole)
  }
}
