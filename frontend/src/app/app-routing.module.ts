import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovePredictorComponent } from './move-predictor/move-predictor.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  {
    path: 'move-predictor',
    component: MovePredictorComponent,
  },
  {
    path: 'activity',
    component: ActivityComponent,
  },
  {
    path: '**',
    redirectTo: 'move-predictor',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
