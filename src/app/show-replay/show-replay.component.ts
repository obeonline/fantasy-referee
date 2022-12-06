import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  replay: any;
    
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {

    var routeId = "";

    this.route.params.subscribe(params => {
      routeId = params['id'];
    });

    

    console.log("routeId: " + routeId);

    this.getVideo(routeId).subscribe({
      next: (response) => {
        
        this.replay = response;
        console.log(this.replay.Item);

        startVideo(this.replay.Item.url);
      },
      error: (e) => console.error(e)
    }

    )
  }

  getVideo(videoId: string) {
    return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + videoId);
  }

}
