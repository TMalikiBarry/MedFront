import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


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
  handleClick() {
    // Add your event handler logic here
    console.log('Button clicked!');
    // You can add more logic, such as form validation or authentication calls
  }

}

