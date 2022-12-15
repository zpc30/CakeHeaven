import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeComponent } from './core/cakes/cake/cake.component';
import { CakesComponent } from './core/cakes/cakes.component';
import { ContactComponent } from './core/contact/contact.component';
import { HomeComponent } from './core/home/home.component';
import { ProfileComponent } from './core/profile/profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cakes', component: CakesComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cakes/:id', component: CakeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
