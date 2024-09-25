import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthInterface} from "src/app/models/auth.interface";
import {StorageService} from "../../../services/Storage/storage.service";
import {FonctionnaliteInterface} from "../../../models/fonctionnalite.interface";
import {ActionInterface} from "../../../models/action.interface";
import {ModuleDTOInterface} from "../../../models/moduleDTO.interface";
import {ProfilService} from "../../../services/Profil/profil.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.sass']
})

export class CommonNavbarComponent implements OnInit {
  currentUser ?: AuthInterface;


  actions: ActionInterface[] = []; // Your list of actions
  filteredModules: ModuleDTOInterface[] = []; // Modules to display
  openMap: { [bookmark: string]: boolean } = {};

  constructor(public router: Router, private storage: StorageService, private profilService: ProfilService) {

  }

  ngOnInit() {
    const storedUser = this.storage.getItem('TOUCHMED_currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;
    // @ts-ignore
    this.getActionsByProfil(this.currentUser?.role)
    this.filteredModules.forEach(module => {
      this.openMap[module.bookmark] = false;
      Object.keys(this.openMap).forEach(key => {
        this.openMap[key] = this.router.url.includes(key);
      });
      if (['/', '/admin'].some(url => url === this.router.url))
        this.router.navigateByUrl('/admin/dashboard');
    });
  }

  getModulesFromActions(actions: ActionInterface[]): ModuleDTOInterface[] {
    // Create a map to store modules and their functionalities
    const moduleMap = new Map<string, ModuleDTOInterface>();

    actions.forEach(action => {
      const module = action.fonctionnalite.module;

      // If module doesn't exist in the map, add it
      if (!moduleMap.has(module.code)) {
        moduleMap.set(module.code, { ...module, fonctionnalites: [] });
      }

      // Add the fonctionnalite to the corresponding module
      moduleMap.get(module.code)?.fonctionnalites.push(action.fonctionnalite);
    });

    // Convert the map to an array
    return Array.from(moduleMap.values());
  }


  getRouterLink(fonctionnalite: FonctionnaliteInterface): string {
    // Define how to get the router link from the fonctionnalite
    return `/admin/${fonctionnalite.module.bookmark+fonctionnalite.bookmark}`;
  }

  getIconPath(fonctionnalite: FonctionnaliteInterface): string {
    const basePath = 'assets/from_figma/';
    const isSelected = this.router.url.endsWith(fonctionnalite.module.bookmark+fonctionnalite.bookmark)/* Logic to check if the fonctionnalite is selected */;
    return `${basePath}${isSelected ? fonctionnalite.image + '_green.svg' : fonctionnalite.image + '.svg'}`;
  }

/*  openHandler(moduleCode: string): void {
    this.openMap[moduleCode] = !this.openMap[moduleCode];
  }*/
  openHandler(value: string): void {
    Object.keys(this.openMap).forEach(key => {
      this.openMap[key] = key === value;
    });

}
  getActionsByProfil(profilCode: string): void {
    this.profilService.getActionsByProfilCode(profilCode).subscribe({
      next: actions =>{
        this.actions = actions.reponse;
        this.filteredModules = this.getModulesFromActions(this.actions);
        this.profilService.setActions(this.actions);
      }
      })
  }

  getIconPathModule(module: ModuleDTOInterface): string {
    const basePath = 'assets/from_figma/';
    const isSelected = this.router.url.includes(module.bookmark); // Logique pour vérifier si la fonctionnalité est sélectionnée
    const iconPath = `${basePath}${isSelected ? module.image + '_full_white.svg' : module.image + '.svg'}`;

    // Retourner une balise <img> avec le chemin de l'icône
    return iconPath;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
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
  isRouteActive(module: any): boolean {
    // Remplacez ceci par la logique pour vérifier si le module est actif
    const currentRoute = this.router.url; // Obtenez l'URL actuelle
    return currentRoute.includes(module.bookmark); // Exemple de condition
  }


}
