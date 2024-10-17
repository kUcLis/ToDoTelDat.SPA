import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';

@Component({
  selector: 'app-main-todoes',
  templateUrl: './main-todoes.component.html',
  styleUrls: ['./main-todoes.component.css']
})
export class MainTodoesComponent implements OnInit, AfterViewInit {
  toDoes: ToDo[] = [];
  toDo: ToDo = new ToDo();
  model: NgbDateStruct;
	date: { year: number; month: number };
  @Output() showForm = new EventEmitter<ToDo>();
  constructor(public auth: AuthorizationService){
    this.model = inject(NgbCalendar).getToday();
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    
  }

  onDateSelect(){
    console.log(this.model);
  }


  addTask(){
    this.showForm.emit(this.toDo);
  }
}
