import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReplaysComponent } from './list-replays/list-replays.component';
import { ShowReplayComponent } from './show-replay/show-replay.component';

const routes: Routes = [

  { path: 'replays',    component: ListReplaysComponent },
  { path: 'replays/:id', component: ShowReplayComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
