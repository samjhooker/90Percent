import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocationOfInterest } from './models/LocationOfInterest';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public allLocationsOfInterest$ = new BehaviorSubject<any>(null);
  public selectedDhb = new Subject<any>();
  public showLocationsOfInterest$ = new Subject<boolean>();

  loaded = false;

  constructor(private http: HttpClient) { }

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
      data => {
        this.allLocationsOfInterest$.next(data);
        this.loaded = true;
      },
      error => this.handleError
    );
  }

  handleError() {
    console.log('Whoops, I blame the government');
  }
}
