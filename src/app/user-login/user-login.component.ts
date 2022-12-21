import { Component } from '@angular/core';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  firstName = "Obe";

  votes = {
    overturn: 1,
    confirm: 3
  }

  voteOverturn() {
    this.votes.overturn++
  }

  voteConfirm() {
    this.votes.confirm++
  }
}
