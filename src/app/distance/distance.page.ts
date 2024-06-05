import {Component, inject, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import { Geolocation } from '@capacitor/geolocation';
import {HapticService} from "../Services/haptic.service";
import {PointService} from "../Services/point.service";

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [TaskComponent]
})
export class DistancePage implements OnInit {
  isTaskDone: boolean = false;
  initialLon : number = 0;
  initialLat : number = 0;
  threshold : number = 20 // in meters
  startTime: number | undefined;
  private hapticService = inject(HapticService);
  private pointService = inject(PointService);

  constructor() { }

  async ngOnInit() {
    this.startTime = Date.now();

    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    this.initialLat = coordinates.coords.latitude;
    this.initialLon = coordinates.coords.longitude;

    this.startTracking();
  }

  async startTracking() {
    setInterval(async () => {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
      });

      const currentLat = coordinates.coords.latitude;
      const currentLon = coordinates.coords.longitude;
      const distance = this.haversineDistance(this.initialLat, this.initialLon, currentLat, currentLon);

      if (distance > this.threshold) {
        this.isTaskDone = true;
        await this.hapticService.vibrate();
        this.pointService.checkTimeAndGivePoints(this.startTime!, 30);
      }
      console.log('Distance: ', distance);
    }, 3000);
  }

  haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);

    const deltaLat = (lat2 - lat1) * (Math.PI / 180);
    const deltaLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }
}
