import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment.prod";
import {Observable} from "rxjs";
import {FileInfosInterface, TypeFile} from "src/app/models/files-infos.interface";
import {ApiResponseInterface} from "../../models/api-response.interface";


export const FILE_ICONS: { [key: string]: string } = {
  pdf: 'file-pdf', // Icône pour les fichiers PDF
  doc: 'file-word', // Icône pour les fichiers Word
  docx: 'file-word',
  xls: 'file-excel', // Icône pour les fichiers Excel
  xlsx: 'file-excel',
  ppt: 'file-ppt', // Icône pour les fichiers PowerPoint
  pptx: 'file-ppt',
  txt: 'file-text', // Icône pour les fichiers texte
  jpg: 'file-image', // Icône pour les fichiers image
  jpeg: 'file-image',
  png: 'file-image',
  gif: 'file-image',
  bmp: 'file-image',
  default: 'file', // Icône par défaut pour les fichiers non spécifiés
};

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'tif', 'svg'];

export const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp',
  ...IMAGE_EXTENSIONS];

export const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/tiff',
  'image/svg+xml',
];

@Injectable({
  providedIn: 'root'
})
export class FileService {

  limitFile = 2.5 * 1024 * 1024;
  private readonly url = `${environment.apiURL}/files`;

  isTypeFilePDF(file: File): boolean {
    return file.name.toLowerCase().split('.').pop() === 'pdf';
  }

  isAllowedFileExtension(file: File): boolean {
    const extension = file.name.toLowerCase().split('.').pop();
    return extension ? ALLOWED_EXTENSIONS.includes(extension) : false;
  }

  /*  checkSize(file: File, fileType: 'selfieIdentity' | 'notSelfie' = 'selfieIdentity'): boolean {
      if (fileType === 'selfieIdentity') {
        return file.size <= this.limitSelfie;
      } else if (fileType === 'notSelfie') {
        return file.size <= this.limitFile;
      } else {
        throw new Error('Le type de fichier spécifié n\'est pas pris en compte');
      }
    }*/

  isAllowedFileType(file: File): boolean {
    console.log('Tyep Du fichier', file.type)
    return ALLOWED_TYPES.includes(file.type);
  }

  coolFileSize(file: File) {
    return file.size <= this.limitFile;
  }

  constructor(private http : HttpClient) { }

  save(file: File, typeFile: TypeFile = TypeFile.INFOS): Observable<FileInfosInterface> {
    let formData: FormData = new FormData();
    formData.append("type", typeFile);
    formData.append("file", file);
    return this.http.post<FileInfosInterface>(this.url + "/upload", formData);
  }

  deleteFileByName(fileName: string): Observable<ApiResponseInterface> {
    return this.http.delete<ApiResponseInterface>(`${this.url}/${fileName}`);
  }

}
