import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// declare the javascript function here
declare function startVideo(url: string): any;

@Component({
  selector: 'show-replay',
  templateUrl: './show-replay.component.html',
  styleUrls: ['./show-replay.component.scss']
})

@Injectable()
export class ShowReplayComponent implements OnInit {

  routeId = "";
  userId: string | null = localStorage.getItem('currentUser');

  replay: any = {};
    
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.routeId = params['id'];
    });

    

    console.log("routeId: " + this.routeId);

    this.getVideo(this.routeId).subscribe({
      next: (response) => {
        
        this.replay = response;
        
        startVideo(this.replay.Item.url);

        //Enrich replay with the vote of the current user
        var vote: any = {};

        this.getVote(this.replay.Item.videoId, this.userId).subscribe({
          next: (response) => {

            vote = response;
            if (vote.Item) {
              this.replay.Item.overturn = vote.Item.overturn;
              console.log(vote);
            }
            
          },
          error: (e) => console.error(e)
        })
      },
      error: (e) => console.error(e)
    }

    )
  }

  getVideo(videoId: string) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId);
  }

  getVote(videoId: string, userId: string | null) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId + "/votes/" + userId);
  }

  vote(overturn: boolean) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    });

    const body = { userId: this.userId, overturn: overturn };

    console.log("Casting vote...")
    return this.http.put("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + this.routeId + "/vote", body, {headers: headers})
        .subscribe();
  }

}
