import {Component, OnInit} from '@angular/core';
import {listMedecins} from "../../../../models/Utils/medecins";
import {listPoles, Poles} from "../../../../models/Utils/poles";
import {listPrestations, Prestations} from "../../../../models/Utils/prestations";
import {NzModalRef} from "ng-zorro-antd/modal";
import {FormBuilder} from "@angular/forms";
import {listService, Service} from "../../../../models/Utils/constants";
import {PersonnelInterface} from "../../../../models/personnel.interface";
import {PoleService} from "../../../../services/pole/pole.service";
import {CliniqueServiceService} from "../../../../services/service/clinique-service.service";
import {PrestationService} from "../../../../services/prestation/prestation.service";
import {PersonnelService} from "../../../../services/personnel/personnel.service";

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
              private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData
    console.log(this.data)

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

    // this.listOfMedecin = listMedecins;
    // this.listOfPole = listPoles;
    // this.listOfPrestation = listPrestations;
    // this.listOfServices = listService;

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
