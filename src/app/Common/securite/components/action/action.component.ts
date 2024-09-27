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

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.sass']
})
export class ActionComponent implements OnInit {

  paginatedData!: Page<ActionInterface>;
  pageIndex: number = 0;
  pageSize: number = 10;


  constructor(private api: ActionService,
              private modalService: NzModalService,
              private router: Router,
              private profilService: ProfilService) {
  }

  ngOnInit(): void {
    this.getByPage();
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

  getByPage(page: number = 0, size: number = 10): void {
    this.api.getAllPaginated(page, size).subscribe(
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

    this.getByPage(this.pageIndex, this.pageSize);
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

  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }

}
