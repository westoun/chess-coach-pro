import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovePredictorComponent } from './move-predictor/move-predictor.component';

const routes: Routes = [
  {
    path: 'move-predictor',
    component: MovePredictorComponent,
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
