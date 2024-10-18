import { formatDate, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';
import { StateService } from 'src/app/Shared/Services/state.service';
import { TodoEndpointsService } from 'src/app/Shared/Services/todo-endpoints.service';

@Component({
  selector: 'app-main-todoes',
  templateUrl: './main-todoes.component.html',
  styleUrls: ['./main-todoes.component.css']
})
export class MainTodoesComponent implements OnInit, AfterViewInit {
  isLoading = false;
  toDoes: ToDo[] = [];
  toDo: ToDo = new ToDo();
  model: NgbDateStruct;
  dateFromModel: Date = new Date();
  userId: number | undefined = 0;
	date: { year: number; month: number };
  toRefresh = false;
  isFormOn = false;
  @Output() showForm = new EventEmitter<ToDo>();
  @Output() updateModel = new EventEmitter<NgbDateStruct>();
  constructor(public auth: AuthorizationService, private toDoEP: TodoEndpointsService, @Inject(LOCALE_ID) private locale: string, private stateService: StateService){
    this.model = inject(NgbCalendar).getToday();
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    this.updateModel.emit(this.model);
    this.stateService.refresh$.subscribe(data =>{ 
      this.toRefresh = data;
      if(this.toRefresh){
      this.getToDoes(this.dateFromModel)
      }
    });

    this.stateService.form$.subscribe(data =>{ 
      this.isFormOn = data;
    });

    this.auth.user$.subscribe(data => this.userId = data?.userId)
    this.getToDoes(new Date());
  }

  getToDoes(date: Date){
    this.isLoading = true;
    let formatedDate = formatDate(date, 'yyyy-MM-dd', this.locale);
    this.toDoEP.getToDoes(formatedDate, this.userId!).subscribe({
      next: data =>{
        this.toDoes = data;
        console.log(this.toDoes)
        this.isLoading = false;
      },
      error: e =>{
        console.log(this.toDoes)
        this.toDoes = [];
      }
    })
  }

headerDateFormat(date: Date){
  return formatDate(date, 'yyyy-MM-dd HH:mm', this.locale);
}

listDateFormat(date: Date){
  return formatDate(date, 'yyyy-MM-dd', this.locale);
}

  onDateSelect(){
    this.dateFromModel.setFullYear(this.model.year,this.model.month-1, this.model.day)
    this.updateModel.emit(this.model);
    this.getToDoes(this.dateFromModel);
  }

  onDelete(toDo: ToDo){
    this.toDo = toDo;
    this.toDoEP.deleteToDo(toDo.toDoId!, toDo.userId!).subscribe({
      next: data =>{
        this.getToDoes(this.dateFromModel);
      },
      error: e =>{

      }
    });
    
  }

  openFormToUpdate(todo: ToDo){
    this.showForm.emit(todo);
  }
  onUpdate(toDo: ToDo){
    this.toDo = toDo;
    this.toDoEP.updateToDo(toDo).subscribe({
      next: data =>{
        this.getToDoes(this.dateFromModel);
      },
      error: e =>{

      }
    });
    
  }


  addTask(){
    this.showForm.emit(this.toDo);
  }
}
