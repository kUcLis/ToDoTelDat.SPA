import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';

@Component({
  selector: 'app-main-todoes',
  templateUrl: './main-todoes.component.html',
  styleUrls: ['./main-todoes.component.css']
})
export class MainTodoesComponent {

  constructor(public auth: AuthorizationService){
    
  }
}
