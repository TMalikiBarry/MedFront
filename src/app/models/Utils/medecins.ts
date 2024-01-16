import {PersonnelInterface} from "../personnel.interface";
import {EProfil} from "../profil.interface";
import {EStatusAcces} from "../acces.interface";

const medecin1: PersonnelInterface = {
  id: 2,
  personne: {
    supprime: false,
    dateCreation: null,
    dateModification: "2023-12-24T20:48:27.557194",
    id: 4,
    nom: "Mbaye",
    prenom: "Sidy",
    adresse: "Dakar",
    genre: "Masculin",
    hasAlreadyConnected: false,
    telephone: "777984988",
    email: "seynabou.ndiaye@intoucgroup.net",
    datenaissance: "1999-12-13",
    numeroCNI: "2758199402028",
    numeroPassport: null,
    age: "30",
    otp: null,
    dategenerationOTP: null,
    dateValidationOTP: null,
    acces: {
    id: 4,
      login: "admin1",
      password: "$2a$10$7tZxso/Ap81cwRl/vr40wuJUipCTGRFQ0T03cntDCqsrxafdUEEMS",
      oldPassword: null,
      status: EStatusAcces.ACTIF,
      dateLastPwdUpdate: null,
      hasAlreadyConnected: null,
      logActions: [],
      profil: {
      supprime: false,
        dateCreation: "2023-12-24T20:48:27.48334",
        dateModification: "2023-12-24T20:48:27.48334",
        id: 5,
        libelle: "INFIRMIER",
        code: EProfil.INFIRMIER,
        welcomeBookmark: "inf",
        actions: []
    },
      supprime: false,
      dateCreation: null,
      dateModification: "2023-12-24T20:48:27.539963"
  }
},
  titre: {
    code: "RECEPTION",
    libelle: "Reception",
    supprim: null
  },
  pole: null
};

export const listMedecins: PersonnelInterface[] = [medecin1];
