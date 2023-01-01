import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Replay } from '../models/replay';
import { ReplayService } from '../services/replay.service';


@Component({
  selector: 'model-test',
  templateUrl: './model-test.component.html',
  styleUrls: ['./model-test.component.scss']
})
export class ModelTestComponent implements OnInit {

  isLoading = false;
  replay: Replay = {};
  replays: Replay[] = [];

  constructor(private http: HttpClient, private replayService: ReplayService) { }

  ngOnInit() {

    console.log("Calling Function from ngOnInit...")
    //this.isLoading = true;

    // this.replayService.getReplay("e821202c-b9fc-49bd-8816-6e2585b649aa").subscribe(replay => {

    //   this.replay = replay;

    //   console.log(this.replay);

    //   this.isLoading = false;
    //   console.log("Function call complete")
    // });

    const userId: string = localStorage.getItem('currentUser')!;

    this.isLoading = true;
    this.replayService.getReplays().subscribe(replays => {
      //console.log(replays);

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

      this.replays = replays;

      console.log("Added userVotes to Replay");
      console.log(this.replays);


      this.isLoading = false;
      console.log("Function call complete")
    });

  }
}
