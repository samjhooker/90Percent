import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LocationsOfInterestComponent } from './locations-of-interest/locations-of-interest.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';

const routes: Routes = [
  { path: '', redirectTo: 'vaccinations', pathMatch: 'full'},
  { path: "vaccinations", component: VaccinationsComponent},    
  { path: "locationsOfInterest", component: LocationsOfInterestComponent},    
  { path: "about", component: AboutComponent},    
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
