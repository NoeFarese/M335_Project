import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeCheckService {

  constructor() { }

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
