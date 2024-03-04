import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {AuthInterface} from "../../models/auth.interface";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotifService} from "../notification/notif.service";
import {environment} from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean = false;
  roleAs !: string | null;
  public currentUser!: Observable<AuthInterface>;
  private currentUserSubject!: BehaviorSubject<AuthInterface>;

  constructor(private http: HttpClient, private router: Router, private notify: NotifService) {
    this.currentUserSubject = new BehaviorSubject<AuthInterface>(JSON.parse(<string>sessionStorage.getItem("TOUCHMED_currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthInterface {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string) {
    return this.http.post<AuthInterface>(`${environment.apiURL}/auth/login`, {username, password})
      .pipe(
        // map(res => res.reponse),
        tap(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // TODO NEVER STORE TOKEN AND USER INFOS IN STORAGE
            sessionStorage.setItem('TOUCHMED_currentUser', JSON.stringify(user));
            sessionStorage.setItem('TOUCHMED_STATE', 'false');
            sessionStorage.setItem('TOUCHMED_ROLE', user.role);
            sessionStorage.setItem('TOUCHMED_TOKEN', user.token);

            this.currentUserSubject.next(user);
          }else {
                this.notify.snackMessage('Login ou mot de passe Incorrect', 3500, 'error');
          }

        }));
  }

  public authenticateUser(login: AuthInterface): Observable<boolean> {
    if(login && login.token) {
      this.currentUserSubject.next(login);
      this.isAuth = !!login;
      if (this.isAuth) {
        sessionStorage.setItem('TOUCHMED_STATE', 'true');
      }

    } else {
      this.notify.snackMessage('Login ou mot de passe Incorrect', 3500, 'error');
    }

    return of(this.isAuth);
  }

  // public hasRole(role: string): boolean {
  //   return this.currentUserSubject.getValue()!.fonction.includes(role);
  // }

  public logout(){
    this.isAuth = false;
    this.roleAs = '';
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
    // mettre à jour la liste des users
  }
  getRole() {
    return this.roleAs = sessionStorage.getItem('TOUCHMED_ROLE');
  }

  isLoggedIn() {
    return sessionStorage.getItem('TOUCHMED_STATE') == 'true';
  }

  routingAlreadyConnectedApp() {
    if (sessionStorage.getItem('TOUCHMED_currentUser')) {
      let user = JSON.parse(sessionStorage.getItem('TOUCHMED_currentUser') || '{}');
      if (user) {
        this.authenticateUser(user);
        this.isAuth = true;
        this.router.navigateByUrl('/introduction');
      } else {
        this.router.navigateByUrl('');
      }
    }
  }
}
