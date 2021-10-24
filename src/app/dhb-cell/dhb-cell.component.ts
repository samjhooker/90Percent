import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DhbSummary } from '../models/DhbSummary';

@Component({
  selector: 'app-dhb-cell',
  templateUrl: './dhb-cell.component.html',
  styleUrls: ['./dhb-cell.component.scss']
})
export class DhbCellComponent implements OnInit {

  @Input()
  dhbSummary: DhbSummary | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToDhbVaccinations() {
    this.router.navigate([`/vaccinations/${this.dhbSummary?.dhbName}`]);
  }

}
