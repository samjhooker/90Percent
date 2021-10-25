import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

    private selectedDhb = new Subject<any>();

    selectDhb(dhbName: string) {
        this.selectedDhb.next(dhbName);
    }

    clearSelectedDhb() {
        this.selectedDhb.next();
    }

    getSelectedDhb(): Observable<any> {
        return this.selectedDhb.asObservable();
    }
}
