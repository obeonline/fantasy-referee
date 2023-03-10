import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import { Replay } from '../models/replay';
import { ReplayService } from '../services/replay.service';
import { map } from 'rxjs';

// declare the javascript function here
declare function startVideo(url: string): any;
declare function disposeVideoPlayer(): any;

@Component({
  selector: 'show-replay',
  templateUrl: './show-replay.component.html',
  styleUrls: ['./show-replay.component.scss']
})

@Injectable()
export class ShowReplayComponent implements OnInit, OnDestroy {

  replay: Replay = {};
  showVoteButton: boolean;
  isLoading: boolean;

  routeId = "";
  userId: string | null = localStorage.getItem('currentUser');

  @ViewChild('voteButtons', {static: false}) voteButtonsElement?: ElementRef;
  @ViewChild('voteChart', {static: false}) voteChartElement?: ElementRef;

  constructor(private http: HttpClient, private route: ActivatedRoute, private replayService: ReplayService) {
    this.showVoteButton = true;
    this.isLoading = true;
   }

  async ngOnInit() {

    this.route.params.subscribe(params => {
      this.routeId = params['id'];
    });

    console.log("routeId: " + this.routeId);

    this.isLoading = true;
    this.replayService.getReplay(this.routeId)
      .pipe(map((replay => {

        //Add the current user's vote to the current replay to display proper UI if the user has already voted
        this.replayService.getUserVote(replay.id!, this.userId!)
        .subscribe(vote => {

          //Enrich Replay
          if (vote.hasOwnProperty("Item")) {
            //console.log("User has a vote...")
            replay.userVote = {
              voted: true,
              overturn: vote["Item"].overturn
            };

            this.showVoteButton = false;
            this.voteChartElement?.nativeElement.setAttribute('class', 'visible');
          }
          else {
            //console.log("User did not vote...")

            replay.userVote = {
              voted: false,
              overturn: null!
            };

            this.showVoteButton = true;
            this.voteButtonsElement?.nativeElement.setAttribute('class', 'visible');
          }
          //console.log(vote);
        })

      return replay;

    })))
    .subscribe(replay => {
      this.replay = replay!

      console.log(this.replay);


      //Start video
      startVideo(this.replay.url!);
      console.log("Started video: ", this.replay.url)

      //Disable loading template
      this.isLoading = false;

      console.log("HTTP requrst returned..")
    })
  }

  ngOnDestroy() {
    //Cleanup video player when component is destroyed

    disposeVideoPlayer();
  }

  loadComplete() {
    return !this.isLoading;
  }

  vote(overturn: boolean) {

    const body = { overturn: overturn };

    console.log("Casting vote...")
    this.voteButtonsElement?.nativeElement.setAttribute('class', 'hidden');

    this.replayService.castUserVote(this.replay.id!, this.userId!, overturn).subscribe(() => {
      if (overturn) {
        this.replay.votes!.overturn++
      }
      else {
        this.replay.votes!.confirm++
      }

      this.voteChartElement?.nativeElement.setAttribute('class', 'visible');
      console.log("Vote sucessfully cast");
    });

  }

}
