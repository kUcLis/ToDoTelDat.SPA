import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ToDo } from 'src/app/Shared/Models/toDo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() toDo: ToDo;
  formatedDate = "";
  constructor(@Inject(LOCALE_ID) private locale: string) {
    
  }
  ngOnInit(): void {
    if(this.toDo){
      this.formatedDate = formatDate(this.toDo.startDate!, 'dd-M-yyyy HH:mm', this.locale);
    }
    
  }
}
