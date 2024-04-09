import {Component, OnInit} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {PersonnelService} from "src/app/services/personnel/personnel.service";
import {Page} from "src/app/models/pagination.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {PersonnelInterface} from "src/app/models/personnel.interface";
import {PersonnelFormDialogComponent} from "../../dialogs/personnel-form-dialog/personnel-form-dialog.component";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.sass']
})
export class PersonnelComponent implements OnInit {

  paginatedData!: Page<PersonnelInterface>;
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private api: PersonnelService,
              private modalService: NzModalService,
              private notify: NotifService,
              public router: Router) {
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
      nzContent: PersonnelFormDialogComponent,
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

  update(personnel: PersonnelInterface): void {
    this.modalService.create({
      nzContent: PersonnelFormDialogComponent,
      nzWidth: 650,
      nzData: {
        ...personnel,
        context: 'PUT_PERSONNEL'
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

}
