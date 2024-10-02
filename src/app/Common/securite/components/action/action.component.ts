import {Component, OnInit} from '@angular/core';
import {ActionInterface, httpVerbMapping} from "src/app/models/action.interface";
import {Page} from "src/app/models/pagination.interface";
import {ActionService} from "src/app/services/action/action.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {Router} from "@angular/router";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {ActionFormDialogComponent} from "../../dialogs/action-form-dialog/action-form-dialog.component";
import {ProfilService} from "../../../../services/Profil/profil.service";
import {FonctionnaliteService} from "../../../../services/fonctionnalite/fonctionnalite.service";
import {FonctionnaliteInterface} from "../../../../models/fonctionnalite.interface";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent implements OnInit {

  paginatedData!: Page<ActionInterface>;
  pageIndex: number = 0;
  pageSize: number = 10;
  selectedFonctionnaliteCode:any;
  selectedActionCode: any;
  fonctionnalites?: FonctionnaliteInterface[];
  actions? : ActionInterface[];


  constructor(private api: ActionService,
              private modalService: NzModalService,
              private router: Router,
              private profilService: ProfilService,
              private fonctionnaliteService: FonctionnaliteService,
              private actionService: ActionService) {
  }

  ngOnInit(): void {
    this.getByPage();
    this.loadFonctionnalities();
    this.loadActions();
  }

  display(action: ActionInterface) {
    console.log(action);
    if (action.description) {
      console.log('Yes value desc :', action.description);
    } else {
      console.log('nope')
    }
  }

  getHttpVerbLabel(httpVerb: string): string {
    return httpVerbMapping[httpVerb.toUpperCase()] || httpVerb;
  }

  getByPage(page: number = 0, size: number = 10, codeAction?: string, codeFonctionnalite?: string): void {
    this.api.getAllPaginated(page, size, codeAction, codeFonctionnalite).subscribe(
      {
        next: value => {
          console.log('RECEPTION ACTIONS', value);
          this.paginatedData = value;
        }
      }
    )
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex - 1;
    this.pageSize = params.pageSize;
    this.getByPage(this.pageIndex, this.pageSize, this.selectedActionCode, this.selectedFonctionnaliteCode);
  }

  addNew() {
    this.modalService.create({
      nzContent: ActionFormDialogComponent,
      nzWidth: 650,
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      () => {
        this.getByPage();
      }
    )
  }

  update(action: ActionInterface): void {
    this.modalService.create({
      nzContent: ActionFormDialogComponent,
      nzWidth: 650,
      nzData: {
        ...action,
        context: 'PUT_ACTION'
      },
      nzClosable: false,
      nzCentered: true,
    }).afterClose.subscribe(
      () => {
        this.getByPage();
      }
    )
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

  filterData() {
    console.log('RECUPERER LES DONNEES');
    console.log(this.selectedActionCode);
    console.log(this.selectedFonctionnaliteCode);
    this.getByPage(this.pageIndex, this.pageSize, this.selectedActionCode, this.selectedFonctionnaliteCode);
  }

  loadFonctionnalities() {
    this.fonctionnaliteService.getAll().subscribe({
        next: fonctionnalites => {
          this.fonctionnalites = fonctionnalites.reponse;
          console.log('Recuperation des fonctionnalites ', fonctionnalites);
          },
        error: (error) => {
          console.error('Erreur lors de la récupération des fonctionnalites', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }
  loadActions() {
    this.actionService.getAll().subscribe({
        next: actions => {
          this.actions = actions;
          console.log('Recuperation des actions ', actions);

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des actions', error);
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
