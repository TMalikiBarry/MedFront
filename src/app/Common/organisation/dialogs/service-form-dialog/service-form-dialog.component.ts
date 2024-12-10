import {Component, OnInit} from '@angular/core';
import {PoleInterface} from "src/app/models/pole.interface";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {PoleFormDialogComponent} from "../pole-form-dialog/pole-form-dialog.component";
import {ProfilService} from "src/app/services/Profil/profil.service";

export function MultipleOfValidator(value: number) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isMultiple = control.value % value === 0;
    return !isMultiple ? {'notMultiple': {value: control.value, divider: value}} : null;
  };
}

@Component({
  selector: 'app-service-form-dialog',
  templateUrl: './service-form-dialog.component.html',
  styleUrls: ['./service-form-dialog.component.sass']
})
export class ServiceFormDialogComponent implements OnInit {


  titleForm = "Nouveau Service";
  formDesc = "Veuillez renseigner ce formulaire pour ajouter un service";
  btnText = "Enregistrer";
  isConfirmLoading = false;
  listOfPole!: PoleInterface[];

  data: any;
  updatedService!: ServiceInterface;
  serviceForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    pole: ['', Validators.required],
    cout: ['', [Validators.required, Validators.min(50), MultipleOfValidator(50)]],
    description: '',
    equipement: '',
    prerequis: '',
  })

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private api: CliniqueServiceService,
              private notification: NotifService,
              private fb: FormBuilder,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.loadPoles();
    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_SERVICE') {
        this.titleForm = 'Modifier Service - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier le');
        this.updatedService = this.data;
        this.fillTheForm();

      }
    }
  }

  loadPoles(): void {
    this.api.getAllPoles().subscribe(
      res => {
        this.listOfPole = res.reponse as PoleInterface[];
      }
    )
  }

  handleCancel(message?: any) {
    this.modal.close(message);
  }

  handleOK() {
    this.isConfirmLoading = true;
    const formData = this.serviceForm.value;
    const service = this.createFromForm(formData);
    if (this.updatedService) {
      service.dateCreation = this.updatedService.dateCreation;
      service.id = this.updatedService.id;
      service.supprime = this.updatedService.supprime;
      if (this.updatedService.couleur) service.couleur = this.updatedService.couleur;

      this.update(service);
    } else {
      this.api.save(service).subscribe(
        {
          next: value => {
            this.modal.close(value.reponse as ServiceInterface);
            this.notification.snackMessage(`Le service ${service.nom} a été créé avec succès`
              , 3000, 'success');
          },
          error: (error) => {
            console.error(error);
            this.isConfirmLoading = false;
          },
          complete: () => {
            this.isConfirmLoading = false
          }
        }
      )
    }
  }

  createFromForm(formData: any): ServiceInterface {
    const choosenPole: PoleInterface = this.listOfPole
      .find(p => p.id === formData.pole)!;

    return {
      description: formData.description,
      equipement: formData.equipement,
      cout: formData.cout,
      nom: formData.nom,
      prerequis: formData.prerequis,
      pole: choosenPole,
    }

  }

  addNew(): void {
    this.modalService.create({
      nzContent: PoleFormDialogComponent,
      nzWidth: 700,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result && result.code) this.serviceForm.controls['pole'].setValue(result.id);
        // this.getGraphData(this.isLastWeek);
      }
    );
  }

  private fillTheForm() {
    this.serviceForm.controls['pole'].setValue(this.updatedService!.pole!.id);
    this.serviceForm.controls['nom'].setValue(this.updatedService!.nom);
    this.serviceForm.controls['cout'].setValue(this.updatedService!.cout);
    if (this.updatedService!.description) this.serviceForm.controls['description'].setValue(this.updatedService!.description);
    if (this.updatedService!.equipement) this.serviceForm.controls['equipement'].setValue(this.updatedService!.equipement);
    if (this.updatedService!.prerequis) this.serviceForm.controls['prerequis'].setValue(this.updatedService!.prerequis);

  }

  private update(service: ServiceInterface) {
    this.api.update(service).subscribe({
      next: () => {
        this.modal.close();
        // this.apiRdv.getAllRdv();
        this.notification.snackMessage(`Service mis à jour avec succés`, 3000, 'success')
      },
      error: (error) => {
        console.error(error);
        this.isConfirmLoading = false;
      },
      complete: () => {
        this.isConfirmLoading = false
      }
    })
  }

  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }

}
