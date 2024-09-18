import {Component, OnInit} from '@angular/core';
import {AccesService} from "../../../../services/acces/acces.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {NotifService} from "../../../../services/notification/notif.service";
import {Page} from "../../../../models/pagination.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {AccesFormDialogComponent} from "../../dialogs/acces-form-dialog/acces-form-dialog.component";
import {AccesInterface} from "../../../../models/acces.interface";

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
              private notify: NotifService) {

  }


  ngOnInit(): void {
    this.getByPage();
  }

  getByPage(page: number = 0, size: number = 10) {
    this.api.getPaginatedData(page, size).subscribe({
      next: value => {
        this.paginatedData = <Page<AccesInterface>>value.reponse;
      }
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex - 1;
    this.pageSize = params.pageSize;

    this.getByPage(this.pageIndex, this.pageSize);
  }

  addNew() {
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
  }

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
      nzTitle: `Supprimer le profil - <strong>${acces.login}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir supprimer le profil ${acces.login} ?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.api.delete(acces.id!).subscribe({
          next: () => {
            this.notify.snackMessage(`Profil ${acces.login} supprimé avec succès!`, 3000, "success");
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

}
