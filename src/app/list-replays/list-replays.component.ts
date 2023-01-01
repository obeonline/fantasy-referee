import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Replay } from '../models/replay';
import { ReplayService } from '../services/replay.service';

@Component({
  selector: 'list-replays',
  templateUrl: './list-replays.component.html',
  styleUrls: ['./list-replays.component.scss']
})

@Injectable()
export class ListReplaysComponent {

  replays: Replay[] = [];
  showVoteButton = true;
  isLoading = false;

  constructor(private http: HttpClient, private replayService: ReplayService) { }

  ngOnInit() {

    //Show Loading template
    this.isLoading = true;

    const userId: string = localStorage.getItem('currentUser')!;

    this.replayService.getReplays()
      .pipe(map((replays => {
        for (const key in replays) {

          //Add the current user's vote to the current replay to display proper UI if the user has already voted
          this.replayService.getUserVote(replays[key].id!, userId!)
          .subscribe(vote => {

            //console.log("Getting vote for: ", replays[key].id);

            //Enrich Replay
            if (vote.hasOwnProperty("Item")) {
              //console.log("User has a vote...")
              replays[key].userVote = {
                voted: true,
                overturn: vote["Item"].overturn
              };
            }
            else {
              //console.log("User did not vote...")

              replays[key].userVote = {
                voted: false,
                overturn: null!
              };
            }
            //console.log(vote);

          })
        }

        return replays;

      })))
      .subscribe(replays => {

        //this.replays = JSON.parse(JSON.stringify(replays!));
        this.replays = replays!

        console.log(this.replays);

        //Disable loading template
        this.isLoading = false;

    })
  }
}
