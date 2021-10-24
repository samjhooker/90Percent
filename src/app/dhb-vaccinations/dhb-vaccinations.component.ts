import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { DhbService } from '../dhb.service';
import { DhbCategory } from '../models/DhbCategory';

@Component({
  selector: 'app-dhb-vaccinations',
  templateUrl: './dhb-vaccinations.component.html',
  styleUrls: ['./dhb-vaccinations.component.scss']
})
export class DhbVaccinationsComponent implements OnInit {
  dhbCategories$: Observable<DhbCategory[]> | undefined;
  dhbName = ''
  selectedMenuValue = 'dhbName';

  constructor(private route: ActivatedRoute, private dhbService: DhbService) { }

  ngOnInit(): void {
    this.dhbName = this.route.snapshot.params['dhbName'];

    this.dhbCategories$ = from(this.dhbService.getDhbCategory(this.dhbName, 'dhbName'));
  }

  selectMenuItem(menuValue: string) {
    this.selectedMenuValue = menuValue;
    this.dhbCategories$ = from(this.dhbService.getDhbCategory(this.dhbName, menuValue));
  }

}
