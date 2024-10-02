import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NotifService} from "../../../../services/notification/notif.service";
import {FonctionnaliteInterface} from "../../../../models/fonctionnalite.interface";
import {FonctionnaliteService} from "../../../../services/fonctionnalite/fonctionnalite.service";
import {ModuleInterface} from "../../../../models/module.interface";
import {ModuleService} from "../../../../services/module/module.service";

@Component({
  selector: 'app-nouvelle-fonctionnalite',
  templateUrl: './nouvelle-fonctionnalite.component.html',
  styleUrls: ['./nouvelle-fonctionnalite.component.sass']
})
export class NouvelleFonctionnaliteComponent implements OnInit{
  fonctionnaliteForm: FormGroup;
  fonctionnalite !: FonctionnaliteInterface

  titleForm: string = "Nouvelle fonctionnalité";
  isConfirmLoading = false;
  fonctionnaliteToUpdate!: FonctionnaliteInterface;
  modules!: ModuleInterface[];

  constructor(private fb: FormBuilder,
              private modalRef : NzModalRef,
              private fonctionaliteService: FonctionnaliteService,
              private moduleService: ModuleService,
              private notify: NotifService) {

    this.fonctionnaliteForm = this.fb.group({
      code: ['', Validators.required],
      description: [''],
      module: ['', Validators.required],
      sequence: [''],
      bookmark: ['', Validators.required],
      image: [''],
    });

  }

  ngOnInit() {
    try {
      const fonctionCode: string = <string>this.modalRef.getConfig().nzData;

      if (fonctionCode)
        this.loadFonctionnalityForUpdate(fonctionCode);
      this.getAllModules();
    } catch (s) {
      console.error(s)
    }

  }

  enregistrerFonctionnalite() {
    if (this.fonctionnaliteForm.valid) {
      this.isConfirmLoading = true;
      const fonctionaliteData = this.fonctionnaliteForm.value;
      let fonctionalityForm = <FonctionnaliteInterface>this.createFonctionnalityForm(fonctionaliteData)
      console.log("Infos a envoyer")
      console.log(fonctionalityForm)
      if (this.fonctionnaliteToUpdate) {
        this.updateFonctionnalite(fonctionalityForm);
        return;
      }
      this.fonctionaliteService.save(fonctionalityForm).subscribe({
        next : res1 => {
          this.fonctionnalite = res1.reponse;
          console.log(res1);
          this.notify.snackMessage(`La fonctionnalité ${fonctionalityForm.description}  a été ajoutée`,
            3000, "success");
          this.modalRef.close(res1.reponse.code);
        },
        error: (error) => {
          console.error(error);
          this.isConfirmLoading = false;
          if (error.status == 401)
            this.modalRef.close();
        },
        complete: () => this.isConfirmLoading = false,
      })

      this.fonctionnalite = fonctionaliteData

    } else {
      this.notify.snackMessage(`Certains champs sont mal renseignés `, 3000, "error");
    }
  }

  createFonctionnalityForm(formData: any): FonctionnaliteInterface {
    return <FonctionnaliteInterface>{
      code: formData.code,
      description: formData.description,
      sequence: formData.sequence,
      module: {code: formData.module},
      bookmark: formData.bookmark,
      image: formData.image,
      supprime: false
    };
  }

  private loadFonctionnalityForUpdate(fonctionCode: string) {

    this.titleForm = 'Modifier Fonctionnalité';
    this.fonctionaliteService.getFonctionalityByCode(fonctionCode).subscribe({
      next: fonction => {
        this.fonctionnaliteToUpdate = fonction.reponse;

        this.fonctionnaliteForm.controls['code'].setValue(fonction.reponse.code);
        this.fonctionnaliteForm.controls['code'].disable();
        this.fonctionnaliteForm.controls['description'].setValue(fonction.reponse.description);
        this.fonctionnaliteForm.controls['bookmark'].setValue(fonction.reponse.bookmark);
        this.fonctionnaliteForm.controls['sequence'].setValue(fonction.reponse.sequence);
        this.fonctionnaliteForm.controls['module'].setValue(fonction.reponse.module.code);
        this.fonctionnaliteForm.controls['image'].setValue(fonction.reponse.image);

      }
    })
  }

  private updateFonctionnalite(fonctionalite: FonctionnaliteInterface) {

    this.fonctionaliteService.update(fonctionalite).subscribe({
      next: () => {
        this.notify.snackMessage(`Modification effectuée avec succès `, 3000, "success");
        this.fonctionnaliteForm.reset();
        this.modalRef.close('update-success');
      },
      error: (error) => {
        console.error(error);
        this.isConfirmLoading = false;
        if (error.status == 401)
          this.modalRef.close();
      },
      complete: () => this.isConfirmLoading = false,
    })
  }

  handleCancel() {
    this.modalRef.close();
  }

  private getAllModules() {
    this.moduleService.getAll().subscribe({
      next: res1 => {
        this.modules = res1.reponse;
      }
      }

    )
  }
}
