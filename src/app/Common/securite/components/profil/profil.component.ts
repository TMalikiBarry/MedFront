import {Component, OnInit} from '@angular/core';
import {Page} from "src/app/models/pagination.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {ProfilInterface, SUPERADMINISTRATEUR} from "src/app/models/profil.interface";
import {ProfilFormDialogComponent} from "../../dialogs/profil-form-dialog/profil-form-dialog.component";
import {AuthInterface} from "src/app/models/auth.interface";
import {StorageService} from "src/app/services/Storage/storage.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent implements OnInit{


  profils!: ProfilInterface[];
  pageIndex: number = 0;
  pageSize: number = 10;

  serviceId!: number;

  paginatedData!: Page<ProfilInterface>;

  currentUser?: AuthInterface;

  isSuperAdmin: boolean = false;

  constructor(private profilService: ProfilService,
              private modalService: NzModalService,
              private storage: StorageService,
              private notify: NotifService
  ) {}

  ngOnInit() {
    const storedUser = this.storage.getItem('TOUCHMED_currentUser');

    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;

    console.dir('USER CONNECTED ' + this.currentUser);
    this.isSuperAdmin = this.currentUser?.personne.acces?.profil.code === SUPERADMINISTRATEUR;
    this.loadProfil();
    this.getProfilByPage();

  }

  getProfilByPage(page: number = 0, size: number = 10, firstName?: string, lastName?: string, telephone?: string,
                          startDate?: Date, endDate?: Date, status?: string, genre?: string) {

    this.profilService.getPaginatedFilteredData(page, size, firstName, lastName,
      telephone, startDate, endDate, status, genre)
      .subscribe({
        next: response => {
          console.log(response)
          this.paginatedData = response;

        }
      })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex - 1;
    this.pageSize = params.pageSize;

    this.filterData();
  }

  filterData() {
    let startDate = undefined;
    let endDate = undefined;

    let prenom = null;
    let nom = null;
    let telephone = null;


    console.log('RECUPERER LES DONNEES');
    this.getProfilByPage(this.pageIndex, this.pageSize, prenom!, nom!,
      telephone!, startDate, endDate);
    console.log('BIEN RECU LES DONNEES');

  }

  loadProfil() {
    this.profilService.getAll().subscribe({
        next: profils => {
          this.profils = profils;
          console.log('Recuperation des profils', profils);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des profils', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }

  addNewProfil() {
    this.modalService.create({
      nzContent: ProfilFormDialogComponent,
      nzClosable: false,
      nzWidth: 750,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result)
          this.filterData();
      }
    );
  }

  updateProfil(profil: ProfilInterface) {
    this.modalService.create({
      nzContent: ProfilFormDialogComponent,
      nzClosable: false,
      nzWidth: 750,
      nzCentered: true,
      nzData: {
        ...profil,
        context: 'PUT_PROFIL'
      }
    }).afterClose.subscribe(
      (result) => {
        if (result)
          this.filterData();
      }
    );
  }


  delete(code: string) {
    this.modalService.confirm({
      nzTitle: `Supprimer le profil - <strong>${code}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir supprimer le profil ${code} ?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.profilService.delete(code).subscribe({
          next: () => {
            this.notify.snackMessage(`Profil ${code} supprimé avec succès!`, 3000, "success");
          }
        })
      },
      nzOnCancel: () => {
        console.log('Suppression annulée');
      }
    }).afterClose.subscribe(
      () => {
          this.filterData();
      }
    );
  }

  hasAction(codeAction: string, profil?: string): boolean {
    console.log('PROOFIL CODE 1 ', profil);
    if (!this.isSuperAdmin && profil == SUPERADMINISTRATEUR) {
      console.log('PAS UN ADMIN ET CHAMP SUPERADMIN');
      console.log('PROOFIL CODE 2 ', profil);
      return false;
    }
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
