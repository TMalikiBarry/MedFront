import {Component} from '@angular/core';
import {AccesInterface} from "src/app/models/acces.interface";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccesService} from "src/app/services/acces/acces.service";
import {ProfilInterface, SUPERADMINISTRATEUR} from "src/app/models/profil.interface";
import {ProfilFormDialogComponent} from "../profil-form-dialog/profil-form-dialog.component";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {AuthInterface} from "src/app/models/auth.interface";
import {StorageService} from "src/app/services/Storage/storage.service";

@Component({
  selector: 'app-acces-form-dialog',
  templateUrl: './acces-form-dialog.component.html',
  styleUrls: ['./acces-form-dialog.component.sass']
})
export class AccesFormDialogComponent {

  titleForm = "Nouvel Accès";
  formDesc = "Veuillez renseigner ce formulaire pour ajouter un accès";
  btnText = "Enregistrer";
  isConfirmLoading = false;

  data: any;
  updatedAcces!: AccesInterface;
  listOfProfil!: ProfilInterface[];

  accesForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    profil: ['', Validators.required],
  })

  currentUser?: AuthInterface;

  isSuperAdmin: boolean = false;

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private api: AccesService,
              private storage: StorageService,
              private notification: NotifService,
              private fb: FormBuilder,
              private profilService: ProfilService) {
  }

  ngOnInit() {

    const storedUser = this.storage.getItem('TOUCHMED_currentUser');

    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;
    this.isSuperAdmin = this.currentUser?.personne.acces?.profil.code === SUPERADMINISTRATEUR;

    this.loadAllProfil();

    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_ACCES') {
        this.titleForm = 'Modifier Accès - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier l\'');
        this.updatedAcces = this.data;
        this.fillTheForm();

      }
    }
  }

  handleOK() {
    this.isConfirmLoading = true;
    const formData = this.accesForm.value;
    const acces = this.createFromForm(formData);

    this.update(acces);
  }

  update(acces: AccesInterface) {
    this.api.update(acces, acces.id!).subscribe({
      next: () => {
        this.handleCancel();
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

  handleCancel(message?: any): void {
    this.modal.close(message);
  }

  loadAllProfil() {
    this.api.getAllProfil().subscribe(
      response => {
        this.listOfProfil = response.reponse as ProfilInterface[];
        if (!this.isSuperAdmin)
          this.listOfProfil = this.listOfProfil.filter(p => p.code !== SUPERADMINISTRATEUR);
      }
    )
  }

  createFromForm(formData: any): AccesInterface {

    const choosenProfil = this.listOfProfil.find(p => p.id === formData.profil)!;

    return {
      ...this.updatedAcces,
      login: formData.login,
      profil: choosenProfil
    }
  }

  addNew(): void {
    this.modalService.create({
      nzContent: ProfilFormDialogComponent,
      nzWidth: 650,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result && result.code) {
          console.log('Voir result ', result);
          this.loadAllProfil();
          this.accesForm.controls['profil'].setValue(result.id);
        }
      }
    )
  }

  private fillTheForm() {

    this.accesForm.controls['login'].setValue(this.updatedAcces.login);
    this.accesForm.controls['profil'].setValue(this.updatedAcces.profil.id);
  }
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
