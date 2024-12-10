import {Component, OnInit} from '@angular/core';
import {Page} from "src/app/models/pagination.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "src/app/services/utils/utils.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {FonctionnaliteInterface} from "src/app/models/fonctionnalite.interface";
import {FonctionnaliteService} from "src/app/services/fonctionnalite/fonctionnalite.service";
import {NouvelleFonctionnaliteComponent} from "../../dialogs/nouvelle-fonctionnalite/nouvelle-fonctionnalite.component";
import {NotifService} from "src/app/services/notification/notif.service";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {ModuleInterface} from "src/app/models/module.interface";
import {ModuleService} from "src/app/services/module/module.service";

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
  selectedFonctionaliteCode: any;
  selectedModuleCode: any;
  modules!: ModuleInterface[];

  constructor(private fonctionnaliteService: FonctionnaliteService,
              private modalService: NzModalService,
              public utils: UtilsService,
              private notify: NotifService,
              private profilService: ProfilService,
              private moduleService: ModuleService
  ) {}

  ngOnInit() {
    this.loadFonctionnalites();
    this.loadModules();
    this.getFonctionnalityByPage();
  }

  getFonctionnalityByPage(page: number = 0, size: number = 10, codeFonctionnalite?: string, codeModule?: string) {

    this.fonctionnaliteService.getPaginatedFilteredData(page, size, codeFonctionnalite, codeModule)
      .subscribe({
        next: response => {
          this.paginatedData = response.reponse;
        },
        error: (error) => {
          if(error.includes('Permission non accord')) {
            this.notify.snackMessage("Permission non accordée pour cette action", 3500, "error");
          }
          console.error('Erreur lors de la récupération des patients', error);
          // Gérez l'erreur selon vos besoins
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
    console.log(this.selectedModuleCode);
    console.log(this.selectedFonctionaliteCode);
    this.getFonctionnalityByPage(this.pageIndex, this.pageSize, this.selectedFonctionaliteCode, this.selectedModuleCode);

  }

  loadFonctionnalites() {
    this.fonctionnaliteService.getAll().subscribe({
        next: fonctionnalities => {
          this.fonctionnalites = fonctionnalities.reponse;
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
  loadModules() {

    this.moduleService.getAll().subscribe({
        next: modules => {
          this.modules = modules.reponse;
          console.log('Recuperation de modules ', modules);

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des patients', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }

  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
