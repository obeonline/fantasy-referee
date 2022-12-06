import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'list-replays',
  templateUrl: './list-replays.component.html',
  styleUrls: ['./list-replays.component.scss']
})

@Injectable()
export class ListReplaysComponent {

  replays: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getVideos().subscribe({
      next: (response) => {
        
        this.replays = response;
        console.log(this.replays);
        console.log(this.replays.Items[0]);

      },
      error: (e) => console.error(e)
    }

    )
  }

  getVideos() {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays");
  }
}
