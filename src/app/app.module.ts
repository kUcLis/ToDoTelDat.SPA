import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainBodyComponent } from './Components/main-body/main-body.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainTodoesComponent } from './Components/main-todoes/main-todoes.component';
import { TodoComponent } from './Components/main-todoes/todo/todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoFormComponent } from './Components/todo-form/todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    LoginComponent,
    MainTodoesComponent,
    TodoComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
