import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {ProfilInterface} from "src/app/models/profil.interface";
import {ProfilService} from "src/app/services/Profil/profil.service";

@Component({
  selector: 'app-profil-form-dialog',
  templateUrl: './profil-form-dialog.component.html',
  styleUrls: ['./profil-form-dialog.component.sass']
})
export class ProfilFormDialogComponent implements OnInit {

  titleForm = "Nouveau Profil";
  formDesc = "Veuillez renseigner ce formulaire pour ajouter un profil";
  btnText = "Enregistrer";
  isConfirmLoading = false;

  data: any;
  updatedProfil!: ProfilInterface;
  profilForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    libelle: ['', Validators.required],
    welcomeBookmark: '',

  })

  constructor(private modal: NzModalRef,
              private api: ProfilService,
              private notification: NotifService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_PROFIL') {
        this.titleForm = 'Modifier Profil - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier le');
        this.updatedProfil = this.data;
        this.fillTheForm();

      }
    }
  }

  handleCancel(message?: any) {
    this.modal.close(message);
  }

  handleOK() {
    this.isConfirmLoading = true;
    const formData = this.profilForm.value;
    const profil = this.createFromForm(formData);
    if (this.updatedProfil) {
      profil.dateCreation = this.updatedProfil.dateCreation;
      profil.id = this.updatedProfil.id;
      profil.supprime = this.updatedProfil.supprime;
      this.update(profil);
    } else {
      this.api.save(profil).subscribe(
        {
          next: value => {
            console.log('PROFIL AJOUTE ', value)
            this.modal.close(value.reponse as ProfilInterface);
            this.notification.snackMessage(`Le profil ${profil.code}, a été créé avec succès`
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

  createFromForm(formData: any): ProfilInterface {

    const code = formData.code.trim().replace(/\s/g, '_').toUpperCase();

    return {
      code,
      libelle: formData.libelle.trim(),
      welcomeBookmark: formData.welcomeBookmark,
    }

  }

  private fillTheForm() {

    this.profilForm.controls['code'].setValue(this.updatedProfil!.code);

    if (this.updatedProfil?.libelle) this.profilForm.controls['libelle'].setValue(this.updatedProfil?.libelle);
    if (this.updatedProfil.welcomeBookmark) this.profilForm.controls['welcomeBookmark'].setValue(this.updatedProfil?.welcomeBookmark);
  }

  private update(profil: ProfilInterface) {
    this.api.update(profil, this.updatedProfil.id!).subscribe({
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
