import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { MapService } from '../map.service';
import { LoiFeature } from '../models/LocationOfInterest';

@Component({
  selector: 'app-location-of-interest',
  templateUrl: './location-of-interest.component.html',
  styleUrls: ['./location-of-interest.component.scss']
})
export class LocationOfInterestComponent implements OnInit {
  loiId = ''
  loi$: Observable<LoiFeature> | undefined = undefined;
  
  constructor(private route: ActivatedRoute, private mapService: MapService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loiId = params?.loiId;
      this.loi$ = from(this.mapService.getLocationOfInterest(this.loiId));
    });
  }


}
