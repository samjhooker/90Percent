import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DhbVaccinationsComponent } from './dhb-vaccinations/dhb-vaccinations.component';
import { LocationsOfInterestComponent } from './locations-of-interest/locations-of-interest.component';
import { LocationOfInterestComponent } from './location-of-interest/location-of-interest.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';

const routes: Routes = [
  { path: '', redirectTo: 'vaccinations', pathMatch: 'full'},
  { path: "vaccinations", component: VaccinationsComponent},    
  { path: "vaccinations/:dhbName", component: DhbVaccinationsComponent},    

  { path: "locationsOfInterest", component: LocationsOfInterestComponent},    
  { path: "locationsOfInterest/:loiId", component: LocationOfInterestComponent},    
  { path: "about", component: AboutComponent},    
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
