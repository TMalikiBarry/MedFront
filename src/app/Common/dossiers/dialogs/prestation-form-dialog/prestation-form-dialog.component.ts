import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {listService, my_prescription, Service} from "src/app/models/Utils/constants";
import {PrestationInterface, PrestationStatut} from "src/app/models/prestation.interface";
import {PrestationService} from "src/app/services/prestation/prestation.service";
import {DossierMedicalInterface} from "src/app/models/dossier-medical.interface";
import {DossierMedicalService} from "src/app/services/dossier-medical/dossier-medical.service";
import {CliniqueServiceService} from "src/app/services/service/clinique-service.service";
import {ServiceInterface} from "src/app/models/service.interface";
import {NotifService} from "src/app/services/notification/notif.service";
import {PersonneInterface} from "src/app/models/personne.interface";

import {
  NouveauPatientComponent
} from "../../../personnes/dialogs/nouveau-patient-form-dialog/nouveau-patient.component";
import {PoleInterface} from "src/app/models/pole.interface";
import {ProfilService} from "src/app/services/Profil/profil.service";
import {CONTEXTFILE, FileInfosInterface, TypeFile} from "src/app/models/files-infos.interface";
import {FILE_ICONS, FileService, IMAGE_EXTENSIONS} from "src/app/services/file/file.service";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-prestation-form-dialog',
  templateUrl: './prestation-form-dialog.component.html',
  styleUrls: ['./prestation-form-dialog.component.sass']
})
export class PrestationFormDialogComponent implements OnInit{

  titleForm = "Nouvelle prestation";
  formDesc = "Veuillez remplir ce formulaire pour ajouter une prestation";
  btnText = "Valider";
  isConfirmLoading = false;
  listOfService!: Service[];
  dossierData?: DossierMedicalInterface
  myServicesList!: ServiceInterface[];
  listOfDossierMedical!: DossierMedicalInterface[];
  listPrescription!: any;
  listOfPole!: PoleInterface[];
  prestationToUpdate!: PrestationInterface;
  currentFile?: File;
  listFileInfos: FileInfosInterface[] = [];
  listFiles: File [] = [];
  showFileCntrl$!: Observable<boolean>;

  prestationForm: FormGroup = this.fb.group({
    service: ['', Validators.required],
    dossier: ['', Validators.required],
    diagnostic: '',
    conclusion: '',
    prerequis: '',
    resultat:''
  })

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private modal: NzModalRef,
              private modalService: NzModalService,
              private fb: FormBuilder,
              private api: PrestationService,
              private dossierMApi: DossierMedicalService,
              private serviceApi: CliniqueServiceService,
              protected fileApi: FileService,
              private notify: NotifService,
              private profilService: ProfilService
              ) {
  }

  get choosenDossierM(): DossierMedicalInterface {
    const dossierID = this.prestationForm.controls['dossier'].value as number;

    return this.listOfDossierMedical.find(d => d.id === dossierID)!;
  }

  loadPatients(patientId?: number) {
    this.dossierMApi.getAll().subscribe({
      next: result => {
        this.listOfDossierMedical = result.filter(dossier => !!dossier.patient?.personne);
        const patient = this.modal.getConfig().nzData;
        if (patient && patient.contactEnCasUrgent) {
          this.dossierData = this.listOfDossierMedical.find(d => d.patient?.id === patient.id)!;
        } else if (patientId) {
          this.dossierData = this.listOfDossierMedical.find(d => d.patient?.id === patientId)!;
        }
        if (this.dossierData) {
          this.prestationForm.controls['dossier'].setValue(this.dossierData.id);
        }
      }
    });
  }

  addPrestation() {

    if (this.prestationForm.valid) {
      this.isConfirmLoading = true;
      const formData = this.prestationForm.value;

      const prestation = this.createPrestationFromForm(formData);
      prestation.documents = this.listFileInfos;
      if (this.prestationToUpdate) {
        prestation.id = this.prestationToUpdate.id;
        prestation.personnel = this.prestationToUpdate.personnel;
        prestation.dateCreation = this.prestationToUpdate.dateCreation;
        prestation.supprime = this.prestationToUpdate.supprime;

        this.updatePrestation(prestation);
        return;
      }

      this.api.save(prestation).subscribe({
        next: () => {

          this.notify.snackMessage(
            `Prestation pour le patient ${this.getPatientFullName(Number(formData.dossier), 'adding')} ajouté avec succès`,
            3000, 'success');
          this.prestationForm.reset();
          if (this.dossierData)  {
            this.prestationForm.controls['dossier'].setValue(this.dossierData.id);
          }
          this.handleCancel('toPrestations');

        },
        error: (error) => {
          console.error(error);
          this.isConfirmLoading = false;
        },
        complete: () => {this.isConfirmLoading = false}
      });
    }
  }

  handleCancel(code?: string) {
    this.modal.close(code);
  }

  createPrestationFromForm(formData: any): PrestationInterface {
    const cout = this.myServicesList.find(s => s.id === formData.service)?.cout ?? 10000;
    return {
      cout,
      montant: cout,
      prestationStatut: PrestationStatut.NOTPAID,
      prerequisities: formData.prerequis, // Peut être ajusté ou récupéré du formulaire si nécessaire
      diagnostic: formData.diagnostic,
      conclusion: formData.conclusion,
      //personnel: { id: 3 },
      dossierMedical: {id: formData.dossier}, // L'ID doit correspondre à la logique de l'application
      service: { id: formData.service } // Supposé que le service dans le formulaire est l'ID
    };
  }

  private setForm() {
    this.prestationForm.controls['dossier'].setValue(this.prestationToUpdate.dossierMedical?.id);
    this.prestationForm.controls['service'].setValue(this.prestationToUpdate.service?.id);
    if (this.prestationToUpdate.diagnostic) this.prestationForm.controls['diagnostic'].setValue(this.prestationToUpdate.diagnostic);
    if (this.prestationToUpdate.prerequisities) this.prestationForm.controls['prerequis'].setValue(this.prestationToUpdate.prerequisities);
    if (this.prestationToUpdate.conclusion) this.prestationForm.controls['conclusion'].setValue(this.prestationToUpdate.conclusion);
  }

  triggerFileUpload() {
    document.getElementById('file_uploader')!.click();
  }

  ngOnInit(): void {

    this.listOfService = listService;
    this.listPrescription = my_prescription;
    this.loadPatients();
    const data = this.modal.getConfig().nzData;
    if (data?.context === 'PUT_PRESTATION') {
      this.prestationToUpdate = data;
      this.titleForm = 'Modification Prestation'
      this.formDesc = this.formDesc.replace('ajouter une', 'modifier la');

      this.listFileInfos = this.prestationToUpdate.documents ?? [];
      this.setForm();
    }

    this.initObservableCalls();

  }

  getEvent(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.notify.snackMessage('Aucun fichier sélectionné', 2500, "warning");
      return;
    }

    // Transformez FileList en tableau pour le parcourir
    const files = Array.from(input.files);
    // ( <HTMLInputElement> event.target).value = '';
    // ( <HTMLInputElement> event.target).files = null;
    /*input.value = '';
    // Forcer Angular à détecter les changements si nécessaire
    if (!input.files || input.files.length === 0) {
      input.dispatchEvent(new Event('change'));
    }
    input.files = null;*/
    this.resetFileInput();

    files.forEach((file) => {
      console.log('Fichier sélectionné :', file);

      /*if (this.fileApi.isTypeFilePDF(file)) {
        console.log('Le fichier est un PDF');
      } else {
        console.warn(`Le fichier ${file.name} n'est pas un PDF.`);
      }*/

      // Vérifiez si l'extension est autorisée
      if (!this.fileApi.isAllowedFileExtension(file)) {
        this.notify.snackMessage(`Extension non autorisée : ${file.name}`, 3000, 'error');
        return; // Ignorer ce fichier
      }

      // Vérifiez si le type MIME est autorisé
      if (!this.fileApi.isAllowedFileType(file)) {
        this.notify.snackMessage(`Type de fichier non autorisé : ${file.type}`, 3000, 'error');
        return; // Ignorer ce fichier
      }

      // Vérifiez la taille du fichier
      if (file.size > this.fileApi.limitFile) {
        this.notify.snackMessage(`Le fichier ${file.name} dépasse la taille maximale autorisée, 2.5 Mo.`, 3000, 'error');
        return; // Ignorer ce fichier
      }

      // Ajoutez le fichier validé à la liste
      this.listFiles.push(file);

      // Définissez `currentFile` (le premier fichier valide, par exemple)
      if (!this.currentFile) {
        this.currentFile = file;
      }
    });

    console.log('Fichiers validés :', this.listFiles);
    this.uploadFiles();
  }

  uploadFiles(): void {
    if (this.listFiles.length === 0) {
      console.warn('Aucun fichier à uploader');
      return;
    }

    this.listFiles.forEach((file) => {
      const patientFullName = this.getPatientFullName(this.choosenDossierM);
      this.fileApi.save(file, TypeFile.INFOS, CONTEXTFILE.PRESTATIONDOC,
        this.generateFileName(file), patientFullName)
        .subscribe({
        next: (response) => {
          console.log('Fichier uploadé avec succès :', response);
          if (this.listFileInfos.every(f => f.id !== response.id)) {
            this.listFileInfos.push(response);
          }
        },
        error: (err) => console.error('Erreur lors de l\'upload du fichier :', err),
      });
    });
  }

  private updatePrestation(prestation: PrestationInterface) {
    this.api.update(prestation).subscribe({
      next: value => {
        this.notify.snackMessage(
          `Prestation pour le patient ${this.getPatientFullName(value.dossierMedical!)} modifié avec succès`,
          3000, 'success');
        this.handleCancel();
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

  getPatientFullName(dossier: DossierMedicalInterface | number, context ?: string):string {
    // Vérifier si dossier est un objet (et donc potentiellement un DossierMedicalInterface)
    let personne: PersonneInterface | undefined;

    if (dossier !== null && typeof dossier !== 'number') {
      // Supposons que si 'dossier' a une propriété 'patient', c'est un DossierMedicalInterface
      if ('patient' in dossier && dossier.patient?.personne) {
        personne = dossier.patient.personne;
        if (context) {
          console.log('DOSSIER CHOISI ', dossier);
          console.log('PERSONNE CORRESPONDANT ', personne);
        }
      }
    } else {  // Ici, vous pouvez gérer le cas où dossier est un number
      personne = this.listOfDossierMedical.find(d => d.id === dossier)?.patient?.personne;
    }

    return `${personne!.prenom} ${personne!.nom}`;
  }


  addNewPatient() {
    this.modalService.create({
      nzContent: NouveauPatientComponent,
      nzClosable: false,
      nzWidth: 700,
      nzCentered: true
    }).afterClose.subscribe((result: any) => {
      this.dossierData = undefined;
      console.log('Données reçues du modal :', result);
      this.loadPatients(result);
      // this.prestationForm.controls.dossier.setValue(result)
    });
  }

  getAllServicesByPole(pole: PoleInterface): ServiceInterface [] {
    return this.myServicesList.filter(s => s.pole?.id === pole.id);
  }
  hasAction(codeAction: string): boolean {
    const actions = this.profilService.getActions();
    return actions ? actions.some(action => action.code === codeAction) : false;
  }

  isImageFile(extension: string): boolean {
    return IMAGE_EXTENSIONS.includes(extension.toLowerCase());
  }

  getFileIcon(extension: string): string {

    return FILE_ICONS[extension.toLowerCase()] || FILE_ICONS['default'];
  }

  removeFile(file: FileInfosInterface): void {
    this.fileApi.deleteFileByName(file.name).subscribe({
      next: (response) => {
        if (response.reponse) {
          console.log(`Fichier supprimé : ${file.name}`);
          this.notify.snackMessage(`Fichier retiré avec succès : ${file.originalName}`, 2500, "success");
        } else {
          this.notify.snackMessage(`Problème lors du retrait du fichier : ${response.message}`, 2500, "warning");
        }
      },
      error: () => {
        this.notify.snackMessage(`Erreur inconnue est survenue `, 2500, "error");
      }
    });

    this.removeFromList(file);

  }

  removeFromList(file: FileInfosInterface): void {
    const index = this.listFileInfos.indexOf(file);
    if (index !== -1) {
      this.listFileInfos.splice(index, 1);
    }
  }

  getFileOriginalName(name: string, type: 'DETAILED' | 'NOTDETAILED' = 'NOTDETAILED', count?: number) {
    let start = count || (type === 'NOTDETAILED' ? 6 : 3);
    return name.split('_').slice(start).join("_");
  }

  resetFileInput(): void {
    // Réinitialisez complètement la valeur de l'élément input
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.files = null;
  }

  getFileExtension(file: File) {
    return file.name.toLowerCase().split('.').pop()
  }

  generateFileName(file: File, type: TypeFile = TypeFile.INFOS, context: CONTEXTFILE = CONTEXTFILE.PRESTATIONDOC) {
    const timestamp = new Date().toISOString().replace(/[TZ.]/g, "_");
    // .replace(/[-:.TZ]/g, '_');

    return `${timestamp}${context}_${type}_DOSSIER-${this.choosenDossierM.id}_${this.getPatientFullName(this.choosenDossierM).replace(/\s+/g, '_')}.${this.getFileExtension(file)}`;
  }

  private initObservableCalls() {

    this.showFileCntrl$ = this.prestationForm.controls['dossier'].valueChanges.pipe(
      startWith(this.prestationForm.controls['dossier'].value),
      map(value => !!value),
    );

    this.serviceApi.getAllService().subscribe({
      next: result => {
        this.myServicesList = result.reponse as ServiceInterface[];
        /*this.listOfPole = this.myServicesList.map(s => {
          // return this.listOfPole.some( p => p.id == s.pole?.id) ? s.pole : undefined
          return s.pole!
        });*/
        this.listOfPole = this.myServicesList
          .map(s => s.pole!) // Créez un tableau de tous les pôles
          .filter((pole, index, self) =>
            pole && self.findIndex(p => p.id === pole.id) === index
          ); // Filtrez pour ne garder que les pôles uniques

      },
      error: () => {
        this.modal.close();
      }
    })

  }
}
