import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserEndpointsService } from './user-endpoints.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user = new User();
  private userStorage = new ReplaySubject<number | null>();
  public user$ = this.userStorage.asObservable();


  constructor(private userEP: UserEndpointsService) { }

  logIn(userName: string){
      this.userEP.getByUserName(userName).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => {
         
        }
      });

      if(!this.user.userId)
        this.userEP.createUser(userName).subscribe({
          next: (data) => {
            this.user = data;
          },
          error: (e) => {
           
          }
        });
  }
}
