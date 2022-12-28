import { Component, Input, OnInit } from '@angular/core';

declare function showChart(confirmedCount: number, overturnedCount: number): any;

@Component({
  selector: 'vote-chart',
  templateUrl: './vote-chart.component.html',
  styleUrls: ['./vote-chart.component.scss']
})
export class VoteChartComponent implements OnInit  {

  @Input() votes : any;

  ngOnInit() {

    if (!this.votes) {
      this.votes = {confirm: 198, overturn: 113}
    }

    showChart(this.votes.confirm,this.votes.overturn);

  }
}
