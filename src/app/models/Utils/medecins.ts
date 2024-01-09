export interface Medecin {
  id?: number;
  nom: string;
}

const medecin1: Medecin = {
  id: 1,
  nom: "Babacar Adje"
};

const medecin2: Medecin = {
  id: 1,
  nom: "Ibrahima diop"
};

export const listMedecins: Medecin[] = [medecin1, medecin2];
