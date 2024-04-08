import {Component, OnInit} from '@angular/core';

import {NzModalRef} from "ng-zorro-antd/modal";

import {RDVStatus, RendezVousInterface} from "src/app/models/rendez-vous.interface";
import {PersonneInterface} from "../../../../models/personne.interface";

@Component({
  selector: 'app-detail-rendez-vous',
  templateUrl: './detail-rendez-vous.component.html',
  styleUrls: ['./detail-rendez-vous.component.sass']
})
export class DetailRendezVousComponent implements OnInit{
  titleForm = "Detail du Rendez-vous";
  btnText = "Enregistrer";
  data!: RendezVousInterface;
  patientPers!: PersonneInterface;
  medecinPers!: PersonneInterface;
  createurPers!: PersonneInterface;

  constructor(private modal: NzModalRef) {
  }

  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData;
    console.log(this.data);
    this.patientPers = this.data.patient.personne;
    this.medecinPers = this.data.personnel.personne;
    this.createurPers = this.data.personnelCreateur!.personne;
  }

  getStatusInfo(): { color: string; text: string, bgColor: string } {
    let color = '#5D6273';
    let text = 'à confirmer';
    let bgColor = 'rgba(172,173,176,0.25)'

    const status = this.data.statut!;

    switch (status) {
      case RDVStatus.CREATED:
        color = '#5D6273';
        bgColor = 'rgba(172,173,176,0.2)';
        text = 'à confirmer';
        break;
      case RDVStatus.VALIDATED:
        color = '#84BE38';
        bgColor = 'rgba(32,172,46,0.2)';
        text = 'confirmé';
        break;
      case RDVStatus.CANCELED:
        color = '#A81735';
        bgColor = 'rgba(168,23,53,0.2)';
        text = 'annulé';
        break;
    }

    return {color, text, bgColor};
  }

  getPrenom(personne: PersonneInterface): string | undefined {
    if (!personne) return undefined;
    return `${personne.prenom}`
  }

  getNom(personne: PersonneInterface): string | undefined {
    if (!personne) return undefined;
    return `${personne.nom}`
  }

  handleCancel() {
    this.modal.close();
  }

  isCanceled(): boolean {
    return this.data.statut === RDVStatus.CANCELED;
  }

  getRemarques() {
    return this.data.remarques!.replace(/\s/g, '') ? this.data.remarques : 'Pas de remarques'
  }
}
