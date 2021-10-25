import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DhbUptake } from './models/DhbUptake';
import { DhbSummary } from './models/DhbSummary';
import { DhbCategory } from './models/DhbCategory';

@Injectable({
  providedIn: 'root'
})
export class DhbService {

  public allData$ = new BehaviorSubject<DhbUptake[]>([]);
  public dhbSummaries$ = new BehaviorSubject<DhbSummary[]>([]);

  dhbsToIgnore = ['Overseas / Unknown', 'Various'];

  constructor(private http: HttpClient) {

    this.http.get(environment.moh.dhbApiUrl, { responseType: 'text' })
      .subscribe(
        data => {
          const dhbUpdate: DhbUptake[] = [];
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            dhbUpdate.push(
              new DhbUptake(
                row[0] ?? '',
                row[1] ?? '',
                row[2] ?? '',
                row[3] ?? '',
                ~~row[4] ?? -1,
                ~~row[5] ?? -1,
                ~~row[6] ?? -1,
                ~~row[7] ?? -1,
                ~~row[8] ?? -1,
              ));
          }
          this.allData$.next(dhbUpdate);

          this.generateDhbData(dhbUpdate);
        },
        error => this.handleError
      );

  }

  getDhbCategory(dhbName: string, keyName: string): Promise<DhbCategory[]> {
    return new Promise((res, rej) => {
      this.allData$
        .pipe(skipWhile(x => !x.length))
        .subscribe((allData: DhbUptake[]) => {
          const dhbData = allData.filter(x => x.dhbName == dhbName);
          if (!dhbData)
            return rej("Hey, that's not a district health board!!!")

          let data = this.generateCategoryData(dhbData, keyName);
          res(data);
        });
    });
  }


  private generateCategoryData(data: DhbUptake[], categoryKey: string): DhbCategory[] {
    const categories: DhbCategory[] = [];
    for (let uptake of data) {
      let category : DhbCategory = categories.find(x => x.categoryName == uptake[categoryKey as keyof typeof uptake]) as DhbCategory ?? null;
      if (category) {
        category.totalPopulation += uptake.population;
        category.totalFirstDoses += uptake.firstDoseAdministered;
        category.totalSecondDoses += uptake.secondDoseAdministered;
      } else {
        let newCategory = new DhbCategory(uptake[categoryKey as keyof typeof uptake].toString())
        newCategory.totalPopulation += uptake.population;
        newCategory.totalFirstDoses += uptake.firstDoseAdministered;
        newCategory.totalSecondDoses += uptake.secondDoseAdministered;
        categories.push(newCategory);
      }
    }
    return categories;
  }

  private generateDhbData(data: DhbUptake[]) {
    const summaries: DhbSummary[] = [];
    for (let uptake of data) {
      let summary = summaries.find(x => x.dhbName == uptake.dhbName);
      if (summary) {
        summary.totalPopulation += uptake.population;
        summary.totalFirstDoses += uptake.firstDoseAdministered;
        summary.totalSecondDoses += uptake.secondDoseAdministered;
        summary.allUptakes.push(uptake);
      } else if (!this.dhbsToIgnore.includes(uptake.dhbName)){
        let newSummary = new DhbSummary(uptake.dhbName)
        newSummary.totalPopulation += uptake.population;
        newSummary.totalFirstDoses += uptake.firstDoseAdministered;
        newSummary.totalSecondDoses += uptake.secondDoseAdministered;
        newSummary.allUptakes.push(uptake);
        summaries.push(newSummary);
      }
    }
    this.dhbSummaries$.next(summaries);
  }

  handleError() {
    console.log('Whoops, I blame the government');
  }
}
