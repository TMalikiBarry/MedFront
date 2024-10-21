import {Injectable} from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/authentication/auth.service";
import * as JWTUtils from 'jwt-decode';
import {NotifService} from "../services/notification/notif.service";


@Injectable()
export class GeneralHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private notify: NotifService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{

    let currentUser = this.authService.currentUserValue;

    if (request.url.includes('/auth/login')) {
      return next.handle(request);
    }
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    // manage the error and log
    return next.handle(request).pipe(
      catchError(this.handleError)
    );

  }


  private handleError = (error: HttpErrorResponse):Observable<never> => {
    console.dir(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was:`);
    }

    if ([401, 403].indexOf(error.status) !== -1) {
      const token = this.authService.storage.getItem('TOUCHMED_TOKEN');

      const decodedToken: any = JWTUtils.jwtDecode(token!);
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      if (decodedToken.exp < Date.now() / 1000) {
        this.authService.logout();
        this.notify.snackMessage("Connexion expirée, veuillez vous reconnecter", 3500, "warning");
        return throwError( () => "Votre connexion a expiré");
      }
      this.notify.snackMessage("Permission non accordée pour cette action", 3500, "error");
    }


    if ([500].indexOf(error.status) !== -1) {
      this.notify.snackMessage("Erreur SERVEUR", 5000, "error");
    }
    if (error.status === 0) {
      this.notify.snackMessage("Problème de connexion au serveur", 5000, "error");
    }
    if ([404].indexOf(error.status) !== -1) {
      this.notify.snackMessage("Introuvable", 5000, "error");
    }
    if ([400].indexOf(error.status) !== -1) {
      this.notify.snackMessage("Une erreur est survenue", 5000, "error");
    }
    const myError = error.error || error.statusText;
    // Return an observable with a user-facing error message.
    return throwError( () => myError);
  }
}
