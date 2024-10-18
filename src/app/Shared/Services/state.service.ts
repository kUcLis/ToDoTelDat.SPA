import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  stateRefreshSubject = new BehaviorSubject<boolean>(false);
  refresh$ = this.stateRefreshSubject.asObservable();

  stateFormSubject = new BehaviorSubject<boolean>(false);
  form$ = this.stateFormSubject.asObservable();

  constructor() { }

  setRefresh(){
    this.stateRefreshSubject.next(true);
  }

  setFormState(state: boolean){
    this.stateFormSubject.next(state);
  }


}
