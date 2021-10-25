import { Component, OnInit } from '@angular/core';
import { DhbService } from '../dhb.service';
import { MapService } from '../map.service';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.scss']
})
export class VaccinationsComponent implements OnInit {

  dhbService: DhbService;

  constructor(dhbService: DhbService, private mapService: MapService) { 
    this.dhbService = dhbService;
  }
  
  ngOnInit(): void {
    this.mapService.setShowLocationsOfInterest(false);

  }

}
