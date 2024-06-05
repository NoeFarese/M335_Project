import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeCheckService {

  constructor() { }

  checkTime(startTime: number) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    if (duration <= 60) {
      console.log("gewonnen", duration);
      this.updateLocalStorage('countSchnitzel');
    } else {
      console.log("verloren", duration);
      this.updateLocalStorage('countKartoffel')
    }
  }

  updateLocalStorage(key: string) {
    let value = localStorage.getItem(key);
    let count = value ? parseInt(value, 10) : 0;
    count += 1;
    localStorage.setItem(key, count.toString());
  }

  calculateSchnitzelJagdTime(){
    const endTime = Date.now().toString();
    const startTime = localStorage.getItem('startTime') ?? '0';
    return (parseInt(endTime) - parseInt(startTime, 10)) / 1000;
  }
}
