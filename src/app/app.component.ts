import { Component } from '@angular/core';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    console.log("Current User: ", user)
  }
}    
