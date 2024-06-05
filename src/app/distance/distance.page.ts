import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
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
  initialLon: number = 0;
  initialLat: number = 0;
  threshold: number = 20; // in meters
  watchId: string | undefined;
  startTime: number | undefined;
  currentDistance: string = '0';
  
  cdr = inject(ChangeDetectorRef)
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
 
    const watcher = Geolocation.watchPosition({enableHighAccuracy: true,}, async (position) => {
      if (position != null) {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;

        const distance = this.haversineDistance(this.initialLat, this.initialLon, currentLat, currentLon);

        this.currentDistance = distance.toFixed(2);

        if(distance > this.threshold){
          this.isTaskDone = true;
          this.stopWatcher();
          this.pointService.checkTimeAndGivePoints(this.startTime!, 30);
          await this.hapticService.vibrate();
        }

        this.cdr.detectChanges();
      }
    });

    this.watchId = await watcher;
  }

  stopWatcher() {
    if (this.watchId !== undefined) {
      Geolocation.clearWatch({ id: this.watchId });
    } else {
      console.error('watchId is undefined');
    }
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