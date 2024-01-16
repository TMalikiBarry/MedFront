import {Component} from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import {RendezVousFormDialogComponent} from "../../dialogs/rendez-vous-form-dialog/rendez-vous-form-dialog.component";
import {DetailRendezVousComponent} from "../../dialogs/detail-rendez-vous/detail-rendez-vous.component";

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.sass']
})
export class RendezVousComponent {

  listDataMap = [
    {
      "supprime": false,
      "dateCreation": "2024-01-09T11:50:26.804259",
      "dateModification": "2024-01-09T11:50:26.804259",
      "id": 1,
      "dateRv": "2024-01-31T10:00:00",
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
          "nom": "Mbaye",
          "prenom": "Sidy",
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
          "nom": "Fall",
          "prenom": "Sidyy",
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
            "nom": "Mbaye",
            "prenom": "Sidy",
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
      "dateModification": "2024-01-06T11:50:26.804259",
      "id": 2,
      "dateRv": "2024-01-12T14:00:00",
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
          "prenom": "Babacar",
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
          "nom": "Seck",
          "prenom": "Babacar",
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
            "nom": "Barry",
            "prenom": "Thierno",
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
    },
    {
      "supprime": false,
      "dateCreation": "2024-01-09T11:50:26.804259",
      "dateModification": "2024-01-09T11:50:26.804259",
      "id": 3,
      "dateRv": "2024-01-25T14:00:00",
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
          "prenom": "B.",
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
          "nom": "Diop",
          "prenom": "Mactar",
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
            "nom": "Barry",
            "prenom": "Thierno",
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
    },
    {
      "supprime": false,
      "dateCreation": "2024-01-09T11:50:26.804259",
      "dateModification": "2024-01-09T15:50:26.804259",
      "id": 4,
      "dateRv": "2024-01-12T14:00:00",
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
          "prenom": "B.",
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
          "nom": "Sarr",
          "prenom": "Ibrahima",
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
            "nom": "Barry",
            "prenom": "Thierno",
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

  constructor(private modalService: NzModalService) {
  }

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  // getNbrRdvMonth(dateString : string){
  //   const dateObject: Date = new Date(dateString);
  //   switch (dateObject.getMonth()){
  //     case 1 :
  //       return
  //     case 2 :
  //       return
  //     case 3 :
  //       return
  //     case 4 :
  //       return
  //     case 5 :
  //       return
  //     case 6 :
  //       return
  //     case 7 :
  //       return
  //     case 8 :
  //       return
  //     case 9 :
  //       return
  //     case 10 :
  //       return
  //     case 11 :
  //       return
  //     case 12 :
  //       return
  //   }
  // }

  addRdv() {
    this.modalService.create({
      nzContent: RendezVousFormDialogComponent,
      nzClosable: false,
      nzWidth:'50rem'
    });
  }

  detailRdv(data : any) {
    this.modalService.create({
      nzContent: DetailRendezVousComponent,
      nzData : data,
      nzClosable: false,
      nzWidth:'50rem'
    });
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

  getHour(dateString : string): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getHours();
  }

  getMinutes(dateString : string): number {
    const dateObject: Date = new Date(dateString);
    return dateObject.getMinutes();
  }
}
