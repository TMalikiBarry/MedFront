import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NotifService} from "../../../../services/notification/notif.service";
import {ModuleService} from "../../../../services/module/module.service";
import {ModuleInterface} from "../../../../models/module.interface";
import {HttpErrorResponse} from "@angular/common/http";

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
  codeAlreadyExists = false;
  isEditMode: boolean = false;
  constructor(private fb: FormBuilder,
              private modalRef : NzModalRef,
              private moduleService: ModuleService,
              private notify: NotifService) {

    this.moduleForm = this.fb.group({
      code: ['', Validators.required],
      bookmark: ['', Validators.required],
      description: [''],
      sequence: [''],
      image: [''],
    });

  }

  ngOnInit() {
    try {
      const moduleCode: string = <string>this.modalRef.getConfig().nzData;

      if (moduleCode)
        this.isEditMode =true;
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
          console.log("reponse "+res1.reponse);
          console.log(res1);

          this.notify.snackMessage(`Le module ${moduleForm.code}  a été ajouté`,
            3000, "success");
          this.modalRef.close(res1.reponse.code);
        },
        error: (error: HttpErrorResponse) => {
          console.log("LOG "+error)
          console.log("classe "+error.error)
           console.log("Status " +error.status);
          this.isConfirmLoading = false;
          if (error.status == 409) {
            this.codeAlreadyExists = true;
            return;
          }
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
      supprime: false,
      bookmark: formData.bookmark

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
        this.moduleForm.controls['bookmark'].setValue(module.reponse.bookmark);
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
