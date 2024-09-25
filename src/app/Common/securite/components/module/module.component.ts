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
  choosenDate!: Date[];
  pageIndex: number = 0;
  pageSize: number = 10;
  serviceId!: number;

  isLastWeek = false;
  ageMin!: number;
  ageMax!: number;
  patientPers!: PersonneInterface;

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



  getModuleByPage(page: number = 0, size: number = 10, firstName?: string, lastName?: string, telephone?: string,
                   startDate?: Date, endDate?: Date, status?: string, genre?: string) {

    this.moduleService.getPaginatedFilteredData(page, size, firstName, lastName,
      telephone, startDate, endDate, status, genre,
      this.ageMin, this.ageMax)
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
    let startDate = undefined;
    let endDate = undefined;
    if (this.choosenDate) {
      startDate = this.choosenDate[0] ? this.choosenDate[0] : undefined;
      endDate = this.choosenDate[1] ? this.choosenDate[1] : undefined;
    }
    let prenom = null;
    let nom = null;
    let telephone = null;


    console.log('RECUPERER LES DONNEES');
    this.getModuleByPage(this.pageIndex, this.pageSize, prenom!, nom!,
      telephone!, startDate, endDate);
    console.log('BIEN RECU LES DONNEES');

  }
  loadModules() {

    this.moduleService.getAll().subscribe({
        next: modules => {
          this.modules = modules;
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
      nzTitle: 'Êtes-vous sûr de vouloir supprimer ce module ?',
      nzContent: 'Cette action est irréversible.',
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.moduleService.delete(code).subscribe({
          next: response => {
              let code = response;
            console.log("Reponse suppression")
              console.log(response)
            this.notify.snackMessage(`Suppression effectuée avec succés `, 3000, "success");
          }
        })
        console.log('Suppression confirmée');
      },
      nzOnCancel: () => {
        console.log('Suppression annulée');
      }
    }).afterClose.subscribe(
      (result) => {
        if (result)
          this.filterData();
      }
    );

  }

  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
