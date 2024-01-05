import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotifService} from "../services/notification/notif.service";
import {AuthService} from "../services/authentication/auth.service";


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.sass'],
  animations: [
    trigger('bounce', [
      transition('* => *', [
        style({ transform: 'scale(0.5)' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class AuthentificationComponent {

  showPassword = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private notif: NotifService,
              private router: Router) { }
  // initialize the form
  loginForm = this.fb.group({
    username : ['' , Validators.required],
    password : ['', Validators.required]
  }) ;

  ngOnInit(): void {
    this.loginForm.setValue({password: 'Passer@2024', username: 'thierno.barry'});
  }

  onLogin() {
    // this.router.navigateByUrl('/introduction');
    this.router.navigateByUrl('/admin/dashboard');
    // let username = this.loginForm.value.username;
    // let password = this.loginForm.value.password;
    //
    // if (typeof username === "string" && typeof password === "string") {
    //   this.authService.login(username, password)
    //     .subscribe({
    //       next: (user) => {
    //         if (user){
    //           /*if (user.firstLogin == 0) {
    //             this.router.navigateByUrl('/reset-pw');
    //             // this.notif.snackMessage('Veuillez définir votre mot de passe', 3000, 'infos');
    //             return;
    //           }*/
    //           this.authService.authenticateUser(user).subscribe({
    //             next: (data) => {
    //
    //               if (data) {
    //                 this.router.navigateByUrl('/admin/dashboard');
    //                 // this.notif.snackMessage("Bienvenue " + user.prenom + ' ' + user.nom,
    //                 //   2000, 'success');
    //               }else {
    //                 // this.notif.snackMessage('Accès non autorisé', 4000, 'danger');
    //                 sessionStorage.clear();
    //               }
    //             }
    //           })
    //         }
    //       },
    //       // error: (err) => {
    //       //   console.error(err);
    //       //   if (err.status === 0 || err === 'Something bad happened; please try again later.') {
    //       //     // this.notif.snackMessage("Problème de connexion au serveur", 4000, "danger");
    //       //   } else {
    //       //     // this.notif.snackMessage("Identifiant ou mot de passe incorrect", 4000, "danger");
    //       //   }
    //       // }
    //     })
    // }
  }

}

