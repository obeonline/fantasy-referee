import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-login-controls',
  templateUrl: './user-login-controls.component.html',
  styleUrls: ['./user-login-controls.component.scss']
})
export class UserLoginControlsComponent {
  firstName = "Obe";
  showMe = true;

  @Input() votes: any;  

  updateName () {
    this.firstName = "This is Joe now"
  }

  toggleDiv() {

    console.log("initial showMe: ", this.showMe)

    this.showMe = !this.showMe;

    console.log("final showMe: ", this.showMe)

  }


}
