import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  standalone: true,
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input()
  totalSeconds!: number;
  minutes: number | undefined;
  seconds: number | undefined;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    const countdown$ = interval(1000).pipe(
      map(() => --this.totalSeconds),
      takeWhile(seconds => seconds >= 0)
    );

    countdown$.subscribe(seconds => {
      this.minutes = Math.floor(seconds / 60);
      this.seconds = seconds - this.minutes * 60;
    });
  }
}
