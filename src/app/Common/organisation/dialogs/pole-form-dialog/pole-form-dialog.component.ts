import {Component, OnInit} from '@angular/core';
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PoleService} from "src/app/services/pole/pole.service";
import {PoleInterface} from "src/app/models/pole.interface";

@Component({
  selector: 'app-pole-form-dialog',
  templateUrl: './pole-form-dialog.component.html',
  styleUrls: ['./pole-form-dialog.component.sass']
})
export class PoleFormDialogComponent implements OnInit {

  titleForm = "Nouveau Pôle";
  formDesc = "Veuillez renseigner ce formulaire pour ajouter un pôle";
  btnText = "Enregistrer";
  isConfirmLoading = false;
  listOfPersonnel!: PersonnelInterface[];

  data: any;
  updatedPole!: PoleInterface;
  poleForm: FormGroup = this.fb.group({
    superviseur: ['', Validators.required],
    // pole: '',
    code: ['', Validators.required],
    nom: ['', Validators.required],
    description: '',
    equipement: '',
    localisation: '',
    horaire: '',
  })

  constructor(private modal: NzModalRef,
              private api: PoleService,
              private notification: NotifService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadPersonnels();
    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_POLE') {
        this.titleForm = 'Modifier Pole - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier le');
        this.updatedPole = this.data;
        this.fillTheForm();

      }
    }
  }

  loadPersonnels(): void {
    this.api.getAllPresentPersonnel().subscribe(
      res => {
        this.listOfPersonnel = res.reponse as PersonnelInterface[];
      }
    )
  }

  handleCancel(message?: any) {
    this.modal.close(message);
  }

  handleOK() {
    this.isConfirmLoading = true;
    const formData = this.poleForm.value;
    const pole = this.createFromForm(formData);
    if (this.updatedPole) {
      pole.dateCreation = this.updatedPole.dateCreation;
      pole.id = this.updatedPole.id;
      pole.supprime = this.updatedPole.supprime;
      this.update(pole);
    } else {
      this.api.save(pole).subscribe(
        {
          next: value => {
            this.modal.close(value.reponse as PoleInterface);
            this.notification.snackMessage(`Le pole ${pole.nom}, ${pole.code}, a été créé avec succès`
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

  createFromForm(formData: any): PoleInterface {
    const choosenSuperviseur: PersonnelInterface = this.listOfPersonnel
      .find(p => p.id === formData.superviseur)!;

    return {
      code: formData.code,
      description: formData.description,
      equipement: formData.equipement,
      horaire: formData.horaire,
      localisation: formData.localisation,
      nom: formData.nom,
      superviseur: choosenSuperviseur,
    }

  }

  getFullName(p: PersonnelInterface): string | undefined {
    if (!p || !p.personne) return undefined;
    return `${p.personne.prenom} ${p.personne.nom} - ${p.personne.telephone}`;
  }

  private fillTheForm() {
    const supID = this.updatedPole?.superviseur?.id ?? 1;
    this.poleForm.controls['superviseur'].setValue(supID);
    this.poleForm.controls['nom'].setValue(this.updatedPole!.nom);
    this.poleForm.controls['code'].setValue(this.updatedPole!.code);

    if (this.updatedPole?.description) this.poleForm.controls['description'].setValue(this.updatedPole?.description);
    if (this.updatedPole?.equipement) this.poleForm.controls['equipement'].setValue(this.updatedPole?.equipement);
    if (this.updatedPole?.localisation) this.poleForm.controls['localisation'].setValue(this.updatedPole?.localisation);
    if (this.updatedPole?.horaire) this.poleForm.controls['horaire'].setValue(this.updatedPole?.horaire);

  }

  private update(pole: PoleInterface) {
    this.api.update(pole).subscribe({
      next: () => {
        this.modal.close();
        // this.apiRdv.getAllRdv();
        this.notification.snackMessage(`Pôle mis à jour avec succés`, 3000, 'success')
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

}
