export interface Service {
  id?: number;
  nom: string;
  cout?: number;
  description: string;
  couleur: string;
  equipement: string;
  prestations: any[];
  pole: {
    code: string;
  };
}

const service1: Service = {
  id: 1,
  nom: "Consultation",
  cout: 5000,
  description: "DescriptionService1",
  couleur: "CouleurService1",
  equipement: "EquipementService1",
  prestations: [],
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
  prestations: [],
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
  prestations: [],
  pole: {
    code: "Chirurgie"
  }
};

export const listService: Service[] = [service1, service2, service3];

export const my_prescription = [
  { code: 'MED001', libelle: 'Ibuprofène' },
  { code: 'MED002', libelle: 'Paracétamol' },
  { code: 'MED003', libelle: 'Amoxicilline' },
  { code: 'MED004', libelle: 'Ciprofloxacine' },
  { code: 'MED005', libelle: 'Métformine' }
];
