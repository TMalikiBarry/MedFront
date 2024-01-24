import {Component} from '@angular/core';
import {listService, Service} from "../../../../models/Utils/constants";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {Poles} from "../../../../models/Utils/poles";
import {PersonnelInterface} from "../../../../models/personnel.interface";
import {PatientInterface} from "../../../../models/patient.interface";
import {RendezVousInterface} from "../../../../models/rendez-vous.interface";
import {RendezVousService} from "../../../../services/rendez-vous/rendez-vous.service";
import {PoleService} from "../../../../services/pole/pole.service";
import {CliniqueServiceService} from "../../../../services/service/clinique-service.service";
import {PersonnelService} from "../../../../services/personnel/personnel.service";
import {PatientService} from "../../../../services/patient/patient.service";

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
  data: any

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

  constructor(private modal: NzModalRef,
              private api: RendezVousService,
              private apiPole: PoleService,
              private apiService: CliniqueServiceService,
              private apiPatient: PatientService,
              private apiRdv: RendezVousService,
              private apiPersonnel: PersonnelService,
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
      this.RvForm.controls.presence.setValue("Confirmee")

    }
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    const formData = this.RvForm.value;
    const rv = this.createRdvFromForm(formData);
    console.log(rv)
    if(this.data){
      this.updateRdv(rv)
    }else{
      this.api.saveRdv(rv).subscribe({
        next: (response) => {
          this.modal.close();
          this.apiRdv.getAllRdv();
          console.log('RendezVous enregistrée avec succès ', response);
        },
        error: (error) => console.error('Erreur lors de l\'enregistrement', error),
        complete: () => {this.isConfirmLoading = false}
      });
    }
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
        console.log('RendezVous mis a jour avec succès ', response);
      },
      error: (error) => console.error('Erreur lors de la mise a jour', error),
      complete: () => {this.isConfirmLoading = false}
    });
  }

  private formatCustomDate(inputDate: string): string {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Les mois commencent à 0, donc ajoutez 1
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
}
