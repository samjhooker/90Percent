import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { FindValueOperator } from 'rxjs/internal/operators/find';
import { DhbUptake } from './models/DhbUptake';
import { DhbSummary } from './models/DhbSummary';


@Injectable({
  providedIn: 'root'
})
export class DhbService {

  public allData$ = new BehaviorSubject<DhbUptake[]>([]);
  public dhbSummaries$ = new BehaviorSubject<DhbSummary[]>([]);
  
  constructor(private http: HttpClient) { 
  
    this.http.get(environment.moh.dhbApiUrl, {responseType: 'text'})
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
                 row[2] ?? '' ,
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

  generateDhbData(data: DhbUptake[]) {
    const summaries: DhbSummary[] = [];
    for (let uptake of data ) {
      let summary = summaries.find(x => x.dhbName == uptake.dhbName);
      if (summary) {
        summary.totalPopulation += uptake.population;
        summary.totalFirstDoses += uptake.firstDoseAdministered;
        summary.totalSecondDoses += uptake.secondDoseAdministered;
      } else {
        let newSummary = new DhbSummary(uptake.dhbName)
        newSummary.totalPopulation += uptake.population;
        newSummary.totalFirstDoses += uptake.firstDoseAdministered;
        newSummary.totalSecondDoses += uptake.secondDoseAdministered;
        summaries.push(newSummary);
      }
    }
    this.dhbSummaries$.next(summaries);
  }

  handleError() {
    console.log('Whoops, I blame the government');
  }
}
