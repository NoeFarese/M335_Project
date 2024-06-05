import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor() { }

  initializeSchnitzeljagd(){
    localStorage.setItem('countSchnitzel', '0');
    localStorage.setItem('countKartoffel', '0');
    localStorage.setItem('startTime', Date.now().toString());
  }

  checkTimeAndGivePoints(startTime: number, timeGivenInSec: number) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    if (duration <= timeGivenInSec) {
      this.updateLocalStorage('countSchnitzel');
    } else {
      this.updateLocalStorage('countKartoffel')
    }
  }

  updateLocalStorage(key: string) {
    let value = localStorage.getItem(key);
    let count = value ? parseInt(value, 10) : 0;
    count += 1;
    localStorage.setItem(key, count.toString());
  }
}
