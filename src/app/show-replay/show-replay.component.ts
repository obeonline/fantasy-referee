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

  replay: any;
  replayDataLoaded: boolean = true;

  votes: any;

  showVotingUI : boolean = true;
  dataLoaded = new Promise((resolve, reject) => {

    console.log("Executing Promise...")

    if (this.replayDataLoaded) {
      resolve(true);
    }
    else {
      resolve(false)
    }
    
    
  });
    
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.routeId = params['id'];
    });

    console.log("routeId: " + this.routeId);
  
    
    this.getVideo(this.routeId).subscribe({
      next: (response) => {
        
        this.replay = response;
        this.votes = this.replay.Item.votes;

        console.log("Got video details");

        //Enrich replay with the vote of the current user
        var vote: any = {};

        this.getVote(this.replay.Item.videoId, this.userId).subscribe({
          next: (response) => {

            vote = response;
            if (vote.Item) {
              this.replay.Item.overturn = vote.Item.overturn;
              this.showVotingUI = false;
              console.log(vote);
            }

            console.log("Got vote details");
            
          },
          error: (e) => console.error(e)
        })

        this.replayDataLoaded = true;

        //Update promise
        this.dataLoaded
          .then(
            (success) => {
              console.log("Promise Result: ", success)
            })
          .catch(
            (error) => {
              console.log("Promise Result: ", error)
            }
          )

        //Start video
        startVideo(this.replay.Item.url);
        console.log("Started video")
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

    const body = { overturn: overturn };

    console.log("Casting vote...")
    this.http.put("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + this.routeId + "/votes/" + this.userId, body, {headers: headers}).subscribe();

    console.log("Vote sucessfully cast");
    this.showVotingUI = false;

    this.updateVoteCount();

    
  }

  updateVoteCount() {

    this.getVideo(this.routeId).subscribe({
      next: (response) => {
        
        this.replay = response;
        this.votes = this.replay.Item.votes;

      },
      error: (e) => console.error(e)
    }

    )
  }

}
