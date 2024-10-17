import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserEndpointsService {
  baseUrl = "https://api.kuclis.hostingasp.pl/User/"
  constructor(private http: HttpClient) { }

  getByUserName(userName: string){
    return this.http.get<User>(this.baseUrl + userName)
  }

  createUser(userName: string){
    return this.http.post<User>(this.baseUrl + "create/" + userName, null)
  }
}
