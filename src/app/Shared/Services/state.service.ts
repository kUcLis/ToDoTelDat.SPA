import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy {
  private subskrypcja: Subscription;
  first = true;
  stateRefreshSubject = new BehaviorSubject<boolean>(false);
  refresh$ = this.stateRefreshSubject.asObservable();

  stateFormSubject = new BehaviorSubject<boolean>(false);
  form$ = this.stateFormSubject.asObservable();

  constructor() {
    this.subskrypcja = timer(0, 300000).subscribe(() => {
      if(!this.first){
        this.setRefresh();
      } else {
        this.first = false;
      }
        
    });
   }

  ngOnDestroy() {
    this.subskrypcja.unsubscribe();
  }

  setRefresh(){
    this.stateRefreshSubject.next(true);
  }

  setFormState(state: boolean){
    this.stateFormSubject.next(state);
  }


}
