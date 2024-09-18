import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../models/pagination.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {FonctionnaliteInterface} from "../../../../models/fonctionnalite.interface";
import {FonctionnaliteService} from "../../../../services/fonctionnalite/fonctionnalite.service";
import {NouvelleFonctionnaliteComponent} from "../../dialogs/nouvelle-fonctionnalite/nouvelle-fonctionnalite.component";
import {NotifService} from "../../../../services/notification/notif.service";

@Component({
  selector: 'app-fonctionnalite',
  templateUrl: './fonctionnalite.component.html',
  styleUrls: ['./fonctionnalite.component.sass']
})
export class FonctionnaliteComponent implements OnInit{
  fonctionnalites!: FonctionnaliteInterface[];
  pageIndex: number = 0;
  pageSize: number = 10;

  serviceId!: number;

  paginatedData!: Page<FonctionnaliteInterface>;

  constructor(private fonctionnaliteService: FonctionnaliteService,
              private modalService: NzModalService,
              public utils: UtilsService,
              private notify: NotifService
  ) {}

  ngOnInit() {
    this.loadFonctionnalites();
    this.getFonctionnalityByPage();

  }

  getFonctionnalityByPage(page: number = 0, size: number = 10, firstName?: string, lastName?: string, telephone?: string,
                   startDate?: Date, endDate?: Date, status?: string, genre?: string) {

    this.fonctionnaliteService.getPaginatedFilteredData(page, size, firstName, lastName,
      telephone, startDate, endDate, status, genre)
      .subscribe({
        next: response => {
          this.paginatedData = response.reponse;

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
    this.getFonctionnalityByPage(this.pageIndex, this.pageSize, prenom!, nom!,
      telephone!, startDate, endDate);
    console.log('BIEN RECU LES DONNEES');

  }

  loadFonctionnalites() {
    this.fonctionnaliteService.getAll().subscribe({
        next: fonctionnalities => {
          this.fonctionnalites = fonctionnalities;
          console.log('Recuperation de fonctionnalites', fonctionnalities);
          },
        error: (error) => {
          console.error('Erreur lors de la récupération des patients', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }

  addNewFonctionnality() {
    this.modalService.create({
      nzContent: NouvelleFonctionnaliteComponent,
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

  updateFonctionalite(code: string) {
    this.modalService.create({
      nzContent: NouvelleFonctionnaliteComponent,
      nzClosable: false,
      nzWidth: 750,
      nzCentered: true,
      nzData: code
    }).afterClose.subscribe(
      (result) => {
        if (result)
          this.filterData();
      }
    );
  }



  deleteFonctionalite(code: string) {
    this.modalService.confirm({
      nzTitle: `Supprimer Fonctionnalité - <strong>${code}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir supprimer la fonctionnalité ${code}?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.fonctionnaliteService.delete(code).subscribe({
          next: () => {

            this.notify.snackMessage(`La fonctionnalité ${code} supprimée avec succès `, 3000, "success");
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
}
