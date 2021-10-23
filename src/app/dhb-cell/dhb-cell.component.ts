import { Component, Input, OnInit } from '@angular/core';
import { DhbSummary } from '../models/DhbSummary';

@Component({
  selector: 'app-dhb-cell',
  templateUrl: './dhb-cell.component.html',
  styleUrls: ['./dhb-cell.component.scss']
})
export class DhbCellComponent implements OnInit {

  @Input()
  dhbSummary: DhbSummary | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
