import {Component, OnInit} from '@angular/core';
import {PatientService} from 'src/app/services/patient/patient.service';
import {PatientInterface} from 'src/app/models/patient.interface';

import {NzModalService} from "ng-zorro-antd/modal";
import {
  PrestationFormDialogComponent
} from "../../../dossiers/dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {NouveauPatientComponent} from "../nouveau-patient/nouveau-patient.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  patients!: PatientInterface[];
  choosenDate!: Date[];
  serviceId!: number;
  // listOfService!: ServiceInterface[];
  // listOfDossierMedical!: DossierMedicalInterface[];
  // paginatedData!: Page<PatientInterface>;
  // patientPers!: PersonneInterface;
  // pageIndex: number = 0;
  // pageSize: number = 5;
  constructor(private patientService: PatientService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute,


  ) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe({
     next: patients => {
        this.patients = patients;
        console.log('Recuperation de patient ', patients);
        },
    error: (error) => {
       console.error('Erreur lors de la récupération des patients', error);
      // Gérez l'erreur selon vos besoins
    }
  }
    );
  }

  showTable(myTable: any) {
    console.log('TABLE PATIENTS ', myTable)

  }

  addNewPatient() {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 750
    }).afterClose.subscribe(
      ()=>{
        this.loadPatients()
      }
    );
  }

  addNewPrestation(data: PatientInterface) {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzData: data,
      nzClosable: false,
    }).afterClose.subscribe(
      ()=>{
        this.router.navigateByUrl('/admin/dossiers/prestation');
      }
    );
  }
  redirectToDossierMedical() {
    // Assurez-vous que vous avez l'ID du patient disponible
    const patientId = this.route.snapshot.params['id']; // Assurez-vous que 'id' correspond au nom du paramètre dans votre route
    if (patientId) {
      // Redirection vers le dossier médical avec l'ID du patient
      this.router.navigateByUrl('/admin/personnes/dossiers-medicaux', patientId);
    }
  }
}
