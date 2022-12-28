import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ListReplaysComponent } from './list-replays/list-replays.component';
import { ShowReplayComponent } from './show-replay/show-replay.component';
import { ReplayVoteStatsComponent } from './replay-vote-stats/replay-vote-stats.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLoginControlsComponent } from './user-login-controls/user-login-controls.component';
import { VoteChartComponent } from './vote-chart/vote-chart.component';
import { ModelTestComponent } from './model-test/model-test.component';
import { VideoTestComponent } from './video-test/video-test.component';

@NgModule({
  declarations: [
    AppComponent,
    ListReplaysComponent,
    ShowReplayComponent,
    ReplayVoteStatsComponent,
    UserLoginComponent,
    UserLoginControlsComponent,
    VoteChartComponent,
    ModelTestComponent,
    VideoTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
