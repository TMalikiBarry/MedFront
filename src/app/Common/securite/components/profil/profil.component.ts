import {Component, OnInit} from '@angular/core';
import {Page} from "../../../../models/pagination.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {UtilsService} from "../../../../services/utils/utils.service";
import {NotifService} from "../../../../services/notification/notif.service";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {NouvelleFonctionnaliteComponent} from "../../dialogs/nouvelle-fonctionnalite/nouvelle-fonctionnalite.component";
import {ProfilService} from "../../../../services/Profil/profil.service";
import {ProfilInterface} from "../../../../models/profil.interface";
import {ProfilFormDialogComponent} from "../../dialogs/profil-form-dialog/profil-form-dialog.component";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.sass']
})
export class ProfilComponent implements OnInit{


  profils!: ProfilInterface[];
  pageIndex: number = 0;
  pageSize: number = 10;

  serviceId!: number;

  paginatedData!: Page<ProfilInterface>;

  constructor(private profilService: ProfilService,
              private modalService: NzModalService,
              public utils: UtilsService,
              private notify: NotifService
  ) {}

  ngOnInit() {
    this.loadProfil();
    this.getProfilByPage();

  }

  getProfilByPage(page: number = 0, size: number = 10, firstName?: string, lastName?: string, telephone?: string,
                          startDate?: Date, endDate?: Date, status?: string, genre?: string) {

    this.profilService.getPaginatedFilteredData(page, size, firstName, lastName,
      telephone, startDate, endDate, status, genre)
      .subscribe({
        next: response => {
          console.log(response)
          this.paginatedData = response;

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
    this.getProfilByPage(this.pageIndex, this.pageSize, prenom!, nom!,
      telephone!, startDate, endDate);
    console.log('BIEN RECU LES DONNEES');

  }

  loadProfil() {
    this.profilService.getAll().subscribe({
        next: profils => {
          this.profils = profils;
          console.log('Recuperation des profils', profils);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des profils', error);
          // Gérez l'erreur selon vos besoins
        }
      }
    );
  }

  addNewProfil() {
    this.modalService.create({
      nzContent: ProfilFormDialogComponent,
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

  updateProfil(code: string) {
    this.modalService.create({
      nzContent: ProfilFormDialogComponent,
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



  deleteProfil(code: string) {
    this.modalService.confirm({
      nzTitle: 'Êtes-vous sûr de vouloir supprimer ce profil ?',
      nzContent: 'Cette action est irréversible.',
      nzOkText: 'Oui',
      nzOkDanger: true,
      nzCancelText: 'Non',
      nzOnOk: () => {
        this.profilService.delete(code).subscribe({
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
}
