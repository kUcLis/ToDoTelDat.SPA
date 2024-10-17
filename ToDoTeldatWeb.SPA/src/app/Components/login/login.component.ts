import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName = "";
  authError = "";
  constructor(public auth: AuthorizationService){
    
 }

 onSubmit(){
    this.auth.logIn(this.userName);
 };
}
