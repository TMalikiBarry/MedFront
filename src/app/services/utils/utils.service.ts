import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  removeSpace(value: string): string {
    return value.trim().replace(/\s/g, '_');
  }
}
