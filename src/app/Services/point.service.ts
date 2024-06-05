import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor() { }

  initializeSchnitzeljagd() {
    localStorage.setItem('countSchnitzel', '0');
    localStorage.setItem('countKartoffel', '0');
    localStorage.setItem('startTime', Date.now().toString());
  }

  checkTimeAndGivePoints(startTime: number, timeGivenInSec: number) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    if (duration <= timeGivenInSec) {
      this.updateLocalStorage('countSchnitzel');
      console.log('PLUS schnitzel')
    } else {
      this.updateLocalStorage('countKartoffel')
      console.log()
    }
  }


  updateLocalStorage(key: string) {
    let value = localStorage.getItem(key);
    let count = value ? parseInt(value, 10) : 0;
    count += 1;
    localStorage.setItem(key, count.toString());
  }

  saveSchnitzeljagd() {
    const name = localStorage.getItem('name');
    const countSchnitzel = localStorage.getItem('countSchnitzel');
    const countKartoffel = localStorage.getItem('countKartoffel');
    const startTime = parseInt(localStorage.getItem('startTime') || '0');
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;


    const schnitzeljagd = {
      name: name,
      countSchnitzel: countSchnitzel,
      countKartoffel: countKartoffel,
      duration: duration,
      date: formattedDate
    };

    let schnitzeljagden = JSON.parse(localStorage.getItem('schnitzeljagden') || '[]');
    schnitzeljagden.push(schnitzeljagd);
    localStorage.setItem('schnitzeljagden', JSON.stringify(schnitzeljagden));
  }
}
