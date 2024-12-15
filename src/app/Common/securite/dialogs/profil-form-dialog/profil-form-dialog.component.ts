import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {ProfilInterface} from "src/app/models/profil.interface";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {ActionInterface, httpVerbMapping} from "src/app/models/action.interface";
import {ActionFormDialogComponent} from "../action-form-dialog/action-form-dialog.component";

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
  isSuperAdministrateur = false;
  isAdministrateur = false;
  codeAlreadyExists = false;
  isEditMode: boolean = false;
  profilForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    libelle: ['', Validators.required],
    welcomeBookmark: '',
    actions: ['']

  })
  actions!: ActionInterface[];
  listActions: ActionInterface[] = [];

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private api: ProfilService,
              private notification: NotifService,
              private fb: FormBuilder,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.initData();
    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_PROFIL') {
        this.isEditMode= true;
        this.titleForm = 'Modifier Profil - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier le');
        this.updatedProfil = this.data;
        this.listActions = this.updatedProfil.actions ?? [];
        this.fillTheForm();

      }
    }
  }

  filterActionList() {
    if (this.listActions && this.listActions.length > 0) {
      this.actions = this.actions.filter(a => this.listActions
        .every(action => action.code !== a.code));
    }
    /*if (this.updatedProfil && this.updatedProfil.code === 'ADMINISTRATEUR') {
      this.actions = this.actions.filter(a => a.fonctionnalite.module.code !== 'SECURITE');
    }*/
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
            if (error.status == 400) {
              this.codeAlreadyExists = true;
              return;
            }
          },
          complete: () => {
            this.isConfirmLoading = false
          }
        }
      )
    }
  }

  addAction() {
    const addedAction = this.actions.find(x => x.code === this.profilForm.controls['actions'].value);
    if (addedAction && this.listActions.every(a => a.code !== addedAction.code)) {
      // this.listActions.push(addedAction);
      this.listActions = [...this.listActions, addedAction];
      this.actions = this.actions.filter(a => a.code !== addedAction.code);
      this.profilForm.controls['actions'].setValue(null);
    } else if (addedAction && this.listActions.some(a => a.code === addedAction.code)) {
      this.notification.snackMessage('Cette action a déjà été ajoutée', 3500, 'warning');
    } else {
      this.notification.snackMessage('L\'action choisie pas valide', 3500, 'warning');
      this.profilForm.controls['actions'].setValue(null);
    }
  }

  createFromForm(formData: any): ProfilInterface {

    const code = formData.code.trim().replace(/\s/g, '_').toUpperCase();

    return {
      code,
      libelle: formData.libelle.trim(),
      welcomeBookmark: formData.welcomeBookmark,
      actions: this.listActions
    }

  }

  private fillTheForm() {

    this.profilForm.controls['code'].setValue(this.updatedProfil!.code);

    if (this.updatedProfil?.libelle) this.profilForm.controls['libelle'].setValue(this.updatedProfil?.libelle);
    if (this.updatedProfil.welcomeBookmark) this.profilForm.controls['welcomeBookmark'].setValue(this.updatedProfil?.welcomeBookmark);
  }

  addNew(): void {
    this.modalService.create({
      nzContent: ActionFormDialogComponent,
      nzWidth: 700,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result) {
          console.log(result);
          console.log("SUCCES CREATED action")
          this.initData();
          this.profilForm.controls['actions'].setValue(result.code);
        }
        // this.getGraphData(this.isLastWeek);
      }
    );
  }

  deleteAction(action: ActionInterface) {

    this.listActions = this.listActions.filter(a => a.code !== action.code);
  }

  getHttpVerbLabel(httpVerb: string): string {
    return httpVerbMapping[httpVerb.toUpperCase()] || httpVerb;
  }

  getListActionLabel(action: ActionInterface): string {
    return action.description || this.getHttpVerbLabel(action.httpVerb) + ' - ' + action.fonctionnalite.code;
  }

  private initData() {
    if (this.updatedProfil) {
      this.isSuperAdministrateur = this.updatedProfil.code === 'SUPERADMINISTRATEUR';
      this.isAdministrateur = this.updatedProfil.code === 'ADMINISTRATEUR';
    }

    this.api.getAllActions().subscribe(
      data => {
        this.actions = data;
        this.filterActionList();
      }
    )
  }

  private update(profil: ProfilInterface) {
    this.api.update(profil, this.updatedProfil.id!).subscribe({
      next: () => {
        this.modal.close();
        // this.apiRdv.getAllRdv();
        this.notification.snackMessage(`Profil mis à jour avec succés`, 3000, 'success')
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
    if (this.profilService.isSuperAdmin()) return true;
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
