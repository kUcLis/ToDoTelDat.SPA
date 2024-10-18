import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';
import { StateService } from 'src/app/Shared/Services/state.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent {
  toDo: ToDo;
  form = false;
  model: NgbDateStruct;
  constructor(public auth: AuthorizationService, private stateService: StateService){
    
  }
  updateModel(model: NgbDateStruct){
    this.model = model;
  }
  showForm(event: ToDo){
    this.stateService.setFormState(true);
    this.toDo = event;
    this.form = true;
  }

  hideForm(){
    this.stateService.setFormState(false);
    this.form = false;
  }

  closeAll(){
    this.form = false;
  }
}
