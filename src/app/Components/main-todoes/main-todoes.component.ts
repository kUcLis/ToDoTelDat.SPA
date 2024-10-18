import { formatDate, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, inject, LOCALE_ID, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';
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
  userId: number | undefined = 0;
	date: { year: number; month: number };
  @Output() showForm = new EventEmitter<ToDo>();
  constructor(public auth: AuthorizationService, private toDoEP: TodoEndpointsService, @Inject(LOCALE_ID) private locale: string){
    this.model = inject(NgbCalendar).getToday();
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
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

      }
    })
  }

  onDateSelect(){
    console.log(this.model);
  }


  addTask(){
    this.showForm.emit(this.toDo);
  }
}
