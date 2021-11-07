import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DhbUptake } from './models/DhbUptake';
import { LocationOfInterest, LoiFeature } from './models/LocationOfInterest';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public allLocationsOfInterest$ = new BehaviorSubject<LocationOfInterest | undefined>(undefined);
  public selectedDhb = new Subject<any>();
  public showLocationsOfInterest$ = new Subject<boolean>();

  loaded = false;

  constructor(private http: HttpClient) {
    this.loadLocationsOfInterest();
  }

  selectDhb(dhbName: string) {
      this.selectedDhb.next(dhbName);
  }

  getSelectedDhb(): Observable<any> {
      return this.selectedDhb.asObservable();
  }

  setShowLocationsOfInterest(show: boolean) {
    this.showLocationsOfInterest$.next(show);
  }

  getShowLocationsOfInterest(): Observable<boolean> {
      return this.showLocationsOfInterest$.asObservable();
  }

  loadLocationsOfInterest() {
    if (this.loaded)
      return;
    return this.http.get(environment.moh.loiApiUrl, { responseType: 'json' })
    .subscribe(
      data  => {
        let newData = data as LocationOfInterest;
        newData.features = newData.features.sort((a, b) => Date.parse(a.properties.Added) < Date.parse(b.properties.Added) ? 1 : -1);
        this.allLocationsOfInterest$.next(newData);
        this.loaded = true;
      },
      error => this.handleError
    );
  }

  getLocationOfInterest(loiId: string): Promise<LoiFeature> {
    return new Promise((res, rej) => {
      this.allLocationsOfInterest$
        .pipe(skipWhile(x => !x))
        .subscribe((allLoi: LocationOfInterest | undefined) => {
          const loi = allLoi?.features.find(a => a.properties.id == loiId);
          if (!loi)
            return rej("Hey, that's not a real Location of Interest!!!")
          res(loi);
        });
    });
  }

  handleError() {
    console.log('Whoops, I blame the government');
  }
}
