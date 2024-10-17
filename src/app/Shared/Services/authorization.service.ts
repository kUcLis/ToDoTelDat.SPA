import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserEndpointsService } from './user-endpoints.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user = new User();
  private userStorage = new ReplaySubject<User | null>();
  public user$ = this.userStorage.asObservable();


  constructor(private userEP: UserEndpointsService) { }

  logIn(userName: string){
      this.userEP.getByUserName(userName).subscribe({
        next: (data) => {
          this.user = data;
          this.setUser(this.user);
        },
        error: (e) => {
         
        }
      });

      if(!this.user){
        this.userEP.createUser(userName).subscribe({
          next: (data) => {
            this.user = data;
            this.setUser(this.user);
          },
          error: (e) => {
           
          }
        });
      }
  }

  logOut(){
    localStorage.removeItem('user');
    this.userStorage.next(null);
  }

  private setUser(user : User){
    localStorage.setItem('user',JSON.stringify(user));
    this.userStorage.next(user);
  }
}
