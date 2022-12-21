import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'replay-vote-stats',
  templateUrl: './replay-vote-stats.component.html',
  styleUrls: ['./replay-vote-stats.component.scss']
})
export class ReplayVoteStatsComponent {

  video: any;

  @Input() votes: any; 

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    var routeId = "";


    // this.route.params.subscribe(params => {
    //   routeId = params['id'];
    // });

    // this.getVotes(routeId).subscribe({
    //   next: (response) => {

    //     this.video = response;
    //     console.log(this.video)

    //     if (this.video.Item.votes) {
    //       console.log(this.video.Item.votes)
    //     }
    //   },
    //   error: (e) => console.error(e)
    // })
  }

  getVotes(videoId: string) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId );
  }

}
