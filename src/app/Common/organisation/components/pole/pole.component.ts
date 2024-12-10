import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {PoleService} from "src/app/services/pole/pole.service";
import {Page} from "src/app/models/pagination.interface";

import {PoleInterface} from "src/app/models/pole.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PoleFormDialogComponent} from "../../dialogs/pole-form-dialog/pole-form-dialog.component";
import {Router} from "@angular/router";
import {ProfilService} from "src/app/services/Profil/profil.service";

@Component({
  selector: 'app-pole',
  templateUrl: './pole.component.html',
  styleUrls: ['./pole.component.sass']
})
export class PoleComponent implements OnInit {

  paginatedData!: Page<PoleInterface>;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private api: PoleService,
              private modalService: NzModalService,
              private notify: NotifService,
              public router: Router,
              private profilService: ProfilService) {
  }
  // barGraph: any;
  // doughnutGraph: any;

  // isLastWeek: boolean = false;

  ngOnInit(): void {
    this.getByPage();
  }

  getByPage(page: number = 0, size: number = 10) {
    this.api.getPaginatedData(page, size).subscribe({
      next: value => {
        console.log('RECEPTION ', value)
        this.paginatedData = value;
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

  addNew(): void {
    this.modalService.create({
      nzContent: PoleFormDialogComponent,
      nzWidth: 650,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      () => {
        this.getByPage();
        // this.getGraphData(this.isLastWeek);
      }
    );
  }

  update(pole: PoleInterface): void {
    this.modalService.create({
      nzContent: PoleFormDialogComponent,
      nzWidth: 650,
      nzData: {
        ...pole,
        context: 'PUT_POLE'
      },
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      () => {
        this.getByPage(this.pageIndex, this.pageSize);
        // this.getGraphData(this.isLastWeek);
      }
    );
  }

  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzWidth: 650,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result === 'toPrestations') {
          this.router.navigateByUrl('/admin/dossiers/prestations')
        }

      }
    );
  }

  getFullName(p: PoleInterface): string | undefined {
    if (!p.superviseur || !p.superviseur.personne) return undefined;
    return `${p.superviseur.personne.prenom} ${p.superviseur.personne.nom}`
  }

  delete(pole: PoleInterface) {
    this.modalService.confirm({
      nzTitle: `Supprimer le pôle - <strong>${pole.nom}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir supprimer le pôle ${pole.nom} ?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.api.delete(pole.id!).subscribe({
          next: () => {
            this.notify.snackMessage(`Pôle ${pole.nom} supprimé avec succès!`, 3000, "success");
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
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }

}
