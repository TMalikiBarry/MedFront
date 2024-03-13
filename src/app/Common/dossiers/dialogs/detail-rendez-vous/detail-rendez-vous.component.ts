import {Component, OnInit} from '@angular/core';
import {Poles} from "src/app/models/Utils/poles";
import {Prestations} from "src/app/models/Utils/prestations";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {Service} from "src/app/models/Utils/constants";
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {PoleService} from "src/app/services/pole/pole.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {PersonnelService} from "src/app/services/personnel/personnel.service";
import {RendezVousService} from "src/app/services/rendez-vous/rendez-vous.service";

@Component({
  selector: 'app-detail-rendez-vous',
  templateUrl: './detail-rendez-vous.component.html',
  styleUrls: ['./detail-rendez-vous.component.sass']
})
export class DetailRendezVousComponent implements OnInit{
  titleForm = "Detail du Rendez-vous";
  formDesc = "les modifications de ce rendez-vous seront enregistrees";
  btnText = "Enregistrer";
  date !: string
  isConfirmLoading = false;
  listOfMedecin!: PersonnelInterface[];
  listOfPole!: Poles[];
  listOfServices !: Service[];
  listOfPrestation!: Prestations[];
  data : any

  RvForm = this.fb.group({
    patient : '',
    number : '',
    service : '',
    medecin: '',
    date: '',
    presence : '',
    note : '',
    resultat:''
  })

  constructor(private modal: NzModalRef,
              private apiPole : PoleService,
              private apiService : CliniqueServiceService,
              private apiPrestation : PrestationService,
              private apiPersonnel : PersonnelService,
              private api : RendezVousService,
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData
    console.log(this.data)

    this.load();

    this.apiPersonnel.getAllPersonnel().subscribe({
      next : res => {
        this.listOfMedecin = res.reponse
        let selectedMedecin = this.listOfMedecin.find(medecin => medecin.id === this.data.personnel.id);
        // @ts-ignore
        this.RvForm.controls.medecin.setValue(selectedMedecin);
      }
    })

    this.apiService.getAllService().subscribe({
      next : res => {
        this.listOfServices = res.reponse
        let selectedService = this.listOfServices.find(service => service.id === this.data.service.id);
        // @ts-ignore
        this.RvForm.controls.service.setValue(selectedService);
      }
    })

    let dateRv : Date = new Date(this.data.dateRv)
    this.RvForm.controls.date.setValue(dateRv.toISOString())

    this.RvForm.controls.patient.setValue(this.data.patient.personne.prenom+" "+this.data.patient.personne.nom)
    this.RvForm.controls.date.setValue(this.data.dateRv)
    this.RvForm.controls.number.setValue(this.data.patient.personne.telephone)
    this.RvForm.controls.note.setValue(this.data.remarques)
    this.RvForm.controls.presence.setValue("Confirmee")
  }


  handleCancel() {
    this.modal.close();
  }

  handleOk() {
    const formData = this.RvForm.value;
    const rv = this.createRdvFromForm(formData);
    console.log(rv)
    this.api.updateRdv(rv).subscribe({
      next: (response) => {
        this.modal.close();
        console.log('RendezVous mis a jour avec succès ', response);
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement ', error);
        this.isConfirmLoading = false;
      },
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

  createRdvFromForm(formData: any): {
    id : number
    dateRv: any;
    remarques: string;
    patient: { id: any };
    rappels: string;
    service: { id: any };
    duree: number;
    personnel: { id: any };
  } {
    return {
      id : this.data.id,
      dateRv: formData.dateRv,
      duree: 30,
      patient: {id : formData.patient},
      rappels: "",
      remarques: "",
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

    this.apiPrestation.getAll().subscribe({
      next : res => {
        this.listOfPrestation = res.reponse
      }
    })
  }
}
