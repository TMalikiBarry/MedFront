import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
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
    username : ['' ,Validators.required],
    password : ['', Validators.required]
  }) ;

  ngOnInit(): void {
  }
  handleClick() {
    // Add your event handler logic here
    console.log('Button clicked!');
    // You can add more logic, such as form validation or authentication calls
  }

}

