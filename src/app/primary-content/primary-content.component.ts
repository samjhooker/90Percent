import { Component, OnInit } from '@angular/core';
import { DhbService } from '../dhb.service';

@Component({
  selector: 'app-primary-content',
  templateUrl: './primary-content.component.html',
  styleUrls: ['./primary-content.component.scss']
})
export class PrimaryContentComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void { }

  navigateToInfoPage() {
    (window as any).open("https://www.health.govt.nz/your-health/healthy-living/immunisation/vaccine-safety", "_blank");
  }

  navigateToBookVaccinePage() {
    (window as any).open("https://bookmyvaccine.covid19.health.nz/", "_blank");
  }

}
