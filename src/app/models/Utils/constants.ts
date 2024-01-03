export interface Service {
  id?: number;
  nom: string;
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
  description: "DescriptionService2",
  couleur: "CouleurService2",
  equipement: "EquipementService2",
  prestations: [],
  pole: {
    code: "Chirurgie"
  }
};

export const listService: Service[] = [service1, service2, service3];
