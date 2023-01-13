import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.fragment.subscribe(params => {

      var jsonFragment = '{"' + params!.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      console.log(jsonFragment);
      console.log(JSON.parse(jsonFragment));

      localStorage.setItem("auth", jsonFragment)

      console.log("access_token: ", JSON.parse(localStorage.getItem("auth")!).access_token)
    });

  }

}
