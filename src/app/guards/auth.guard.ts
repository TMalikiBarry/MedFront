import {CanActivateFn, Router,} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/authentication/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // if (authService.isLoggedIn()) {
  //   const userRole = authService.getRole();
  //   /*let isABoss = userRole ? ['SUPERADMINISTRATEUR', 'ADMINISTRATEUR'].includes(userRole) : false;
  //   if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
  //   console.error(userRole + " != " + route.data['roles']);
  //   notify.snackMessage('Accès non autorisé', 4000, 'danger');
  //   router.navigate(['']);
  //   return false;
  //   }*/
  //   if (!userRole) {
  //     // console.error(userRole + " != " + route.data['roles']);
  //     // notify.snackMessage('Accès non autorisé', 4000, 'danger');
  //     router.navigate(['']);
  //     return false;
  //   }
  //   return true;
  // }
  // router.navigateByUrl('/login');
  return true;
};

/*@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private notify: NotifService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      // let isABoss = userRole ? ['SUPERADMINISTRATEUR', 'ADMINISTRATEUR'].includes(userRole) : false;
      /!*if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        console.error(userRole + " != " + route.data['roles']);
        this.notify.snackMessage('Accès non autorisé', 4000, 'danger');
        this.router.navigate(['']);
        return false;
      }*!/
      if (!userRole) {
        // console.error(userRole + " != " + route.data['roles']);
        // this.notify.snackMessage('Accès non autorisé', 4000, 'danger');
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}*/
