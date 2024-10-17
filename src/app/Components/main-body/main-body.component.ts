import { Component } from '@angular/core';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent {
  toDo: ToDo;
  form = false;
  constructor(public auth: AuthorizationService){
    
  }

  showForm(event: ToDo){
    this.toDo = event;
    this.form = true;
  }

  hideForm(){
    this.form = false;
  }
}
