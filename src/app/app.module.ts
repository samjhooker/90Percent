import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PrimaryContentComponent } from './primary-content/primary-content.component';
import { DhbCellComponent } from './dhb-cell/dhb-cell.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { VaccinationsComponent } from './vaccinations/vaccinations.component';
import { LocationsOfInterestComponent } from './locations-of-interest/locations-of-interest.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PrimaryContentComponent,
    DhbCellComponent,
    AboutComponent,
    VaccinationsComponent,
    LocationsOfInterestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
