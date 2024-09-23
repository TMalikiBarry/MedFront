import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NotifService} from "src/app/services/notification/notif.service";
import {ActionInterface, httpVerbMapping} from "src/app/models/action.interface";
import {ActionService} from "src/app/services/action/action.service";
import {FonctionnaliteInterface} from "../../../../models/fonctionnalite.interface";
import {NouvelleFonctionnaliteComponent} from "../nouvelle-fonctionnalite/nouvelle-fonctionnalite.component";

@Component({
    selector: 'app-action-form-dialog',
    templateUrl: './action-form-dialog.component.html',
    styleUrls: ['./action-form-dialog.component.sass']
})
export class ActionFormDialogComponent implements OnInit {

    titleForm = "Nouvelle action";
    formDesc = "Veuillez renseigner ce formulaire pour ajouter une action";
    btnText = "Enregistrer";
    isConfirmLoading = false;

    data: any;
    updatedAction!: ActionInterface;

    listOfFonctionnalite!: FonctionnaliteInterface[];

    actionForm: FormGroup = this.fb.group({
        code: [{value: '', disabled: true}, Validators.required],
        httpVerb: ['', Validators.required],
        fonctionnalite: ['', Validators.required],
        description: ['']
    })

    constructor(private modal: NzModalRef,
                private api: ActionService,
                private notification: NotifService,
                private modalService: NzModalService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.loadFonctionnalite();
        this.data = this.modal.getConfig().nzData
        //console.log(this.data)
        if (this.data) {
            if (this.data.context === 'PUT_ACTION') {
                this.titleForm = 'Modifier Action - ' + this.data.code
                this.formDesc = this.formDesc.replace('ajouter une', 'modifier l\'');
                this.updatedAction = this.data;
                this.fillTheForm();

            }
        }
    }

    handleCancel(message?: any) {
        this.modal.close(message);
    }

    handleOK() {
        this.isConfirmLoading = true;
        // console.dir(this.actionForm.getRawValue());
        const formData = this.actionForm.getRawValue();

        const action = this.createFromForm(formData);

        if (this.updatedAction) {
            action.dateCreation = this.updatedAction.dateCreation;
            action.supprime = this.updatedAction.supprime;

            this.update(action);
        } else {
            this.api.save(action).subscribe(
                {
                    next: value => {
                        this.handleCancel(value);
                        this.notification.snackMessage(`L'action, ${action.code}, a étée créée avec succès`,
                            3000, 'success');
                    },
                    error: (error) => {
                        this.isConfirmLoading = false;
                        if (error.status == 401)
                            this.handleCancel();
                    },
                    complete: () => {
                        this.isConfirmLoading = false
                    }
                }
            )
        }

    }

    loadFonctionnalite(): void {
        this.api.getAllFoncte().subscribe(
            response => {
                this.listOfFonctionnalite = response.reponse as FonctionnaliteInterface[];
            }
        )
    }

    createFromForm(formData: any): ActionInterface {

        const {code, description, httpVerb} = formData

        const fonc_te = this.listOfFonctionnalite.find(f => f.code == formData.fonctionnalite)!;

        return {
            code,
            httpVerb,
            description,
            fonctionnalite: fonc_te
        }

    }

    setCodeFormInput() {
        let fCode: string = this.actionForm.controls['fonctionnalite'].value ?? '';
        let httpVerb: string = this.actionForm.controls['httpVerb'].value ?? '';
        const code = `${httpVerb}_${fCode.toUpperCase()}`.replace(/\s/g, '_');
        this.actionForm.controls['code'].setValue(code);
    }

    getTheHTTPVerb(event: Event) {
        this.setCodeFormInput();
        console.dir(event);
    }

    getTheFonctionnalite(event: Event) {
        this.setCodeFormInput();
    }

    getHttpVerbOptions(): { key: string, label: string }[] {
        return Object.keys(httpVerbMapping).map(key => ({
            key,
            label: httpVerbMapping[key]
        }));
    }

    addNew(): void {
        this.modalService.create({
            nzContent: NouvelleFonctionnaliteComponent,
            nzWidth: 700,
            nzClosable: false,
            nzCentered: true,
        }).afterClose.subscribe(
            (result) => {
              if (result && result.code) {
                this.loadFonctionnalite();
                this.actionForm.controls['fonctionnalite'].setValue(result.code);
              }
                // this.getGraphData(this.isLastWeek);
            }
        );
    }

    private fillTheForm() {
        this.actionForm.controls['code'].setValue(this.updatedAction.code);
        this.actionForm.controls['httpVerb'].setValue(this.updatedAction.httpVerb);
        this.actionForm.controls['fonctionnalite'].setValue(this.updatedAction.fonctionnalite.code);
        if (this.updatedAction.description) this.actionForm.controls['description'].setValue(this.updatedAction.description);

        this.actionForm.controls['httpVerb'].disable();
        this.actionForm.controls['fonctionnalite'].disable();
    }

    private update(action: ActionInterface) {
        this.api.update(action).subscribe(
            {
                next: value => {
                    this.handleCancel(value);
                    this.notification.snackMessage(`L'action, ${action.code}, a étée modifiée avec succès`,
                        3000, 'success');
                },
                error: (error) => {
                    this.isConfirmLoading = false;
                    if (error.status == 401)
                        this.handleCancel();
                },
                complete: () => {
                    this.isConfirmLoading = false
                }
            }
        )
    }
}
