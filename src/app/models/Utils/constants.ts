export interface Service {
  id?: number;
  nom: string;
  cout?: number;
  description: string;
  couleur: string | null;
  equipement?: string | null;
  pole?: {
    id?: number,
    code?: string,
    dateCreation?: string | null,
    nom?: string,
    supprime?: boolean,
    description?: string,
    localisation?: string | null,
    horaire?: string | null,
    reponsable?: string | null,
    equipement?: string | null,
    clinique?: {
      code?: string,
      nom?: string,
      logo?: string | null,
      codeCouleur?: string | null,
      adressse?: string,
      urlSiteWeb?: string | null,
      datecreation?: string | null,
      supprime?: boolean,
      solde?: number | null,
      dateFoundation?: string| null,
      equipementsGeneraux?: string| null
    }
  };
}

const service0: Service = {
  id: 1,
  nom: "RADIOGRAMME TONALE",
  description: "RADIOGRAMME",
  couleur: null,
  equipement: null,
  pole: {
  id: 2,
    code: "ORL",
    dateCreation: null,
    nom: "ORL",
    supprime: false,
    description: "ORL ",
    localisation: null,
    horaire: null,
    reponsable: null,
    equipement: null,
    clinique: {
    code: "ALHAZAR",
      nom: "ALHAZAR",
      logo: null,
      codeCouleur: null,
      adressse: "Dakar",
      urlSiteWeb: null,
      datecreation: null,
      supprime: false,
      solde: null,
      dateFoundation: null,
      equipementsGeneraux: null
  }
}
};

const service1: Service = {
  id: 2,
  nom: "Consultation",
  cout: 5000,
  description: "DescriptionService1",
  couleur: "CouleurService1",
  equipement: "EquipementService1",
  pole: {
    code: "Ophtalmologie"
  }
};

const service2: Service = {
  id: 2,
  nom: "Analyse",
  cout: 4000,
  description: "DescriptionService2",
  couleur: "CouleurService2",
  equipement: "EquipementService2",
  pole: {
    code: "Biologie"
  }
};

const service3: Service = {
  id: 3,
  nom: "Hospitalisation",
  cout: 3000,
  description: "DescriptionService2",
  couleur: "CouleurService2",
  equipement: "EquipementService2",
  pole: {
    code: "Chirurgie"
  }
};

export const listService: Service[] = [service0, service1, service2, service3];

export const my_prescription = [
  { code: 'MED001', libelle: 'Ibuprofène' },
  { code: 'MED002', libelle: 'Paracétamol' },
  { code: 'MED003', libelle: 'Amoxicilline' },
  { code: 'MED004', libelle: 'Ciprofloxacine' },
  { code: 'MED005', libelle: 'Métformine' }
];
