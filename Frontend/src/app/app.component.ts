import { Component } from '@angular/core';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECO FRIENDLY';
  constructor(private dbService:DatabaseService){

  }

  check(){
    return this.dbService.isLoggedIn
  }
  changeLoggedIn(){
    this.dbService.updateLoggedIn(!this.dbService.isLoggedIn)
  }
}
