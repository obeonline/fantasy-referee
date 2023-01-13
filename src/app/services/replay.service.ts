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

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization" : "Bearer eyJraWQiOiJsSHFQN2VYMEx2NVhhZFE5KzNqdmQ5U2VTamNGYndEYUVRU0dtcTY2N1hJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiclBRR1kzVWNHVVpGQy1MeFRxdlV6dyIsInN1YiI6IjEyYTNlYjUzLTlkYTctNGUwNS04NzhiLTQ0MzRjMTc3M2JlMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9hTE4wOGdSNmYiLCJjb2duaXRvOnVzZXJuYW1lIjoib2Jlb25saW5lIiwiYXVkIjoiMWpuN21lY292OGJoNGw2OHBwNTVhZGQ4ZWciLCJldmVudF9pZCI6ImMzMjBlYmEzLWVjODctNGMwNi1iNDk1LTA5ODEyMWRhOTZjYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjczNTYxNjkzLCJuYW1lIjoiT2JlIiwiZXhwIjoxNjczNTY1MjkzLCJpYXQiOjE2NzM1NjE2OTMsImp0aSI6IjY4NjcyNmY3LWFlZTQtNDQ4ZS05ZjA5LTY2ZWEwYmZkNzMwZiIsImVtYWlsIjoib2JlYWxleEBhbWF6b24uY29tIn0.kHbckKOOT44hpnLB2GSwZ2n55jO4emKXMlx55mp4ayL8epeExmPSctX4J7QHUcNyzs802HtKNa5MbOoMFpPfqh4xseuHUBykWUvO5GIVCcjYW1z5wROp1zJd_W74qJRv4qN9jbL1NuOLL9_e5tKteEmfMsf8Y5sccQ0xoybO6MUCyUb6zczBxNRGq4d347IzXj7JnIzKJeftxZUlTBOpDqpriaFZubR37cid_FTWTkmxT3yWs8rdHOfy9Ov5HXs8d0pPnK4Lnaxn_37r6y9o5Z8o3edyC_LJsNQvMRbynPiHhR4wiZ7s4nMe22bMPwxu2GqRx8p_yQKe_K9Pei1bRg"
    });

    return this.http.get<Replay>("https://6rcevvkb33.execute-api.us-east-2.amazonaws.com/api/replays/" + id, {headers: headers})
      .pipe(map(rawResponse => {

        rawResponse["Item"].id = rawResponse["Item"].videoId;
        //delete rawResponse["Item"].videoId;

        return this.parseReplay(rawResponse["Item"]);

      }))

  }

  getReplays() {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization" : "Bearer eyJraWQiOiJsSHFQN2VYMEx2NVhhZFE5KzNqdmQ5U2VTamNGYndEYUVRU0dtcTY2N1hJPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiclBRR1kzVWNHVVpGQy1MeFRxdlV6dyIsInN1YiI6IjEyYTNlYjUzLTlkYTctNGUwNS04NzhiLTQ0MzRjMTc3M2JlMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9hTE4wOGdSNmYiLCJjb2duaXRvOnVzZXJuYW1lIjoib2Jlb25saW5lIiwiYXVkIjoiMWpuN21lY292OGJoNGw2OHBwNTVhZGQ4ZWciLCJldmVudF9pZCI6ImMzMjBlYmEzLWVjODctNGMwNi1iNDk1LTA5ODEyMWRhOTZjYiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjczNTYxNjkzLCJuYW1lIjoiT2JlIiwiZXhwIjoxNjczNTY1MjkzLCJpYXQiOjE2NzM1NjE2OTMsImp0aSI6IjY4NjcyNmY3LWFlZTQtNDQ4ZS05ZjA5LTY2ZWEwYmZkNzMwZiIsImVtYWlsIjoib2JlYWxleEBhbWF6b24uY29tIn0.kHbckKOOT44hpnLB2GSwZ2n55jO4emKXMlx55mp4ayL8epeExmPSctX4J7QHUcNyzs802HtKNa5MbOoMFpPfqh4xseuHUBykWUvO5GIVCcjYW1z5wROp1zJd_W74qJRv4qN9jbL1NuOLL9_e5tKteEmfMsf8Y5sccQ0xoybO6MUCyUb6zczBxNRGq4d347IzXj7JnIzKJeftxZUlTBOpDqpriaFZubR37cid_FTWTkmxT3yWs8rdHOfy9Ov5HXs8d0pPnK4Lnaxn_37r6y9o5Z8o3edyC_LJsNQvMRbynPiHhR4wiZ7s4nMe22bMPwxu2GqRx8p_yQKe_K9Pei1bRg"
    });

    return this.http.get<Replay[]>("https://lzj2wvtri3.execute-api.us-east-2.amazonaws.com/replays", {headers: headers})
      .pipe(map(rawResponse => {

        const replays : Replay[] = [];

        for (const key in rawResponse["Items"]) {
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
