import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainBodyComponent } from './Components/main-body/main-body.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { MainTodoesComponent } from './Components/main-todoes/main-todoes.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    LoginComponent,
    MainTodoesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
