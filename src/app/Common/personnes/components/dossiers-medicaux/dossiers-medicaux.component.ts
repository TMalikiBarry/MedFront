import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PatientInterface} from 'src/app/models/patient.interface';
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {UtilsService} from "src/app/services/utils/utils.service";
import {RendezVousInterface} from "src/app/models/rendez-vous.interface";
import {DetailRendezVousComponent} from "../../../dossiers/dialogs/detail-rendez-vous/detail-rendez-vous.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {PrestationInterface} from "src/app/models/prestation.interface";
import {DetailsPrestationComponent} from "../../../dossiers/dialogs/details-prestation/details-prestation.component";
import {ProfilService} from "src/app/services/Profil/profil.service";


interface StatusInfo {
  color: string;
  text: string;
}

interface StatusMap {
  [key: string]: StatusInfo;
}


@Component({
  selector: 'app-dossiers-medicaux',
  templateUrl: './dossiers-medicaux.component.html',
  styleUrls: ['./dossiers-medicaux.component.sass']
})
export class DossiersMedicauxComponent implements OnInit {
  patientForm: FormGroup;
  patient!: PatientInterface;
  dossierMedicalInfos!: DossierMedicalInterface;
  RDVStatusMap: StatusMap = {
    CREATED: {color: '#5D6273', text: 'à confirmer'},
    VALIDATED: {color: '#84BE38', text: 'confirmé'},
    CANCELED: {color: '#A81735', text: 'annulé'},
  };
  PrestationStatusMap: StatusMap = {
    NOTPAID: {color: '#5D6273', text: 'à payer'},
    PAID: {color: '#84BE38', text: 'payé'},
    CANCELED: {color: '#A81735', text: 'annulé'},
  };

  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: DossierMedicalService,
    public utils: UtilsService,
    private profilService: ProfilService
  ) {
    this.patientForm = this.fb.group({
      genre: '',
      prenom: '',
      nom: '',
      telephone: '',
      email: '',
      contactEnCasUrgent: '',
      dateNaissance: '',
      groupeSanguin: '',
      adresse: '',
      maladies: '',
      allergies: '',
    });
  }

  ngOnInit() {
    /*    this.route.paramMap.subscribe(params => {
          const patientId = params?.get('id');
          if (patientId) {
            this.loadPatientData(+patientId);
          }
        });*/

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPatientData(+id);
    }

    this.subscribeToPhoneNumberChanges('telephone');
    this.subscribeToPhoneNumberChanges('contactEnCasUrgent');
  }

  loadPatientData(patientId: number) {
    this.api.getPatientDetailsById(patientId).subscribe({
      next: (dm) => {
        this.dossierMedicalInfos = dm
        this.populateFormWithPatientData(dm);
      },
      error: (error) => {
        console.error('Error fetching patient data: ', error);
      }
    });
  }

  populateFormWithPatientData(dm: DossierMedicalInterface) {
    this.patientForm.patchValue({
      genre: this.utils.getPatientGenre(dm.patient!.personne.genre),
      prenom: dm.patient!.personne.prenom,
      nom: dm.patient!.personne.nom,
      email: dm.patient!.personne.email,
      telephone: dm.patient!.personne.telephone,
      contactEnCasUrgent: dm.patient!.contactEnCasUrgent,
      dateNaissance: dm.patient!.personne.datenaissance,
      groupeSanguin: dm.patient!.groupeSanguin,
      adresse: dm.patient!.personne.adresse,
      maladies: dm.maladies,
      allergies: dm.allergies,
      // antecedant_patologie: dm.patient!.antecedant_patologie
    });

    this.patientForm.disable();
  }

  subscribeToPhoneNumberChanges(controlName: string): void {
    this.patientForm.controls[controlName].valueChanges.subscribe((value: string) => {
      const formattedNumber = this.utils.formatPhoneNumber(value);

      if (value !== formattedNumber) {
        this.patientForm.controls[controlName].patchValue(formattedNumber, {emitEvent: false});
      }
    });
  }

  seeDetails(rdv: RendezVousInterface, context?: 'RDV' | 'PREST') {
    this.modalService.create({
      nzContent: DetailRendezVousComponent,
      nzData: rdv,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
      nzFooter: null
    });
  }

  seePrestationDetails(prestation: PrestationInterface) {
    this.modalService.create({
      nzContent: DetailsPrestationComponent,
      nzData: prestation,
      nzClosable: false,
      nzWidth: '50rem',
      nzCentered: true,
      nzFooter: null
    });
  }

  getStatusInfo(status: string, statusMap: StatusMap): StatusInfo {
    return statusMap[status];
  }
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }
}
