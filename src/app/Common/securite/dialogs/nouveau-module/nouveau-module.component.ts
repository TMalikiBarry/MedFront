import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonneInterface} from "../../../../models/personne.interface";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NotifService} from "../../../../services/notification/notif.service";
import {ModuleService} from "../../../../services/module/module.service";
import {ModuleInterface} from "../../../../models/module.interface";

@Component({
  selector: 'app-nouveau-module',
  templateUrl: './nouveau-module.component.html',
  styleUrls: ['./nouveau-module.component.sass']
})
export class NouveauModuleComponent implements OnInit{
  moduleForm: FormGroup;
  module !: ModuleInterface
  titleForm: string = "Nouveau module";
  isConfirmLoading = false;
  moduleToUpdate!: ModuleInterface;
  constructor(private fb: FormBuilder,
              private modalRef : NzModalRef,
              private moduleService: ModuleService,
              private notify: NotifService) {

    this.moduleForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      sequence: [''],
      image: [''],
    });

  }

  ngOnInit() {
    try {
      const moduleCode: string = <string>this.modalRef.getConfig().nzData;

      if (moduleCode)
        this.loadModuleForUpdate(moduleCode);
    } catch (s) {
      console.error(s)
    }

  }

  enregistrerModule() {
    if (this.moduleForm.valid) {
      this.isConfirmLoading = true;
      const moduleData = this.moduleForm.value;
      let moduleForm = <ModuleInterface>this.createModuleForm(moduleData)

      if (this.moduleToUpdate) {
        this.updateModule(moduleForm);
        return;
      }
      this.moduleService.save(moduleForm).subscribe({
        next : res1 => {
          this.module = res1.reponse;
          console.log(res1);
          this.notify.snackMessage(`Le module ${moduleForm.code}  a été ajouté`,
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

      this.module = moduleData

    } else {
      this.notify.snackMessage(`Certains champs sont mal renseignés `, 3000, "error");
    }
  }


  createModuleForm(formData: any): ModuleInterface {
    return {

      code: formData.code,
      description: formData.description,
      sequence: formData.sequence,
      image: formData.image,
      supprime: false

    };
  }

  private loadModuleForUpdate(code: string) {

    this.titleForm = 'Modifier Module';
    this.moduleService.getModuleByCode(code).subscribe({
      next: module => {
        this.moduleToUpdate = module.reponse;

        this.moduleForm.controls['code'].setValue(module.reponse.code);
        this.moduleForm.controls['description'].setValue(module.reponse.description);
        this.moduleForm.controls['sequence'].setValue(module.reponse.sequence);
        this.moduleForm.controls['image'].setValue(module.reponse.image);

      }
    })
  }

  private updateModule(module: ModuleInterface) {
    console.log("Module à mettre à jour")
    console.log(module)
    this.moduleService.update(module).subscribe({

      next: res1 => {
        this.module =res1.reponse
        console.log(res1);
        this.notify.snackMessage(`Modification effectuée avec succés `, 3000, "success");
        this.moduleForm.reset();
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




}
