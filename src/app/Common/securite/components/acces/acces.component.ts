import {Component, OnInit} from '@angular/core';
import {AccesService} from "../../../../services/acces/acces.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {NotifService} from "../../../../services/notification/notif.service";
import {Page} from "../../../../models/pagination.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {AccesFormDialogComponent} from "../../dialogs/acces-form-dialog/acces-form-dialog.component";
import {AccesInterface} from "../../../../models/acces.interface";
import {ProfilService} from "../../../../services/Profil/profil.service";

@Component({
  selector: 'app-acces',
  templateUrl: './acces.component.html',
  styleUrls: ['./acces.component.sass']
})
export class AccesComponent implements OnInit {

  paginatedData!: Page<AccesInterface>;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private api: AccesService,
              private modalService: NzModalService,
              public utils: UtilsService,
              private notify: NotifService,
              private profilService: ProfilService) {
  }


  ngOnInit(): void {
    this.getByPage();
  }

  getByPage(page: number = 0, size: number = 10) {
    this.api.getPaginatedData(page, size).subscribe({
      next: value => {
        this.paginatedData = <Page<AccesInterface>>value.reponse;
      },
      error: (error) => {
        if(error.includes('Permission non accord')) {
          this.notify.snackMessage("Permission non accordée pour cette action", 3500, "error");
        }
        console.error('Erreur lors de la récupération des patients', error);
        // Gérez l'erreur selon vos besoins
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex - 1;
    this.pageSize = params.pageSize;

    this.getByPage(this.pageIndex, this.pageSize);
  }

  /*addNew() {
    this.modalService.create(
      {
        nzContent: AccesFormDialogComponent,
        nzWidth: 650,
        nzClosable: false,
        nzCentered: true,
      }
    ).afterClose.subscribe(
      () => {
        this.getByPage();
      }
    );
  }*/

  update(acces: AccesInterface) {
    this.modalService.create(
      {
        nzContent: AccesFormDialogComponent,
        nzWidth: 650,
        nzData: {
          ...acces,
          context: 'PUT_ACCES'
        },
        nzClosable: false,
        nzCentered: true,
      }
    ).afterClose.subscribe(
      () => {
        this.getByPage(this.pageIndex, this.pageSize);
      }
    );
  }

  delete(acces: AccesInterface) {
    this.modalService.confirm({
      nzTitle: `Supprimer l'accès - <strong>${acces.login}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir supprimer l'accès ${acces.login} ?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.api.delete(acces.id!).subscribe({
          next: () => {
            this.notify.snackMessage(`Accès ${acces.login} supprimé avec succès!`, 3000, "success");
          }
        })
      },
      nzOnCancel: () => {
        console.log('Suppression annulée');
      }
    }).afterClose.subscribe(
      () => {
        this.getByPage(this.pageIndex, this.pageSize);
      }
    );
  }

  resetPassword(acces: AccesInterface) {
    this.modalService.confirm({
      nzTitle: `Réinitialisation Mot De Passe accès - <strong>${acces.login}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir réinitialiser pour l'accès ${acces.login} ?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.api.resetAccesPassword(acces).subscribe({
          next: () => {
            this.notify.snackMessage(`Mot de passe de ${acces.login} réinitialisé avec succès!`, 3000, "success");
          }
        })
      },
      /*nzOnCancel: () => {
        console.log('Suppression annulée');
      }*/
    }).afterClose.subscribe(
      () => {
        this.getByPage(this.pageIndex, this.pageSize);
      }
    );
  }
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
