import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-replays',
  templateUrl: './list-replays.component.html',
  styleUrls: ['./list-replays.component.scss']
})

@Injectable()
export class ListReplaysComponent {

  replays: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getVideos().subscribe({
      next: (response) => {
        
        this.replays = response;

        //Enrich replays with the vote of the current user
        this.replays.Items.forEach(replay => {

          var vote: any;
          var userId: string | null = localStorage.getItem('currentUser');

          this.getVote(replay.videoId, userId).subscribe({
            next: (response) => {

              vote = response;
              if (vote.Item) {
                replay.overturn = vote.Item.overturn;
              }
            },
            error: (e) => console.error(e)
          })

        });

        console.log(this.replays);
        //console.log(this.replays.Items[0]);

      },
      error: (e) => console.error(e)
    })
    
  }

  getVideos() {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays")
  }

  getVote(videoId: string, userId: string | null) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId + "/votes/" + userId);
  }
}
