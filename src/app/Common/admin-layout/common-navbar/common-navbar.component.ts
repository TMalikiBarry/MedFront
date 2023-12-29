import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.sass']
})
export class CommonNavbarComponent implements OnInit {

  openMap: { [name: string]: boolean } = {
    securite: false,
    finance: false,
    personnes: false,
    organisation: false,
    parametre: false,
    dossiers: false,
  };

  constructor(public router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url)
    if (this.router.url === '/')
      this.router.navigateByUrl('/dashboard');
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
}
