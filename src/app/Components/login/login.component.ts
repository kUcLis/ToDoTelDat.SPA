import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  isValid = true;
  userName = "";
  constructor(public auth: AuthorizationService){
    
 }

 onSubmit(){
    this.isLoading = true;

   if(this.userName.length < 3 || this.userName.length > 30){
      this.isValid = false;
      this.isLoading = false;
   } else{
      this.isValid = true;
   }

   if(this.isValid){
      this.auth.logIn(this.userName);
   }
    
 };

 onLogout(){
    this.auth.logOut();
    this.isLoading = false;
 }
}
