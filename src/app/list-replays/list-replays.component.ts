import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-replays',
  templateUrl: './list-replays.component.html',
  styleUrls: ['./list-replays.component.scss']
})

@Injectable()
export class ListReplaysComponent {

  replays: any = {};
  componentReady = false;
  showVoteButton = false;
  showViewButton = false;
  showLoading = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getVideos().subscribe({
      next: (response) => {
        
        this.replays = response;

        //Enrich replays with the vote of the current user
        this.replays.Items.forEach(replay => {

          //Show loading and hide buttons
          replay.ready = false;

          var vote: any;
          var userId: string | null = localStorage.getItem('currentUser');

          this.getVote(replay.videoId, userId).subscribe({
            next: (response) => {

              vote = response;
              if (vote.Item) {
                replay.overturn = vote.Item.overturn;
                replay.voted = true;
              } else {
                replay.voted = false;
              }

              
            },
            error: (e) => console.error(e)
          })

          //Hide loading and show buttons
          replay.ready = true;

        });

        console.log(this.replays);
        //console.log(this.replays.Items[0]);

      },
      error: (e) => console.error(e)
    })

    //Show Items
    this.componentReady = true;
    
  }

  getVideos() {

    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    });

    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays", {headers: headers})
  }

  getVote(videoId: string, userId: string | null) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId + "/votes/" + userId, {headers: headers});
  }
}
