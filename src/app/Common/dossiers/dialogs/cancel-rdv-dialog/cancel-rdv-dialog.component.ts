import {Component, OnInit} from '@angular/core';
import {NzModalRef} from "ng-zorro-antd/modal";
import {RendezVousService} from "src/app/services/rendez-vous/rendez-vous.service";
import {RDVStatus, RendezVousInterface} from "src/app/models/rendez-vous.interface";
import {NotifService} from "src/app/services/notification/notif.service";

@Component({
  selector: 'app-cancel-rdv-dialog',
  templateUrl: './cancel-rdv-dialog.component.html',
  styleUrls: ['./cancel-rdv-dialog.component.sass']
})
export class CancelRdvDialogComponent implements OnInit {
  rdvMotif!: string;
  isConfirmLoading = false;
  rdvToUpdate!: RendezVousInterface;

  constructor(private modal: NzModalRef,
              private api: RendezVousService,
              private notify: NotifService) {
  }

  ngOnInit(): void {
    this.rdvToUpdate = this.modal.getConfig().nzData;
  }

  handleCancel(code?: string) {
    this.modal.close(code);
  }

  cancelRDV() {
    if (!this.rdvMotif) {
      this.notify.snackMessage(`Veuillez renseigner le motif de l'annulation`, 3000, "error");
      return;
    }

    this.isConfirmLoading = true;
    this.rdvToUpdate.motif = this.rdvMotif;
    this.rdvToUpdate.statut = RDVStatus.CANCELED;
    this.api.updateRdv(this.rdvToUpdate).subscribe({
      next: value => {
        this.modal.close();
        // this.apiRdv.getAllRdv();
        this.notify.snackMessage(
          `Rendez-vous annulé pour le patient ${this.rdvToUpdate.patient.personne.prenom} ${this.rdvToUpdate.patient.personne.nom}`,
          3000, 'error')
      },
      error: (error) => {
        console.error(error);
        this.isConfirmLoading = false;
      },
      complete: () => {
        this.isConfirmLoading = false
      }
    })
  }
}
