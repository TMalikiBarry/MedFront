export interface Prestations {
  id?: number;
  nom: string;
}

const prestation1: Prestations = {
  id: 1,
  nom: "prestation1"
};


export const listPrestations: Prestations[] = [prestation1];
