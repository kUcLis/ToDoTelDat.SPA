import { formatDate } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/Shared/Models/toDo';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';
import { StateService } from 'src/app/Shared/Services/state.service';
import { TodoEndpointsService } from 'src/app/Shared/Services/todo-endpoints.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Input() toDo: ToDo;
  @Output() closeForm = new EventEmitter();
  @Input() model: NgbDateStruct;
  time = { hour: 13, minute: 30 };
  date: { year: number; month: number };
  currentDate = new Date();
  formDate: string = "";

  isDateValid = true;
  isTaskNameValid = true;

  constructor(public auth: AuthorizationService, @Inject(LOCALE_ID) private locale: string, private toDoEP: TodoEndpointsService, private stateService: StateService) {

    this.model = inject(NgbCalendar).getToday();
    
  }
  ngOnInit(): void {
    console.log(this.toDo)
    if (!this.toDo.toDoId) {
      this.toDo = new ToDo();
      this.toDo.startDate = new Date();
      this.toDo.startDate.setHours(this.time.hour);
      this.toDo.startDate.setMinutes(this.time.minute);
      this.onDateSelect();
    } else {
      var date = new Date(this.toDo.startDate!.toString())
      this.toDo.startDate = date;
      this.model.day = this.toDo.startDate.getDate();
      this.model.month = this.toDo.startDate.getMonth() + 1;
      this.model.year = this.toDo.startDate.getFullYear();
      this.time.hour = this.toDo.startDate.getHours();
      this.time.minute = this.toDo.startDate.getMinutes();
      this.onDateSelect();
    }
  }

  onSubmit() {
    console.log(this.toDo)
    if (!this.toDo.taskName || this.toDo.taskName!.length < 4 || this.toDo.taskName!.length > 100) {
      this.isTaskNameValid = false;
    } else {
      this.isTaskNameValid = true;
    }

    if (this.isDateValid && this.isTaskNameValid) {

      this.auth.user$.subscribe(data => this.toDo.userId = data?.userId);
      this.toDoEP.createToDo(this.toDo).subscribe({
        next: (data) => {
          this.toDo = data;
          this.stateService.setRefresh();
          this.closeForm.emit();
        },
        error: (e) => {
          this.stateService.setRefresh();
        }
      });
    }
  }

  onSubmitUpdate() {
    console.log(this.toDo)
    if (!this.toDo.taskName || this.toDo.taskName!.length < 4 || this.toDo.taskName!.length > 100) {
      this.isTaskNameValid = false;
    } else {
      this.isTaskNameValid = true;
    }

    if (this.isDateValid && this.isTaskNameValid) {

      this.auth.user$.subscribe(data => this.toDo.userId = data?.userId);
      this.toDoEP.updateToDo(this.toDo).subscribe({
        next: (data) => {
          this.toDo = data;
          this.stateService.setRefresh();
          this.closeForm.emit();
        },
        error: (e) => {
          this.stateService.setRefresh();
        }
      });
    }
  }


  onTimeChange(event: NgbTimeStruct) {
    this.time.hour = event.hour;
    this.time.minute = event.minute;

    this.toDo.startDate!.setHours(this.time.hour);
    this.toDo.startDate!.setMinutes(this.time.minute);

    this.showFormDate();
  }
  showFormDate() {
    if (this.toDo.startDate!.getTime() > this.currentDate.getTime()) {
      this.isDateValid = true;
    } else {
      this.isDateValid = false;
    }


    this.formDate = formatDate(this.toDo.startDate!, 'dd-M-yyyy HH:mm', this.locale);
  }
  onDateSelect() {
    console.log(this.model)
    this.toDo.startDate!.setFullYear(this.model.year, this.model.month - 1, this.model.day);
    console.log(this.toDo.startDate)
    this.showFormDate();
  }
}
