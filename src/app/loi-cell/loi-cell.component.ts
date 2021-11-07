import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoiFeature } from '../models/LocationOfInterest';

@Component({
  selector: 'app-loi-cell',
  templateUrl: './loi-cell.component.html',
  styleUrls: ['./loi-cell.component.scss']
})
export class LoiCellComponent implements OnInit {

  @Input()
  loiFeature: LoiFeature | undefined;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToLocationOfInterest() {
    this.router.navigate([`/locationsOfInterest/${this.loiFeature?.properties?.id}`]);
  }

}
