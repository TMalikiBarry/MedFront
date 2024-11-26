import {Component, OnInit} from '@angular/core';
import {PersonneInterface} from "src/app/models/personne.interface";
import {NzModalRef} from "ng-zorro-antd/modal";
import {PrestationInterface, PrestationStatut} from "src/app/models/prestation.interface";
import {UtilsService} from "src/app/services/utils/utils.service";
import {FILE_ICONS, IMAGE_EXTENSIONS} from "src/app/services/file/file.service";

@Component({
  selector: 'app-details-prestation',
  templateUrl: './details-prestation.component.html',
  styleUrls: ['./details-prestation.component.sass']
})
export class DetailsPrestationComponent implements OnInit {

  titleForm = "Detail de la prestation";
  data!: PrestationInterface;
  patientPers!: PersonneInterface;
  medecinPers!: PersonneInterface;
  createurPers!: PersonneInterface;

  constructor(private modal: NzModalRef, protected utils: UtilsService) {
  }

  ngOnInit(): void {
    this.data = this.modal.getConfig().nzData;
    //console.log(this.data);
    this.patientPers = this.data.dossierMedical!.patient!.personne;
    this.medecinPers = this.data.personnel!.personne;
    this.createurPers = this.data.personnelCreateur!.personne;
  }

  getStatusInfo(): { color: string; text: string, bgColor: string } {
    let color = '#5D6273';
    let text = 'à confirmer';
    let bgColor = 'rgba(172,173,176,0.25)'

    const status = this.data.prestationStatut!;

    switch (status) {
      case PrestationStatut.NOTPAID:
        color = '#5D6273';
        bgColor = 'rgba(172,173,176,0.2)';
        text = 'à confirmer';
        break;
      case PrestationStatut.PAID:
        color = '#84BE38';
        bgColor = 'rgba(32,172,46,0.2)';
        text = 'payé';
        break;
      case PrestationStatut.CANCELED:
        color = '#A81735';
        bgColor = 'rgba(168,23,53,0.2)';
        text = 'annulé';
        break;
    }

    return {color, text, bgColor};
  }

  handleCancel() {
    this.modal.close();
  }

  isPaid(): boolean {
    return this.data.prestationStatut === PrestationStatut.PAID;
  }

  isCanceled(): boolean {
    return this.data.prestationStatut === PrestationStatut.CANCELED;
  }

  isImageFile(extension: string): boolean {
    return IMAGE_EXTENSIONS.includes(extension.toLowerCase());
  }

  getFileIcon(extension: string): string {

    return FILE_ICONS[extension.toLowerCase()] || FILE_ICONS['default'];
  }
}
