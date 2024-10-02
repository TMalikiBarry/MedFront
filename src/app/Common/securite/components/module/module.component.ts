import {Component, OnInit} from '@angular/core';
import {PersonneInterface} from "../../../../models/personne.interface";
import {Page} from "../../../../models/pagination.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ModuleInterface} from "../../../../models/module.interface";
import {ModuleService} from "../../../../services/module/module.service";
import {NouveauModuleComponent} from "../../dialogs/nouveau-module/nouveau-module.component";
import {NotifService} from "../../../../services/notification/notif.service";
import {ProfilService} from "../../../../services/Profil/profil.service";


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.sass']
})
export class ModuleComponent implements OnInit{
  modules!: ModuleInterface[];
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedModuleCode: any;
  paginatedData!: Page<ModuleInterface>;

  constructor(private moduleService: ModuleService,
              private modalService: NzModalService,
              public utils: UtilsService,
              private notify: NotifService,
              private profilService: ProfilService
  ) {}

  ngOnInit() {
    this.loadModules();
    this.getModuleByPage();
  }

  getModuleByPage(page: number = 0, size: number = 10, code?: string) {

    this.moduleService.getPaginatedFilteredData(page, size, code)
      .subscribe({
        next: response => {
          console.log(response)
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
    console.log('Données filtrées');
    console.log(this.selectedModuleCode)
    this.getModuleByPage(this.pageIndex, this.pageSize, this.selectedModuleCode);
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

  addNewModule() {
    this.modalService.create({
      nzContent: NouveauModuleComponent,
      nzClosable: false,
      nzWidth: 750,
      nzCentered: true,
    }).afterClose.subscribe(
      (result) => {
        if (result)
          // this.loadPatients()
          // this.getPatientByPage(this.pageIndex, this.pageSize);
          this.filterData();
      }
    );
  }

  updateModule(code: string) {
    this.modalService.create({
      nzContent: NouveauModuleComponent,
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

  deleteModule(code: string) {
    this.modalService.confirm({
      nzTitle: `Supprimer Module - <strong>${code}</strong>`,
      nzContent: `Êtes-vous sûr de vouloir supprimer le module ${code}?`,
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.moduleService.delete(code).subscribe({
          next: () => {
            this.notify.snackMessage(`Module ${code} supprimé avec succès`, 3000, "success");
          }
        })
      },
      nzOnCancel: () => {
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
