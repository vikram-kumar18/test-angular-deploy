import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SentimentDetailComponent } from './components/sentiment-detail/sentiment-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sentiment/:symbol', component: SentimentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
