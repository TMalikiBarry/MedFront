import {Component} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {RendezVousFormDialogComponent} from "../../dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component";
import {Service} from "../../../../models/Utils/constants";
import {PrestationInterface} from "../../../../models/prestation.interface";
import {PrestationFormDialogComponent} from "../../dialogs/prestation-form-dialog/prestation-form-dialog.component";
import {PatientInterface} from "../../../../models/patient.interface";
import {RendezVousService} from "../../../../services/rendez-vous/rendez-vous.service";
import {CliniqueServiceService} from "../../../../services/service/clinique-service.service";
import {DetailRdvPatientComponent} from "../../dialogs/detail-rdv-patient/detail-rdv-patient.component";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Page} from "../../../../models/pagination.interface";
import {RendezVousInterface} from "../../../../models/rendez-vous.interface";
import {NotifService} from "../../../../services/notification/notif.service";
import {DetailRendezVousComponent} from "../../dialogs/detail-rendez-vous/detail-rendez-vous.component";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.sass']
})
export class RendezVousComponent {

  // listDataMap = [
  //   {
  //     "supprime": false,
  //     "dateCreation": "2024-01-09T11:50:26.804259",
  //     "dateModification": "2024-01-09T11:50:26.804259",
  //     "id": 1,
  //     "dateRv": "2024-01-31T10:00:00",
  //     "statut": null,
  //     "duree": 30.0,
  //     "remarques": "doit venir avec des gangs",
  //     "rappels": "",
  //     "personnel": {
  //       "id": 2,
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": null,
  //         "dateModification": "2023-12-24T20:48:27.557194",
  //         "id": 4,
  //         "nom": "Mbaye",
  //         "prenom": "Sidy",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "777984988",
  //         "email": "seynabou.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": {
  //           "id": 4,
  //           "login": "admin1",
  //           "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //           "oldPassword": null,
  //           "status": "ACTIF",
  //           "dateLastPwdUpdate": null,
  //           "hasAlreadyConnected": null,
  //           "logActions": [],
  //           "profil": {
  //             "supprime": false,
  //             "dateCreation": "2023-12-24T20:48:27.48334",
  //             "dateModification": "2023-12-24T20:48:27.48334",
  //             "id": 5,
  //             "libelle": "INFIRMIER",
  //             "code": "INFIRMIER",
  //             "welcomeBookmark": "inf",
  //             "actions": []
  //           },
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.539963"
  //         }
  //       },
  //       "titre": {
  //         "code": "RECEPTION",
  //         "libelle": "Reception",
  //         "supprim": null
  //       },
  //       "pole": null
  //     },
  //     "patient": {
  //       "supprime": false,
  //       "dateCreation": "2023-12-26T12:00:25.533705",
  //       "dateModification": "2023-12-26T12:00:25.533705",
  //       "id": 13,
  //       "groupeSanguin": "C+",
  //       "donneurOrgane": false,
  //       "contactEnCasUrgent": "777984099",
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": "2023-12-26T12:00:25.534053",
  //         "dateModification": "2023-12-26T12:00:25.534053",
  //         "id": 11,
  //         "nom": "Fall",
  //         "prenom": "Sidyy",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "777984988",
  //         "email": "seynabou.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": null
  //       },
  //       "personnel": {
  //         "id": 2,
  //         "personne": {
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.557194",
  //           "id": 4,
  //           "nom": "Mbaye",
  //           "prenom": "Sidy",
  //           "adresse": "Dakar",
  //           "genre": "Masculin",
  //           "hasAlreadyConnected": false,
  //           "telephone": "777984988",
  //           "email": "seynabou.ndiaye@intoucgroup.net",
  //           "datenaissance": "1999-12-13",
  //           "numeroCNI": "2758199402028",
  //           "numeroPassport": null,
  //           "age": "30",
  //           "otp": null,
  //           "dategenerationOTP": null,
  //           "dateValidationOTP": null,
  //           "acces": {
  //             "id": 4,
  //             "login": "admin1",
  //             "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //             "oldPassword": null,
  //             "status": "ACTIF",
  //             "dateLastPwdUpdate": null,
  //             "hasAlreadyConnected": null,
  //             "logActions": [],
  //             "profil": {
  //               "supprime": false,
  //               "dateCreation": "2023-12-24T20:48:27.48334",
  //               "dateModification": "2023-12-24T20:48:27.48334",
  //               "id": 5,
  //               "libelle": "INFIRMIER",
  //               "code": "INFIRMIER",
  //               "welcomeBookmark": "inf",
  //               "actions": []
  //             },
  //             "supprime": false,
  //             "dateCreation": null,
  //             "dateModification": "2023-12-24T20:48:27.539963"
  //           }
  //         },
  //         "titre": {
  //           "code": "RECEPTION",
  //           "libelle": "Reception",
  //           "supprim": null
  //         },
  //         "pole": null
  //       }
  //     },
  //     "service": {
  //       "id": 1,
  //       "nom": "RADIOGRAMME TONALE",
  //       "description": "RADIOGRAMME",
  //       "couleur": null,
  //       "equipement": null,
  //       "pole": {
  //         "id": 2,
  //         "code": "ORL",
  //         "dateCreation": null,
  //         "nom": "ORL",
  //         "supprime": false,
  //         "description": "ORL ",
  //         "localisation": null,
  //         "horaire": null,
  //         "reponsable": null,
  //         "equipement": null,
  //         "clinique": {
  //           "code": "ALHAZAR",
  //           "nom": "ALHAZAR",
  //           "logo": null,
  //           "codeCouleur": null,
  //           "adressse": "Dakar",
  //           "urlSiteWeb": null,
  //           "datecreation": null,
  //           "supprime": false,
  //           "solde": null,
  //           "dateFoundation": null,
  //           "equipementsGeneraux": null
  //         }
  //       }
  //     }
  //   },
  //   {
  //     "supprime": false,
  //     "dateCreation": "2024-01-09T11:50:26.804259",
  //     "dateModification": "2024-01-06T11:50:26.804259",
  //     "id": 2,
  //     "dateRv": "2024-01-12T14:00:00",
  //     "statut": null,
  //     "duree": 30.0,
  //     "remarques": "doit venir avec des gangs",
  //     "rappels": "",
  //     "personnel": {
  //       "id": 2,
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": null,
  //         "dateModification": "2023-12-24T20:48:27.557194",
  //         "id": 4,
  //         "nom": "Adje",
  //         "prenom": "Babacar",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "778591879",
  //         "email": "babs.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": {
  //           "id": 4,
  //           "login": "admin1",
  //           "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //           "oldPassword": null,
  //           "status": "ACTIF",
  //           "dateLastPwdUpdate": null,
  //           "hasAlreadyConnected": null,
  //           "logActions": [],
  //           "profil": {
  //             "supprime": false,
  //             "dateCreation": "2023-12-24T20:48:27.48334",
  //             "dateModification": "2023-12-24T20:48:27.48334",
  //             "id": 5,
  //             "libelle": "INFIRMIER",
  //             "code": "INFIRMIER",
  //             "welcomeBookmark": "inf",
  //             "actions": []
  //           },
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.539963"
  //         }
  //       },
  //       "titre": {
  //         "code": "RECEPTION",
  //         "libelle": "Reception",
  //         "supprim": null
  //       },
  //       "pole": null
  //     },
  //     "patient": {
  //       "supprime": false,
  //       "dateCreation": "2023-12-26T12:00:25.533705",
  //       "dateModification": "2023-12-26T12:00:25.533705",
  //       "id": 13,
  //       "groupeSanguin": "C+",
  //       "donneurOrgane": false,
  //       "contactEnCasUrgent": "777984099",
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": "2023-12-26T12:00:25.534053",
  //         "dateModification": "2023-12-26T12:00:25.534053",
  //         "id": 11,
  //         "nom": "Seck",
  //         "prenom": "Babacar",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "777984988",
  //         "email": "seynabou.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": null
  //       },
  //       "personnel": {
  //         "id": 2,
  //         "personne": {
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.557194",
  //           "id": 4,
  //           "nom": "Barry",
  //           "prenom": "Thierno",
  //           "adresse": "Dakar",
  //           "genre": "Masculin",
  //           "hasAlreadyConnected": false,
  //           "telephone": "777984988",
  //           "email": "thierno.ndiaye@intoucgroup.net",
  //           "datenaissance": "1999-12-13",
  //           "numeroCNI": "2758199402028",
  //           "numeroPassport": null,
  //           "age": "30",
  //           "otp": null,
  //           "dategenerationOTP": null,
  //           "dateValidationOTP": null,
  //           "acces": {
  //             "id": 4,
  //             "login": "admin1",
  //             "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //             "oldPassword": null,
  //             "status": "ACTIF",
  //             "dateLastPwdUpdate": null,
  //             "hasAlreadyConnected": null,
  //             "logActions": [],
  //             "profil": {
  //               "supprime": false,
  //               "dateCreation": "2023-12-24T20:48:27.48334",
  //               "dateModification": "2023-12-24T20:48:27.48334",
  //               "id": 5,
  //               "libelle": "INFIRMIER",
  //               "code": "INFIRMIER",
  //               "welcomeBookmark": "inf",
  //               "actions": []
  //             },
  //             "supprime": false,
  //             "dateCreation": null,
  //             "dateModification": "2023-12-24T20:48:27.539963"
  //           }
  //         },
  //         "titre": {
  //           "code": "RECEPTION",
  //           "libelle": "Reception",
  //           "supprim": null
  //         },
  //         "pole": null
  //       }
  //     },
  //     "service": {
  //       "id": 1,
  //       "nom": "RADIOGRAMME TONALE",
  //       "description": "RADIOGRAMME",
  //       "couleur": null,
  //       "equipement": null,
  //       "pole": {
  //         "id": 2,
  //         "code": "ORL",
  //         "dateCreation": null,
  //         "nom": "ORL",
  //         "supprime": false,
  //         "description": "ORL ",
  //         "localisation": null,
  //         "horaire": null,
  //         "reponsable": null,
  //         "equipement": null,
  //         "clinique": {
  //           "code": "ALHAZAR",
  //           "nom": "ALHAZAR",
  //           "logo": null,
  //           "codeCouleur": null,
  //           "adressse": "Dakar",
  //           "urlSiteWeb": null,
  //           "datecreation": null,
  //           "supprime": false,
  //           "solde": null,
  //           "dateFoundation": null,
  //           "equipementsGeneraux": null
  //         }
  //       }
  //     }
  //   },
  //   {
  //     "supprime": false,
  //     "dateCreation": "2024-01-09T11:50:26.804259",
  //     "dateModification": "2024-01-09T11:50:26.804259",
  //     "id": 3,
  //     "dateRv": "2024-01-25T14:00:00",
  //     "statut": null,
  //     "duree": 30.0,
  //     "remarques": "doit venir avec des gangs",
  //     "rappels": "",
  //     "personnel": {
  //       "id": 2,
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": null,
  //         "dateModification": "2023-12-24T20:48:27.557194",
  //         "id": 4,
  //         "nom": "Adje",
  //         "prenom": "B.",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "778591879",
  //         "email": "babs.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": {
  //           "id": 4,
  //           "login": "admin1",
  //           "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //           "oldPassword": null,
  //           "status": "ACTIF",
  //           "dateLastPwdUpdate": null,
  //           "hasAlreadyConnected": null,
  //           "logActions": [],
  //           "profil": {
  //             "supprime": false,
  //             "dateCreation": "2023-12-24T20:48:27.48334",
  //             "dateModification": "2023-12-24T20:48:27.48334",
  //             "id": 5,
  //             "libelle": "INFIRMIER",
  //             "code": "INFIRMIER",
  //             "welcomeBookmark": "inf",
  //             "actions": []
  //           },
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.539963"
  //         }
  //       },
  //       "titre": {
  //         "code": "RECEPTION",
  //         "libelle": "Reception",
  //         "supprim": null
  //       },
  //       "pole": null
  //     },
  //     "patient": {
  //       "supprime": false,
  //       "dateCreation": "2023-12-26T12:00:25.533705",
  //       "dateModification": "2023-12-26T12:00:25.533705",
  //       "id": 13,
  //       "groupeSanguin": "C+",
  //       "donneurOrgane": false,
  //       "contactEnCasUrgent": "777984099",
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": "2023-12-26T12:00:25.534053",
  //         "dateModification": "2023-12-26T12:00:25.534053",
  //         "id": 11,
  //         "nom": "Diop",
  //         "prenom": "Mactar",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "777984988",
  //         "email": "seynabou.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": null
  //       },
  //       "personnel": {
  //         "id": 2,
  //         "personne": {
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.557194",
  //           "id": 4,
  //           "nom": "Barry",
  //           "prenom": "Thierno",
  //           "adresse": "Dakar",
  //           "genre": "Masculin",
  //           "hasAlreadyConnected": false,
  //           "telephone": "777984988",
  //           "email": "thierno.ndiaye@intoucgroup.net",
  //           "datenaissance": "1999-12-13",
  //           "numeroCNI": "2758199402028",
  //           "numeroPassport": null,
  //           "age": "30",
  //           "otp": null,
  //           "dategenerationOTP": null,
  //           "dateValidationOTP": null,
  //           "acces": {
  //             "id": 4,
  //             "login": "admin1",
  //             "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //             "oldPassword": null,
  //             "status": "ACTIF",
  //             "dateLastPwdUpdate": null,
  //             "hasAlreadyConnected": null,
  //             "logActions": [],
  //             "profil": {
  //               "supprime": false,
  //               "dateCreation": "2023-12-24T20:48:27.48334",
  //               "dateModification": "2023-12-24T20:48:27.48334",
  //               "id": 5,
  //               "libelle": "INFIRMIER",
  //               "code": "INFIRMIER",
  //               "welcomeBookmark": "inf",
  //               "actions": []
  //             },
  //             "supprime": false,
  //             "dateCreation": null,
  //             "dateModification": "2023-12-24T20:48:27.539963"
  //           }
  //         },
  //         "titre": {
  //           "code": "RECEPTION",
  //           "libelle": "Reception",
  //           "supprim": null
  //         },
  //         "pole": null
  //       }
  //     },
  //     "service": {
  //       "id": 1,
  //       "nom": "RADIOGRAMME TONALE",
  //       "description": "RADIOGRAMME",
  //       "couleur": null,
  //       "equipement": null,
  //       "pole": {
  //         "id": 2,
  //         "code": "ORL",
  //         "dateCreation": null,
  //         "nom": "ORL",
  //         "supprime": false,
  //         "description": "ORL ",
  //         "localisation": null,
  //         "horaire": null,
  //         "reponsable": null,
  //         "equipement": null,
  //         "clinique": {
  //           "code": "ALHAZAR",
  //           "nom": "ALHAZAR",
  //           "logo": null,
  //           "codeCouleur": null,
  //           "adressse": "Dakar",
  //           "urlSiteWeb": null,
  //           "datecreation": null,
  //           "supprime": false,
  //           "solde": null,
  //           "dateFoundation": null,
  //           "equipementsGeneraux": null
  //         }
  //       }
  //     }
  //   },
  //   {
  //     "supprime": false,
  //     "dateCreation": "2024-01-09T11:50:26.804259",
  //     "dateModification": "2024-01-09T15:50:26.804259",
  //     "id": 4,
  //     "dateRv": "2024-01-12T14:00:00",
  //     "statut": null,
  //     "duree": 30.0,
  //     "remarques": "doit venir avec des gangs",
  //     "rappels": "",
  //     "personnel": {
  //       "id": 2,
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": null,
  //         "dateModification": "2023-12-24T20:48:27.557194",
  //         "id": 4,
  //         "nom": "Adje",
  //         "prenom": "B.",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "778591879",
  //         "email": "babs.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": {
  //           "id": 4,
  //           "login": "admin1",
  //           "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //           "oldPassword": null,
  //           "status": "ACTIF",
  //           "dateLastPwdUpdate": null,
  //           "hasAlreadyConnected": null,
  //           "logActions": [],
  //           "profil": {
  //             "supprime": false,
  //             "dateCreation": "2023-12-24T20:48:27.48334",
  //             "dateModification": "2023-12-24T20:48:27.48334",
  //             "id": 5,
  //             "libelle": "INFIRMIER",
  //             "code": "INFIRMIER",
  //             "welcomeBookmark": "inf",
  //             "actions": []
  //           },
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.539963"
  //         }
  //       },
  //       "titre": {
  //         "code": "RECEPTION",
  //         "libelle": "Reception",
  //         "supprim": null
  //       },
  //       "pole": null
  //     },
  //     "patient": {
  //       "supprime": false,
  //       "dateCreation": "2023-12-26T12:00:25.533705",
  //       "dateModification": "2023-12-26T12:00:25.533705",
  //       "id": 13,
  //       "groupeSanguin": "C+",
  //       "donneurOrgane": false,
  //       "contactEnCasUrgent": "777984099",
  //       "personne": {
  //         "supprime": false,
  //         "dateCreation": "2023-12-26T12:00:25.534053",
  //         "dateModification": "2023-12-26T12:00:25.534053",
  //         "id": 11,
  //         "nom": "Sarr",
  //         "prenom": "Ibrahima",
  //         "adresse": "Dakar",
  //         "genre": "Masculin",
  //         "hasAlreadyConnected": false,
  //         "telephone": "777984988",
  //         "email": "seynabou.ndiaye@intoucgroup.net",
  //         "datenaissance": "1999-12-13",
  //         "numeroCNI": "2758199402028",
  //         "numeroPassport": null,
  //         "age": "30",
  //         "otp": null,
  //         "dategenerationOTP": null,
  //         "dateValidationOTP": null,
  //         "acces": null
  //       },
  //       "personnel": {
  //         "id": 2,
  //         "personne": {
  //           "supprime": false,
  //           "dateCreation": null,
  //           "dateModification": "2023-12-24T20:48:27.557194",
  //           "id": 4,
  //           "nom": "Barry",
  //           "prenom": "Thierno",
  //           "adresse": "Dakar",
  //           "genre": "Masculin",
  //           "hasAlreadyConnected": false,
  //           "telephone": "777984988",
  //           "email": "thierno.ndiaye@intoucgroup.net",
  //           "datenaissance": "1999-12-13",
  //           "numeroCNI": "2758199402028",
  //           "numeroPassport": null,
  //           "age": "30",
  //           "otp": null,
  //           "dategenerationOTP": null,
  //           "dateValidationOTP": null,
  //           "acces": {
  //             "id": 4,
  //             "login": "admin1",
  //             "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
  //             "oldPassword": null,
  //             "status": "ACTIF",
  //             "dateLastPwdUpdate": null,
  //             "hasAlreadyConnected": null,
  //             "logActions": [],
  //             "profil": {
  //               "supprime": false,
  //               "dateCreation": "2023-12-24T20:48:27.48334",
  //               "dateModification": "2023-12-24T20:48:27.48334",
  //               "id": 5,
  //               "libelle": "INFIRMIER",
  //               "code": "INFIRMIER",
  //               "welcomeBookmark": "inf",
  //               "actions": []
  //             },
  //             "supprime": false,
  //             "dateCreation": null,
  //             "dateModification": "2023-12-24T20:48:27.539963"
  //           }
  //         },
  //         "titre": {
  //           "code": "RECEPTION",
  //           "libelle": "Reception",
  //           "supprim": null
  //         },
  //         "pole": null
  //       }
  //     },
  //     "service": {
  //       "id": 1,
  //       "nom": "RADIOGRAMME TONALE",
  //       "description": "RADIOGRAMME",
  //       "couleur": null,
  //       "equipement": null,
  //       "pole": {
  //         "id": 2,
  //         "code": "ORL",
  //         "dateCreation": null,
  //         "nom": "ORL",
  //         "supprime": false,
  //         "description": "ORL ",
  //         "localisation": null,
  //         "horaire": null,
  //         "reponsable": null,
  //         "equipement": null,
  //         "clinique": {
  //           "code": "ALHAZAR",
  //           "nom": "ALHAZAR",
  //           "logo": null,
  //           "codeCouleur": null,
  //           "adressse": "Dakar",
  //           "urlSiteWeb": null,
  //           "datecreation": null,
  //           "supprime": false,
  //           "solde": null,
  //           "dateFoundation": null,
  //           "equipementsGeneraux": null
  //         }
  //       }
  //     }
  //   }
  // ]


  listDataMapToday = [
    {
      "supprime": false,
      "dateCreation": "2024-01-09T11:50:26.804259",
      "dateModification": "2024-01-09T11:50:26.804259",
      "id": 1,
      "dateRv": "2024-02-01T14:00:00",
      "statut": null,
      "duree": 30.0,
      "remarques": "doit venir avec des gangs",
      "rappels": "",
      "personnel": {
        "id": 2,
        "personne": {
          "supprime": false,
          "dateCreation": null,
          "dateModification": "2023-12-24T20:48:27.557194",
          "id": 4,
          "nom": "Seck",
          "prenom": "Fatoumata",
          "adresse": "Dakar",
          "genre": "Feminin",
          "hasAlreadyConnected": false,
          "telephone": "777984988",
          "email": "seynabou.ndiaye@intoucgroup.net",
          "datenaissance": "1999-12-13",
          "numeroCNI": "2758199402028",
          "numeroPassport": null,
          "age": "30",
          "otp": null,
          "dategenerationOTP": null,
          "dateValidationOTP": null,
          "acces": {
            "id": 4,
            "login": "admin1",
            "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
            "oldPassword": null,
            "status": "ACTIF",
            "dateLastPwdUpdate": null,
            "hasAlreadyConnected": null,
            "logActions": [],
            "profil": {
              "supprime": false,
              "dateCreation": "2023-12-24T20:48:27.48334",
              "dateModification": "2023-12-24T20:48:27.48334",
              "id": 5,
              "libelle": "INFIRMIER",
              "code": "INFIRMIER",
              "welcomeBookmark": "inf",
              "actions": []
            },
            "supprime": false,
            "dateCreation": null,
            "dateModification": "2023-12-24T20:48:27.539963"
          }
        },
        "titre": {
          "code": "RECEPTION",
          "libelle": "Reception",
          "supprim": null
        },
        "pole": null
      },
      "patient": {
        "supprime": false,
        "dateCreation": "2023-12-26T12:00:25.533705",
        "dateModification": "2023-12-26T12:00:25.533705",
        "id": 13,
        "groupeSanguin": "C+",
        "donneurOrgane": false,
        "contactEnCasUrgent": "777984099",
        "personne": {
          "supprime": false,
          "dateCreation": "2023-12-26T12:00:25.534053",
          "dateModification": "2023-12-26T12:00:25.534053",
          "id": 11,
          "nom": "Diop",
          "prenom": "Sadikh",
          "adresse": "Dakar",
          "genre": "Masculin",
          "hasAlreadyConnected": false,
          "telephone": "777984988",
          "email": "seynabou.ndiaye@intoucgroup.net",
          "datenaissance": "1999-12-13",
          "numeroCNI": "2758199402028",
          "numeroPassport": null,
          "age": "30",
          "otp": null,
          "dategenerationOTP": null,
          "dateValidationOTP": null,
          "acces": null
        },
        "personnel": {
          "id": 2,
          "personne": {
            "supprime": false,
            "dateCreation": null,
            "dateModification": "2023-12-24T20:48:27.557194",
            "id": 4,
            "nom": "Diallo",
            "prenom": "Seydina",
            "adresse": "Dakar",
            "genre": "Masculin",
            "hasAlreadyConnected": false,
            "telephone": "777984988",
            "email": "seynabou.ndiaye@intoucgroup.net",
            "datenaissance": "1999-12-13",
            "numeroCNI": "2758199402028",
            "numeroPassport": null,
            "age": "30",
            "otp": null,
            "dategenerationOTP": null,
            "dateValidationOTP": null,
            "acces": {
              "id": 4,
              "login": "admin1",
              "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
              "oldPassword": null,
              "status": "ACTIF",
              "dateLastPwdUpdate": null,
              "hasAlreadyConnected": null,
              "logActions": [],
              "profil": {
                "supprime": false,
                "dateCreation": "2023-12-24T20:48:27.48334",
                "dateModification": "2023-12-24T20:48:27.48334",
                "id": 5,
                "libelle": "INFIRMIER",
                "code": "INFIRMIER",
                "welcomeBookmark": "inf",
                "actions": []
              },
              "supprime": false,
              "dateCreation": null,
              "dateModification": "2023-12-24T20:48:27.539963"
            }
          },
          "titre": {
            "code": "RECEPTION",
            "libelle": "Reception",
            "supprim": null
          },
          "pole": null
        }
      },
      "service": {
        "id": 1,
        "nom": "RADIOGRAMME TONALE",
        "description": "RADIOGRAMME",
        "couleur": null,
        "equipement": null,
        "pole": {
          "id": 2,
          "code": "ORL",
          "dateCreation": null,
          "nom": "ORL",
          "supprime": false,
          "description": "ORL ",
          "localisation": null,
          "horaire": null,
          "reponsable": null,
          "equipement": null,
          "clinique": {
            "code": "ALHAZAR",
            "nom": "ALHAZAR",
            "logo": null,
            "codeCouleur": null,
            "adressse": "Dakar",
            "urlSiteWeb": null,
            "datecreation": null,
            "supprime": false,
            "solde": null,
            "dateFoundation": null,
            "equipementsGeneraux": null
          }
        }
      }
    },
    {
      "supprime": false,
      "dateCreation": "2024-01-09T11:50:26.804259",
      "dateModification": "2024-01-09T08:50:26.804259",
      "id": 2,
      "dateRv": "2024-02-01T14:00:00",
      "statut": null,
      "duree": 30.0,
      "remarques": "doit venir avec des gangs",
      "rappels": "",
      "personnel": {
        "id": 2,
        "personne": {
          "supprime": false,
          "dateCreation": null,
          "dateModification": "2023-12-24T20:48:27.557194",
          "id": 4,
          "nom": "Adje",
          "prenom": "Fallou",
          "adresse": "Dakar",
          "genre": "Masculin",
          "hasAlreadyConnected": false,
          "telephone": "778591879",
          "email": "babs.ndiaye@intoucgroup.net",
          "datenaissance": "1999-12-13",
          "numeroCNI": "2758199402028",
          "numeroPassport": null,
          "age": "30",
          "otp": null,
          "dategenerationOTP": null,
          "dateValidationOTP": null,
          "acces": {
            "id": 4,
            "login": "admin1",
            "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
            "oldPassword": null,
            "status": "ACTIF",
            "dateLastPwdUpdate": null,
            "hasAlreadyConnected": null,
            "logActions": [],
            "profil": {
              "supprime": false,
              "dateCreation": "2023-12-24T20:48:27.48334",
              "dateModification": "2023-12-24T20:48:27.48334",
              "id": 5,
              "libelle": "INFIRMIER",
              "code": "INFIRMIER",
              "welcomeBookmark": "inf",
              "actions": []
            },
            "supprime": false,
            "dateCreation": null,
            "dateModification": "2023-12-24T20:48:27.539963"
          }
        },
        "titre": {
          "code": "RECEPTION",
          "libelle": "Reception",
          "supprim": null
        },
        "pole": null
      },
      "patient": {
        "supprime": false,
        "dateCreation": "2023-12-26T12:00:25.533705",
        "dateModification": "2023-12-26T12:00:25.533705",
        "id": 13,
        "groupeSanguin": "C+",
        "donneurOrgane": false,
        "contactEnCasUrgent": "777984099",
        "personne": {
          "supprime": false,
          "dateCreation": "2023-12-26T12:00:25.534053",
          "dateModification": "2023-12-26T12:00:25.534053",
          "id": 11,
          "nom": "Sylla",
          "prenom": "Mamadou",
          "adresse": "Dakar",
          "genre": "Masculin",
          "hasAlreadyConnected": false,
          "telephone": "777984988",
          "email": "seynabou.ndiaye@intoucgroup.net",
          "datenaissance": "1999-12-13",
          "numeroCNI": "2758199402028",
          "numeroPassport": null,
          "age": "30",
          "otp": null,
          "dategenerationOTP": null,
          "dateValidationOTP": null,
          "acces": null
        },
        "personnel": {
          "id": 2,
          "personne": {
            "supprime": false,
            "dateCreation": null,
            "dateModification": "2023-12-24T20:48:27.557194",
            "id": 4,
            "nom": "Ba",
            "prenom": "Dieynaba",
            "adresse": "Dakar",
            "genre": "Feminin",
            "hasAlreadyConnected": false,
            "telephone": "777984988",
            "email": "thierno.ndiaye@intoucgroup.net",
            "datenaissance": "1999-12-13",
            "numeroCNI": "2758199402028",
            "numeroPassport": null,
            "age": "30",
            "otp": null,
            "dategenerationOTP": null,
            "dateValidationOTP": null,
            "acces": {
              "id": 4,
              "login": "admin1",
              "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
              "oldPassword": null,
              "status": "ACTIF",
              "dateLastPwdUpdate": null,
              "hasAlreadyConnected": null,
              "logActions": [],
              "profil": {
                "supprime": false,
                "dateCreation": "2023-12-24T20:48:27.48334",
                "dateModification": "2023-12-24T20:48:27.48334",
                "id": 5,
                "libelle": "INFIRMIER",
                "code": "INFIRMIER",
                "welcomeBookmark": "inf",
                "actions": []
              },
              "supprime": false,
              "dateCreation": null,
              "dateModification": "2023-12-24T20:48:27.539963"
            }
          },
          "titre": {
            "code": "RECEPTION",
            "libelle": "Reception",
            "supprim": null
          },
          "pole": null
        }
      },
      "service": {
        "id": 1,
        "nom": "RADIOGRAMME TONALE",
        "description": "RADIOGRAMME",
        "couleur": null,
        "equipement": null,
        "pole": {
          "id": 2,
          "code": "ORL",
          "dateCreation": null,
          "nom": "ORL",
          "supprime": false,
          "description": "ORL ",
          "localisation": null,
          "horaire": null,
          "reponsable": null,
          "equipement": null,
          "clinique": {
            "code": "ALHAZAR",
            "nom": "ALHAZAR",
            "logo": null,
            "codeCouleur": null,
            "adressse": "Dakar",
            "urlSiteWeb": null,
            "datecreation": null,
            "supprime": false,
            "solde": null,
            "dateFoundation": null,
            "equipementsGeneraux": null
          }
        }
      }
    },
    {
      "supprime": false,
      "dateCreation": "2024-01-09T11:50:26.804259",
      "dateModification": "2024-01-09T13:50:26.804259",
      "id": 3,
      "dateRv": "2024-02-01T14:00:00",
      "statut": null,
      "duree": 30.0,
      "remarques": "doit venir avec des gangs",
      "rappels": "",
      "personnel": {
        "id": 2,
        "personne": {
          "supprime": false,
          "dateCreation": null,
          "dateModification": "2023-12-24T20:48:27.557194",
          "id": 4,
          "nom": "Diatta",
          "prenom": "Abdou",
          "adresse": "Dakar",
          "genre": "Masculin",
          "hasAlreadyConnected": false,
          "telephone": "778591879",
          "email": "babs.ndiaye@intoucgroup.net",
          "datenaissance": "1999-12-13",
          "numeroCNI": "2758199402028",
          "numeroPassport": null,
          "age": "30",
          "otp": null,
          "dategenerationOTP": null,
          "dateValidationOTP": null,
          "acces": {
            "id": 4,
            "login": "admin1",
            "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
            "oldPassword": null,
            "status": "ACTIF",
            "dateLastPwdUpdate": null,
            "hasAlreadyConnected": null,
            "logActions": [],
            "profil": {
              "supprime": false,
              "dateCreation": "2023-12-24T20:48:27.48334",
              "dateModification": "2023-12-24T20:48:27.48334",
              "id": 5,
              "libelle": "INFIRMIER",
              "code": "INFIRMIER",
              "welcomeBookmark": "inf",
              "actions": []
            },
            "supprime": false,
            "dateCreation": null,
            "dateModification": "2023-12-24T20:48:27.539963"
          }
        },
        "titre": {
          "code": "RECEPTION",
          "libelle": "Reception",
          "supprim": null
        },
        "pole": null
      },
      "patient": {
        "supprime": false,
        "dateCreation": "2023-12-26T12:00:25.533705",
        "dateModification": "2023-12-26T12:00:25.533705",
        "id": 13,
        "groupeSanguin": "C+",
        "donneurOrgane": false,
        "contactEnCasUrgent": "777984099",
        "personne": {
          "supprime": false,
          "dateCreation": "2023-12-26T12:00:25.534053",
          "dateModification": "2023-12-26T12:00:25.534053",
          "id": 11,
          "nom": "Dia",
          "prenom": "Bachir",
          "adresse": "Dakar",
          "genre": "Masculin",
          "hasAlreadyConnected": false,
          "telephone": "777984988",
          "email": "seynabou.ndiaye@intoucgroup.net",
          "datenaissance": "1999-12-13",
          "numeroCNI": "2758199402028",
          "numeroPassport": null,
          "age": "30",
          "otp": null,
          "dategenerationOTP": null,
          "dateValidationOTP": null,
          "acces": null
        },
        "personnel": {
          "id": 2,
          "personne": {
            "supprime": false,
            "dateCreation": null,
            "dateModification": "2023-12-24T20:48:27.557194",
            "id": 4,
            "nom": "Fall",
            "prenom": "Cheikh",
            "adresse": "Dakar",
            "genre": "Masculin",
            "hasAlreadyConnected": false,
            "telephone": "777984988",
            "email": "thierno.ndiaye@intoucgroup.net",
            "datenaissance": "1999-12-13",
            "numeroCNI": "2758199402028",
            "numeroPassport": null,
            "age": "30",
            "otp": null,
            "dategenerationOTP": null,
            "dateValidationOTP": null,
            "acces": {
              "id": 4,
              "login": "admin1",
              "password": "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
              "oldPassword": null,
              "status": "ACTIF",
              "dateLastPwdUpdate": null,
              "hasAlreadyConnected": null,
              "logActions": [],
              "profil": {
                "supprime": false,
                "dateCreation": "2023-12-24T20:48:27.48334",
                "dateModification": "2023-12-24T20:48:27.48334",
                "id": 5,
                "libelle": "INFIRMIER",
                "code": "INFIRMIER",
                "welcomeBookmark": "inf",
                "actions": []
              },
              "supprime": false,
              "dateCreation": null,
              "dateModification": "2023-12-24T20:48:27.539963"
            }
          },
          "titre": {
            "code": "RECEPTION",
            "libelle": "Reception",
            "supprim": null
          },
          "pole": null
        }
      },
      "service": {
        "id": 1,
        "nom": "RADIOGRAMME TONALE",
        "description": "RADIOGRAMME",
        "couleur": null,
        "equipement": null,
        "pole": {
          "id": 2,
          "code": "ORL",
          "dateCreation": null,
          "nom": "ORL",
          "supprime": false,
          "description": "ORL ",
          "localisation": null,
          "horaire": null,
          "reponsable": null,
          "equipement": null,
          "clinique": {
            "code": "ALHAZAR",
            "nom": "ALHAZAR",
            "logo": null,
            "codeCouleur": null,
            "adressse": "Dakar",
            "urlSiteWeb": null,
            "datecreation": null,
            "supprime": false,
            "solde": null,
            "dateFoundation": null,
            "equipementsGeneraux": null
          }
        }
      }
    }
  ]

  date: any;
  filtrePatient: any;
  serviceId!: number;
  listOfService!: Service[];

  loading = true;
  total = 1;
  pageSize = 5;
  pageIndex = 1;
  paginatedData!: Page<RendezVousInterface>;
  prestationsList: PrestationInterface[] = [];

  // Chemin vers l'icône dans le dossier des actifs
  customIconPath = 'assets/icon/calendar_small.svg';

  constructor(private modalService: NzModalService,
              private api: RendezVousService,
              private notification: NotifService,
              private apiService : CliniqueServiceService) {
  }

  ngOnInit(): void {
    this.getAllService();
    //this.getAllRdv();
    this.getRdvByPage();
  }

  private getAllService() {
    this.apiService.getAllService().subscribe({
      next : res => {
        this.listOfService = res.reponse
      }
    })
  }
  getAllRdv() {
    this.api.getAllRdv().subscribe({
      next: response => {
        console.log("Liste des rdv ", response);
        this.listDataMapToday = response
      }
    })
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  showEvent(event: any) {
    console.log(event)
  }


  addNewPrestation() {
    this.modalService.create({
      nzContent: PrestationFormDialogComponent,
      nzClosable: false,
    }).afterClose.subscribe(
      ()=>{
        this.getAllRdv()
      }
    );

  }

  getPatientName(patient: PatientInterface):string {
    return `${patient.personne.prenom} ${patient.personne.nom}`
  }

  // TODO METTRE DANS UN PIPE POUR GENERALISER SON UTILISATION DANS LES AUTRES COMPONENTS
  formatDateString(inputDateStr: Date | string): string {
    const inputDate = new Date(inputDateStr);
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // getMonth() renvoie un mois indexé à 0
    const year = inputDate.getFullYear();
    const hour = inputDate.getHours().toString().padStart(2, '0');
    const minute = inputDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  addRdv() {
    const dialog = this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzClosable: false,
      nzWidth: '40rem'
    })
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
    });
  }

  detailRdv(data : any) {
    const dialog = this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzData : data,
      nzClosable: false,
      nzWidth:'50rem'
    });
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
    })
  }

  getDayOfMonth(dateString : string): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getDate();
  }

  getMonthOfYear(dateString : string): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getMonth();
  }

  getYear(dateString : string):number {
    const dateObject : Date = new Date(dateString);
    return dateObject.getFullYear()
  }

  getHour(dateString: Date): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getHours();
  }

  getMinutes(dateString: Date): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getMinutes();
  }

  filtre() {
    let date = ''
    if(this.date){
      date = this.formatCustomDate(this.date)
    }
    this.api.getAllRdvPagination(0, 5,this.filtrePatient, this.filtrePatient,this.filtrePatient,this.serviceId,date).subscribe({
      next: response => {
        console.log("Liste des rdv filter page ", response);
        console.log(response)
        this.paginatedData = response;
        this.prestationsList = this.paginatedData.content;
        this.pageSize = this.paginatedData.pageable.pageSize;
        this.pageIndex = this.paginatedData.pageable.pageNumber + 1;
        this.total = this.paginatedData.totalElements;
        this.loading = false;
      }
    })
  }

  detailPatient(patient :any) {
    const dialog = this.modalService.create({
      nzContent: DetailRdvPatientComponent,
      nzData : patient,
      nzClosable: false,
      nzWidth:'50rem'
    });
    dialog.afterClose.subscribe(() => {
      this.getRdvByPage();
    })
  }

  getRdvByPage(page: number = 0, size: number = 5) {
    this.api.getAllRdvPagination(page, size).subscribe({
      next: response => {
        console.log("Liste des rdv page ", response);
        this.paginatedData = response;
        this.prestationsList = this.paginatedData.content;
        this.pageSize = this.paginatedData.pageable.pageSize;
        this.pageIndex = this.paginatedData.pageable.pageNumber + 1;
        this.total = this.paginatedData.totalElements;
        this.loading = false;
      }
    })
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(" onQueryParamsChange FUNCTIONS ", params);
    /*const { pageSize, pageIndex} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;*/
    this.getRdvByPage(params.pageIndex - 1, params.pageSize)
  }

  deleteRdv(id: any) {
    this.api.deleteRdv(id).subscribe({
      next : res =>{
        console.log(res);
        this.notification.snackMessage(`Rendez-vous mis supprimé avec succés`, 3000, 'success')

      }
    })
  }

  private formatCustomDate(inputDate: string): string {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}
