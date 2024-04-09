import {Component, OnInit} from '@angular/core';
import {TitreInterface} from "src/app/models/titre.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {TitreService} from "src/app/services/Titre/titre.service";

@Component({
  selector: 'app-titre-form-dialog',
  templateUrl: './titre-form-dialog.component.html',
  styleUrls: ['./titre-form-dialog.component.sass']
})
export class TitreFormDialogComponent implements OnInit {

  titleForm = "Nouveau Titre";
  formDesc = "Veuillez renseigner ce formulaire pour ajouter un Titre";
  btnText = "Enregistrer";
  isConfirmLoading = false;

  data: any;
  updatedTitre!: TitreInterface;
  titreForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    libelle: ['', Validators.required],

  })

  constructor(private modal: NzModalRef,
              private api: TitreService,
              private notification: NotifService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_TITRE') {
        this.titleForm = 'Modifier Titre - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier le');
        this.updatedTitre = this.data;
        this.fillTheForm();

      }
    }
  }

  handleCancel(message?: any) {
    this.modal.close(message);
  }

  handleOK() {
    this.isConfirmLoading = true;
    const formData = this.titreForm.value;
    const titre = this.createFromForm(formData);
    if (this.updatedTitre) {
      titre.dateCreation = this.updatedTitre.dateCreation;
      titre.supprime = this.updatedTitre.supprime;
      this.update(titre);
    } else {
      this.api.save(titre).subscribe(
        {
          next: value => {
            this.modal.close(value.reponse as TitreInterface);
            this.notification.snackMessage(`Le Titre ${titre.code}, a été créé avec succès`
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

  createFromForm(formData: any): TitreInterface {

    const code = formData.code.trim().replace(/\s/g, '_');

    return {
      code,
      libelle: formData.libelle.trim(),
    }

  }

  private fillTheForm() {

    this.titreForm.controls['code'].setValue(this.updatedTitre!.code);

    if (this.updatedTitre?.libelle) this.titreForm.controls['libelle'].setValue(this.updatedTitre?.libelle);
  }

  private update(titre: TitreInterface) {
    this.api.update(titre).subscribe({
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
