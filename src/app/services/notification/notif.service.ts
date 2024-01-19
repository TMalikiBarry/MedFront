import { Injectable } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor(private message: NzMessageService) { }

  snackMessage(msg: string, duration: number, type: 'success' | 'warning' | 'error' | 'infos'): void{
    this.message.create(type, msg, {
      nzDuration: duration
    });
  }
}
