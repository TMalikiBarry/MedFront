import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../models/pagination.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {NotifService} from "../../../../services/notification/notif.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ProfilService} from "../../../../services/Profil/profil.service";
import {ProfilInterface} from "../../../../models/profil.interface";
import {ProfilFormDialogComponent} from "../../dialogs/profil-form-dialog/profil-form-dialog.component";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent implements OnInit{


  profils!: ProfilInterface[];
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedProfilCode: any;
  serviceId!: number;

  paginatedData!: Page<ProfilInterface>;

  constructor(private profilService: ProfilService,
              private modalService: NzModalService,
              public utils: UtilsService,
              private notify: NotifService
  ) {}

  ngOnInit() {
    this.loadProfil();
    this.getProfilByPage();

  }

  getProfilByPage(page: number = 0, size: number = 10, code?: string, ) {

    this.profilService.getPaginatedFilteredData(page, size, code)
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



    console.log('RECUPERER LES DONNEES');
    this.getProfilByPage(this.pageIndex, this.pageSize, this.selectedProfilCode);
    console.log('BIEN RECU LES DONNEES');

  }

  loadProfil() {
    this.profilService.getAll().subscribe({
        next: profils => {
          this.profils = profils.reponse;
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
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
