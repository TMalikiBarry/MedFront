export interface FileInfosInterface {
  id?: number; // Correspond à Long en Java, facultatif car souvent généré automatiquement
  typeFile?: TypeFile; // Enum ou type associé à TypeFile
  name: string; // Nom du fichier
  uploadingFile?: string; // URL ou chemin du fichier
  typeDoc?: string; // Peut être null ou undefined en TypeScript
  extension?: string; // Extension du fichier (e.g., "pdf", "jpg")

}

export enum TypeFile {
  RESULTATS = 'RESULTATS',
  INFOS = 'INFOS',
  AUTRE = 'AUTRE',
  // DOCUMENT = 'DOCUMENT',
  // IMAGE = 'IMAGE',
  // VIDEO = 'VIDEO',
  // OTHER = 'OTHER',
}

export enum CONTEXTFILE {
  PATIENTDOC = 'PATIENTDOC',
  PRESTATIONDOC = 'PRESTATIONDOC',
}
