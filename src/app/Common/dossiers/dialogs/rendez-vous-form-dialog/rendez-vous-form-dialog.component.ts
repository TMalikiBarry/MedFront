import {Component, OnInit} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {PatientInterface} from "src/app/models/patient.interface";
import {RendezVousInterface} from "src/app/models/rendez-vous.interface";
import {RendezVousService} from "src/app/services/rendez-vous/rendez-vous.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {PersonnelService} from "src/app/services/personnel/personnel.service";
import {PatientService} from "src/app/services/patient/patient.service";
import {
  NouveauPatientComponent
} from "../../../personnes/dialogs/nouveau-patient-form-dialog/nouveau-patient.component";
import {NotifService} from "src/app/services/notification/notif.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {PoleInterface} from "src/app/models/pole.interface";

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
  myServicesList!: ServiceInterface[];

  listOfPole!: PoleInterface[];
  listOfPatient !: PatientInterface[]
  rendezVous !: RendezVousInterface;
  // filtreService !: Service[]
  data: any


  RvForm = this.fb.group({
    medecin: ['', Validators.required],
    // pole: '',
    service: ['', Validators.required],
    dateRv: '',
    patient: ['', Validators.required],
    presence: '',
    duree: '',
    remarques: '',
  })

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private api: RendezVousService,
              private serviceApi: CliniqueServiceService,
              private apiPatient: PatientService,
              private apiPersonnel: PersonnelService,
              private notification: NotifService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.load()
    this.data = this.modal.getConfig().nzData
    //console.log(this.data)

    if(this.data){
      this.titleForm = 'Modifier Rendez-vous'

      this.RvForm.controls.patient.setValue(this.data.patient.id)
      // const formattedDate = this.formatCustomDate(this.data.dateRv);
      // console.log(formattedDate);

      //let dateRv : Date = new Date(this.data.dateRv)
      this.RvForm.controls.dateRv.setValue(this.data.dateRv)

      //this.RvForm.controls.dateRv.setValue(this.data.dateRv)
      this.RvForm.controls.medecin.setValue(this.data.personnel.id)
      this.RvForm.controls.service.setValue(this.data.service.id)
      // this.RvForm.controls.pole.setValue(this.data.service.pole.id)
      if (this.data.duree) this.RvForm.controls.duree.setValue(this.data.duree.toString());
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
    this.isConfirmLoading = true;
    const formData = this.RvForm.value;
    const rv = this.createRdvFromForm(formData);
    console.log(rv);
    if(this.data){
      rv.dateCreation = this.data.dateCreation;
      rv.supprime = this.data.supprime;
      rv.statut = this.data.statut;
      rv.motif = this.data.motif;
      this.updateRdv(rv)
    }else{
      this.api.saveRdv(rv).subscribe({
        next: (response) => {
          this.modal.close();
          // this.apiRdv.getAllRdv();
          console.log('RendezVous enregistrée avec succès ', response);
          this.notification.snackMessage(`Rendez-vous ajouté avec succés`, 3000, 'success')
        },
        error: (error) => {
          console.error(error);
          this.isConfirmLoading = false;
        },
        complete: () => {this.isConfirmLoading = false}
      });
    }
  }

  getDay(dateString : string): Date {
    return new Date(dateString);
  }

  createRdvFromForm(formData: any): RendezVousInterface {
    const choosenPatient: PatientInterface = this.listOfPatient
      .find(p => p.id == formData.patient)!;

    const choosenPersonnel: PersonnelInterface = this.listOfMedecin
      .find(m => m.id == formData.medecin)!;

    return {
      dateRv: formData.dateRv,
      duree: formData.duree,
      patient: choosenPatient,
      remarques: formData.remarques,
      service: {id : formData.service},
      personnel: choosenPersonnel
    };
  }

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.myServicesList.filter(s => s.pole?.id === pole.id);
  }

  private updateRdv(rv: any) {
    rv.id = this.data.id
    this.api.updateRdv(rv).subscribe({
      next: (response) => {
        this.modal.close();
        // this.apiRdv.getAllRdv();
        this.notification.snackMessage(`Rendez-vous mis à jour avec succés`, 3000, 'success')
        console.log('RendezVous mis a jour avec succès ', response);
      },
      error: (error) => {
        console.error(error);
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

  private load() {
    /*
        this.apiPole.getAllPole().subscribe({
          next : res => {
            this.listOfPole = res.reponse
            console.log(this.listOfPole)
          }
        })
    */
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

    this.serviceApi.getAllService().subscribe({
      next: result => {
        this.myServicesList = result.reponse as ServiceInterface[];
        /*this.listOfPole = this.myServicesList.map(s => {
          // return this.listOfPole.some( p => p.id == s.pole?.id) ? s.pole : undefined
          return s.pole!
        });*/
        this.listOfPole = this.myServicesList
          .map(s => s.pole!) // Créez un tableau de tous les pôles
          .filter((pole, index, self) =>
            pole && self.findIndex(p => p.id === pole.id) === index
          ); // Filtrez pour ne garder que les pôles uniques

      },
      error: () => {
        this.modal.close();
      }
    })

  }
}
