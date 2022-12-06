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
    })
    
  }

  getVideos() {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays");
  }

  getVote(videoId: string, userId: string | null) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/852b2437-86c9-4684-86ea-2d76e468cde6/votes/123456");
  }
}
