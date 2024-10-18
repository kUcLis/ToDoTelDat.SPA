import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../Models/toDo';

@Injectable({
  providedIn: 'root'
})
export class TodoEndpointsService {
  baseUrl = "https://api.kuclis.hostingasp.pl/ToDo"
  constructor(private http: HttpClient) { }

  createToDo(toDo: ToDo){
    return this.http.post<ToDo>(this.baseUrl, toDo);
  }

  getToDoes(date: string, userId: number){
    return this.http.get<ToDo[]>(this.baseUrl + "/" + userId + "/" + date)
  }
}
