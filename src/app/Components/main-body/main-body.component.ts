import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/Shared/Services/authorization.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent {

  constructor(public auth: AuthorizationService){
    
  }
}
