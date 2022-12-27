import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReplaysComponent } from './list-replays/list-replays.component';
import { ModelTestComponent } from './model-test/model-test.component';
import { ShowReplayComponent } from './show-replay/show-replay.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { VideoTestComponent } from './video-test/video-test.component';
import { VoteChartComponent } from './vote-chart/vote-chart.component';

const routes: Routes = [

  { path: 'replays',    component: ListReplaysComponent },
  { path: 'replays/:id', component: ShowReplayComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'votes', component: VoteChartComponent },
  { path: 'test', component: VideoTestComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
