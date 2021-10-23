import { Component, OnInit } from '@angular/core';
import { DhbService } from '../dhb.service';

@Component({
  selector: 'app-primary-content',
  templateUrl: './primary-content.component.html',
  styleUrls: ['./primary-content.component.scss']
})
export class PrimaryContentComponent implements OnInit {

  dhbService: DhbService;

  constructor(dhbService: DhbService) { 
    this.dhbService = dhbService;
  }

  ngOnInit(): void { }

}
