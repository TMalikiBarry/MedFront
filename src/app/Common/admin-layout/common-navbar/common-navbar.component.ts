import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthInterface} from "../../../models/auth.interface";

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

  currentUser ?: AuthInterface;

  constructor(public router: Router) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('TOUCHMED_currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;
    console.log("USER ", this.currentUser);
    if (['/', '/admin'].some(url => url === this.router.url))
      this.router.navigateByUrl('/admin/dashboard');
  }

  getUserFullNameInitials(): string {
    if (this.currentUser && this.currentUser.fullName) {
      const fullNameWords = this.currentUser.fullName.split(' ');

      const firstLetter = this.currentUser.fullName.charAt(0);

      const lastWord = fullNameWords[fullNameWords.length - 1];
      const lastWordFirstLetter = lastWord.charAt(0);

      return `${firstLetter} ${lastWordFirstLetter}`;
    }

    return 'U';
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
}
