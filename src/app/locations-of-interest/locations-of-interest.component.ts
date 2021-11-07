import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

@Component({
  selector: 'app-locations-of-interest',
  templateUrl: './locations-of-interest.component.html',
  styleUrls: ['./locations-of-interest.component.scss']
})
export class LocationsOfInterestComponent implements OnInit {

  mapService: MapService;

  constructor(mapService: MapService) { 
    this.mapService = mapService;
  }

  ngOnInit(): void {
    this.mapService.setShowLocationsOfInterest(true);
  }

}
