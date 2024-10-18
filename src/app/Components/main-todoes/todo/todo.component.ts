import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { StateService } from 'src/app/Shared/Services/state.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() toDo: ToDo;
  @Output() toDoToUpdate = new EventEmitter<ToDo>();
  @Output() toDoToDelete = new EventEmitter<ToDo>();
  formatedDate = "";
  isFormOn = false;
  constructor(@Inject(LOCALE_ID) private locale: string, private stateService: StateService) {
    
  }
  ngOnInit(): void {
    if(this.toDo.startDate != undefined){
      this.formatedDate = formatDate(this.toDo.startDate!, 'dd-M-yyyy HH:mm', this.locale);
    }
    
    this.stateService.form$.subscribe(data => this.isFormOn = data);
  }

  onUpdate(){
    this.toDoToUpdate.emit(this.toDo);
  }

  onDelete(){
    this.toDoToDelete.emit(this.toDo);
  }
}
