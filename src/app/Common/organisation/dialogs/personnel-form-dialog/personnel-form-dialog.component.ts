import {Component, OnInit} from '@angular/core';
import {PersonneInterface} from "src/app/models/personne.interface";
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {TitreInterface} from "src/app/models/titre.interface";
import {ProfilInterface, SUPERADMINISTRATEUR} from "src/app/models/profil.interface";
import {AccesInterface} from "src/app/models/acces.interface";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "src/app/services/utils/utils.service";
import {NotifService} from "src/app/services/notification/notif.service";
import {PersonnelService} from "src/app/services/personnel/personnel.service";
import {PoleInterface} from "src/app/models/pole.interface";
import {TitreFormDialogComponent} from "../titre-form-dialog/titre-form-dialog.component";
import {ProfilFormDialogComponent} from "../../../securite/dialogs/profil-form-dialog/profil-form-dialog.component";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {AuthInterface} from "src/app/models/auth.interface";
import {StorageService} from "src/app/services/Storage/storage.service";

@Component({
  selector: 'app-personnel-form-dialog',
  templateUrl: './personnel-form-dialog.component.html',
  styleUrls: ['./personnel-form-dialog.component.sass']
})
export class PersonnelFormDialogComponent implements OnInit {

  isConfirmLoading = false;
  titleForm: string = "Nouveau Personnel";
  formDesc = "Veuillez renseigner ce formulaire pour ajouter un personnel";
  btnText = "Enregistrer";

  listOfTitre!: TitreInterface[];
  listOfProfil!: ProfilInterface[];
  listOfPole!: PoleInterface[];

  acces!: AccesInterface
  personne!: PersonneInterface;
  personnelToUpdate!: PersonnelInterface;
  data: any;

  personnelForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    profil: ['', Validators.required],
    genre: ['', Validators.required],
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    // telephone: ['', [Validators.required, Validators.pattern('^(\\+|00)?(221)?7[0-9]{8}$')]],
    telephone: ['', [Validators.required, Validators.pattern(/^(?:([+0])221\s)?(7[0-9])\s(\d{3})\s(\d{2})\s(\d{2})$/)]],
    datenaissance: ['', Validators.required],
    pole: ['', Validators.required],
    titre: [''],
    adresse: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    // contactEnCasUrgent: ['', [Validators.required, Validators.pattern('^(\\+|00)?(221)?7[0-9]{8}$')]],
    // contactEnCasUrgent: ['', [Validators.required, Validators.pattern(/^(?:([+0])221\s)?(7[0-9])\s(\d{3})\s(\d{2})\s(\d{2})$/)]],

  });
  today = new Date();

  currentUser?: AuthInterface;

  isSuperAdmin: boolean = false;

  constructor(private fb: FormBuilder,
              private modal: NzModalRef,
              private storage: StorageService,
              private modalService: NzModalService,
              private utils: UtilsService,
              private api: PersonnelService,
              private notify: NotifService,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    const storedUser = this.storage.getItem('TOUCHMED_currentUser');

    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;

    console.dir('USER CONNECTED ' + this.currentUser);
    this.isSuperAdmin = this.currentUser?.personne.acces?.profil.code === SUPERADMINISTRATEUR;
    this.subscribeToPhoneNumberChanges('telephone');

    this.loadDatas();

    this.data = this.modal.getConfig().nzData
    //console.log(this.data)
    if (this.data) {
      if (this.data.context === 'PUT_PERSONNEL') {
        this.titleForm = 'Modifier Personnel - ' + this.data.id
        this.formDesc = this.formDesc.replace('ajouter un', 'modifier le');
        this.personnelToUpdate = this.data;
        this.fillTheForm();
      }
    }
  }

  disabledDate = (current: Date): boolean => {
    // Renvoie true si la date actuelle est postérieure à aujourd'hui
    return current.getTime() > this.today.getTime();
  };

  handleOK() {
    this.isConfirmLoading = true;

    let personnel = this.createPersonnelForm(this.personnelForm.value);
    if (this.personnelToUpdate) {
      personnel.id = this.personnelToUpdate.id;
      personnel.dateCreation = this.personnelToUpdate.dateCreation;
      personnel.supprime = this.personnelToUpdate.supprime;

      personnel.personne.id = this.personnelToUpdate.personne.id;
      personnel.personne.dateCreation = this.personnelToUpdate.personne.dateCreation;
      personnel.personne.supprime = this.personnelToUpdate.personne.supprime;
      if (this.personnelToUpdate.personne.acces) {
        this.personnelToUpdate.personne.acces.login = personnel.personne.acces?.login!;
        this.personnelToUpdate.personne.acces.profil = personnel.personne.acces?.profil!;
        personnel.personne.acces = this.personnelToUpdate.personne.acces;
      }
      this.update(personnel);
      return;
    }

    this.api.save(personnel).subscribe({
      next: res => {
        const perso = res.reponse as PersonnelInterface
        this.notify.snackMessage(`Le personnel ${perso.personne.prenom} ${perso.personne.nom} a été ajouté`,
          3000, "success");
        this.modal.close(res.reponse);
      },
      error: (error) => {
        console.error(error);
        this.isConfirmLoading = false;
        if (error.status == 401)
          this.modal.close();
      },
      complete: () => this.isConfirmLoading = false,
    })

  }

  createAccessFromForm(formData: any): AccesInterface {
    const choosenProfil = this.listOfProfil.find(p => p.id === formData.profil);

    return {
      login: formData.login,
      profil: choosenProfil!,
      hasAlreadyConnected: false,

    }
  }

  createPersonneForm(formData: any): PersonneInterface {
    return {
      adresse: formData.adresse,
      genre: formData.genre,
      nom: formData.nom,
      prenom: formData.prenom,
      age: this.utils.getAge(formData.datenaissance).toString(),
      telephone: formData.telephone.replace(/\s+/g, ''),
      email: formData.email,
      datenaissance: formData.datenaissance,
      hasAlreadyConnected: false,
      acces: this.createAccessFromForm(formData)
    };
  }

  createPersonnelForm(formData: any): PersonnelInterface {
    const choosenPole = this.listOfPole.find(p => p.id === formData.pole)!;
    const choosenTitre = this.listOfTitre.find(t => t.code === formData.titre);

    return {
      personne: this.createPersonneForm(formData),
      pole: choosenPole,
      titre: choosenTitre
    }
  }

  loadDatas() {

    this.loadTitres();
    this.loadProfils();

    this.api.listAllPoles().subscribe(
      res => this.listOfPole = res.reponse as PoleInterface[],
    )

  }

  loadTitres() {
    this.api.listAllTitres().subscribe(
      res => this.listOfTitre = res.reponse as TitreInterface [],
    );
  }

  loadProfils() {
    this.api.listAllPresentProfils().subscribe(
      res => {
        this.listOfProfil = <ProfilInterface[]>res.reponse;
        if (!this.isSuperAdmin)
          this.listOfProfil = this.listOfProfil.filter(p => p.code !== SUPERADMINISTRATEUR);
      },
    );
  }

  handleCancel(result?: any) {
    this.modal.close(result);
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return 'veuillez renseignez un format d\'email correct';
    } else if (ctrl.hasError('pattern')) {
      return 'Ce format de numéro de téléphone n\'est pas pris en compte';
    } else if (ctrl.hasError('minlength')) {
      return 'Champ doit contenir au minimum ' + ctrl.errors!['minlength']['requiredLength'] + ' caracteres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Champ doit contenir au maximum ' + ctrl.errors!['maxlength']['requiredLength'] + ' caracteres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  subscribeToPhoneNumberChanges(controlName: string): void {
    this.personnelForm.get(controlName)!.valueChanges.subscribe((value: string) => {
      const formattedNumber = this.utils.formatPhoneNumber(value);

      if (value !== formattedNumber) {
        this.personnelForm.get(controlName)!.patchValue(formattedNumber, {emitEvent: false});
      }
    });
  }

  addNewTitre(): void {
    this.modalService.create({
      nzContent: TitreFormDialogComponent,
      nzWidth: 700,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result && result.code) {
          this.loadTitres();
          this.personnelForm.controls['titre'].setValue(result.code);
        }
      }
    );
  }

  addNewProfil(): void {
    this.modalService.create({
      nzContent: ProfilFormDialogComponent,
      nzWidth: 700,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result && result.code) {
          console.log('Voir result ', result);
          this.loadProfils();
          this.personnelForm.controls['profil'].setValue(result.id);
        }
      }
    );
  }

  private fillTheForm() {
    this.personnelForm.controls['genre'].setValue(this.personnelToUpdate?.personne?.genre);
    this.personnelForm.controls['prenom'].setValue(this.personnelToUpdate?.personne?.prenom);
    this.personnelForm.controls['nom'].setValue(this.personnelToUpdate?.personne?.nom);
    this.personnelForm.controls['telephone'].setValue(this.personnelToUpdate?.personne?.telephone!);
    this.personnelForm.controls['email'].setValue(this.personnelToUpdate?.personne?.email!);
    this.personnelForm.controls['adresse'].setValue(this.personnelToUpdate?.personne?.adresse);
    this.personnelForm.controls['datenaissance'].setValue(this.personnelToUpdate?.personne?.datenaissance!);
    this.personnelForm.controls['login'].setValue(this.personnelToUpdate.personne.acces?.login!);
    this.personnelForm.controls['profil'].setValue(this.personnelToUpdate.personne.acces?.profil?.id!);
    if (this.personnelToUpdate.titre) this.personnelForm.controls['titre'].setValue(this.personnelToUpdate.titre?.code);
    this.personnelForm.controls['pole'].setValue(this.personnelToUpdate.pole?.id);
  }

  private update(personnel: PersonnelInterface) {
    this.api.update(personnel).subscribe({
      next: () => {
        this.notify.snackMessage(`Modification effectuée avec succés `, 3000, "success");
        this.modal.close('update-success');
      },
      error: (error) => {
        console.error(error);
        this.isConfirmLoading = false;
        if (error.status == 401)
          this.modal.close();
      },
      complete: () => this.isConfirmLoading = false,
    })
  }
  hasAction(codeAction: string): boolean {
    if (this.profilService.isSuperAdmin()) return true;
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
