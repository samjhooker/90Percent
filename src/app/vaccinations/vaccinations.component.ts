import { Component, OnInit } from '@angular/core';
import { DhbService } from '../dhb.service';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrls: ['./vaccinations.component.scss']
})
export class VaccinationsComponent implements OnInit {

  dhbService: DhbService;

  constructor(dhbService: DhbService) { 
    this.dhbService = dhbService;
  }
  
  ngOnInit(): void {
  }

}
