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

/*
  openMap: { [name: string]: boolean } = {
    securite: false,
    finance: false,
    personnes: false,
    organisation: false,
    parametre: false,
    dossiers: false,
  };

  currentUser ?: AuthInterface;

  constructor(public router: Router, private storage: StorageService) {
  }

  ngOnInit(): void {
    const storedUser = this.storage.getItem('TOUCHMED_currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;
    // console.log("USER ", this.currentUser);
    Object.keys(this.openMap).forEach(key => {
      this.openMap[key] = this.router.url.includes(key);
    });
    if (['/', '/admin'].some(url => url === this.router.url))
      this.router.navigateByUrl('/admin/dashboard');
  }

  openHandler(value: string): void {
    Object.keys(this.openMap).forEach(key => {
      // this.openMap[key] = key !== value ? false : this.router.url.includes(key);
      this.openMap[key] = key === value;
    });
    /!*for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
      if (this.router.url.includes(key)) {
        this.openMap[key] = true;
      }
    }*!/
  }*/

  actions: ActionInterface[] = []; // Your list of actions
  filteredModules: ModuleDTOInterface[] = []; // Modules to display
  openMap: { [key: string]: boolean } = {}; // Track open states

  constructor(public router: Router, private storage: StorageService, private profilService: ProfilService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    const storedUser = this.storage.getItem('TOUCHMED_currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) as AuthInterface : undefined;
    // @ts-ignore
    this.getActionsByProfil(this.currentUser?.role)
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

  getModuleTitle(module: ModuleDTOInterface): TemplateRef<void> {
    // @ts-ignore
    return this.moduleTitleTemplate.createEmbeddedView({ module }).rootNodes[0];
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

  openHandler(moduleCode: string): void {
    this.openMap[moduleCode] = !this.openMap[moduleCode];
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

/*  getIconPathModule(module: ModuleDTOInterface) {
    const basePath = 'assets/from_figma/';
    const isSelected = this.router.url.includes(module.bookmark)/!* Logic to check if the fonctionnalite is selected *!/;
    return `${basePath}${isSelected ? module.image + '_full_white.svg' : module.image + '.svg'}`;*/
//  }

  getIconPathModule(module: ModuleDTOInterface): string {
    const basePath = 'assets/from_figma/';
    const isSelected = this.router.url.includes(module.bookmark); // Logique pour vérifier si la fonctionnalité est sélectionnée
    const iconPath = `${basePath}${isSelected ? module.image + '_full_white.svg' : module.image + '.svg'}`;

    // Retourner une balise <img> avec le chemin de l'icône
    return iconPath;
  }

  getModuleTitleWithTemplate(module: ModuleDTOInterface): TemplateRef<void> {
    console.log("Description: "+module.description)
    return this.customTitleTemplate(module); // Crée un TemplateRef dynamique
  }


  @ViewChild('moduleTitleTemplate', { static: true }) moduleTitleTemplate!: TemplateRef<void>;

// Cette méthode génère un template dynamique en fonction du module
  customTitleTemplate(module: ModuleDTOInterface): TemplateRef<void> {
    console.log("CustomTitleTemplate " + module.code);
    return this.moduleTitleTemplate;
  }
  getconditionisRouter(bookmark: string): boolean{
    return this.router.url.includes(bookmark);
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
  // Cette méthode génère un élément DOM SafeHtml pour être injecté comme titre
  generateModuleTitle(module: any): SafeHtml {
    const iconPath = this.router.url.includes('/parametre/') ? 'Parametre_full_white.svg' : 'Parametre.svg';
    const imgTag = `<img src="assets/from_figma/${iconPath}" alt="Icone du module" class="module_logo" width="16.5">`;
    const description = module.description;
    return this.sanitizer.bypassSecurityTrustHtml(`${imgTag} <span>${description}</span>`);
  }
}
