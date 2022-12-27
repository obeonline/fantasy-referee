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

  @Input() votes: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }


}
