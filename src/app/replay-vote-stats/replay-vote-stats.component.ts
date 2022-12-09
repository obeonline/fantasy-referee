import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'replay-vote-stats',
  templateUrl: './replay-vote-stats.component.html',
  styleUrls: ['./replay-vote-stats.component.scss']
})
export class ReplayVoteStatsComponent {

  votes: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    var routeId = "";


    this.route.params.subscribe(params => {
      routeId = params['id'];
    });

    this.getVotes(routeId).subscribe({
      next: (response) => {

        this.votes = response;
        if (this.votes.Item) {
          console.log(this.votes.Item)
        }
      },
      error: (e) => console.error(e)
    })
  }

  getVotes(videoId: string) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId + "/votes");
  }

}
