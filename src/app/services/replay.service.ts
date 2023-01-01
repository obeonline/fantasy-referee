import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs';
import { Replay } from '../models/replay';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {

  constructor(private http: HttpClient) {}

  getReplay(id: string) {

    return this.http.get<Replay>("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + id)
      .pipe(map(rawResponse => {

        rawResponse["Item"].id = rawResponse["Item"].videoId;
        //delete rawResponse["Item"].videoId;

        return this.parseReplay(rawResponse["Item"]);

      }))

  }

  getReplays() {

    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    });

    return this.http.get<Replay[]>("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays", {headers: headers})
      .pipe(map(rawResponse => {

        const replays : Replay[] = [];

        for (const key in rawResponse["Items"]) {

          //console.log(this.parseReplay(rawResponse["Items"][key]));
          replays.push(this.parseReplay(rawResponse["Items"][key]));
        }

        console.log("Parsing Complete...")
        //console.log(replays);

        return replays;


    }))
  }

  getUserVote(replayId: string | null, userId: string) {

      const headers = new HttpHeaders({
        "Content-Type": "application/json"
      });

      return this.http.get("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + replayId + "/votes/" + userId, {headers: headers});

  }

  castUserVote(replayId: string, userId: string, overturn: boolean) {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    });

    const body = { overturn: overturn };

    return this.http.put("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays/" + replayId + "/votes/" + userId, body, {headers: headers});

  }

  private parseReplay(rawReplay: any) : Replay {

    let replay: Replay = {};

    //console.log("Parsing replay...")
    //console.log(rawReplay);

    //Set replay.id to videoId value from raw data. Remove videoId from replay item
    replay = rawReplay;
    replay.id = rawReplay["videoId"];

    delete replay["videoId"];

    return replay;
  }
}
