import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {AuthInterface} from "../../models/auth.interface";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "src/environments/environment.prod";
import {StorageService} from "../Storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth: boolean = false;
  roleAs !: string | null;
  public currentUser!: Observable<AuthInterface>;
  private currentUserSubject!: BehaviorSubject<AuthInterface>;

  constructor(private http: HttpClient, private router: Router,
              public storage: StorageService) {
    this.currentUserSubject = new BehaviorSubject<AuthInterface>(JSON.parse(<string>this.storage.getItem("TOUCHMED_currentUser")));
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
            this.storage.setItem('TOUCHMED_currentUser', JSON.stringify(user));
            this.storage.setItem('TOUCHMED_STATE', 'false');
            this.storage.setItem('TOUCHMED_ROLE', user.role);
            this.storage.setItem('TOUCHMED_TOKEN', user.token);

            this.currentUserSubject.next(user);
          }
          // else {
          //       this.notify.snackMessage('Login ou mot de passe Incorrect', 3500, 'error');
          // }

        }));
  }

  public authenticateUser(login: AuthInterface): Observable<boolean> {
    if(login && login.token) {
      this.currentUserSubject.next(login);
      this.isAuth = !!login;
      if (this.isAuth) {
        this.storage.setItem('TOUCHMED_STATE', 'true');
      }

    }
    // else {
    //   this.notify.snackMessage('Login ou mot de passe Incorrect', 3500, 'error');
    // }

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
    return this.roleAs = this.storage.getItem('TOUCHMED_ROLE');
  }

  isLoggedIn() {
    return this.storage.getItem('TOUCHMED_STATE') == 'true';
  }

  routingAlreadyConnectedApp() {
    if (this.storage.getItem('TOUCHMED_currentUser')) {
      let user = JSON.parse(this.storage.getItem('TOUCHMED_currentUser') || '{}');
      if (user) {
        this.authenticateUser(user);
        this.isAuth = true;
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.router.navigateByUrl('');
      }
    }
  }
}
