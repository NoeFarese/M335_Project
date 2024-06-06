import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { Geolocation } from '@capacitor/geolocation';
import { PointService } from "../Services/point.service";
import { HapticService } from "../Services/haptic.service";

enum GeolocationEnum {
  latitude = 47.071945403994924,
  longitude = 8.348885173299777
}

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [TaskComponent]
})
export class GeolocationPage implements OnInit {
  isTaskDone: boolean = false;
  startTime: number | undefined;
  watchId: string | undefined;
  threshold: number = 3; // in meters
  currentDistance: string = '0';
  private hapticService = inject(HapticService);
  private pointService = inject(PointService);
  cdr = inject(ChangeDetectorRef)

  async ngOnInit() {
    this.startTime = Date.now();

    const watcher = Geolocation.watchPosition({enableHighAccuracy: true,}, async (position) => {
      if (position != null) {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;

        const distance = this.haversineDistanceToFixedPoint(currentLat, currentLon);
        this.currentDistance = distance.toFixed(2);

        if(distance < this.threshold){
          this.isTaskDone = true;
          this.stopWatcher();
          this.pointService.checkTimeAndGivePoints(this.startTime!, 300);
          await this.hapticService.vibrate();
        }

        this.cdr.detectChanges();
      }
    });

    this.watchId = await watcher;
  }

  haversineDistanceToFixedPoint(currentLat: number, currentLon: number): number {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = currentLat * (Math.PI / 180);
    const lat2Rad = GeolocationEnum.latitude * (Math.PI / 180);

    const deltaLat = (GeolocationEnum.latitude - currentLat) * (Math.PI / 180);
    const deltaLon = (GeolocationEnum.longitude - currentLon) * (Math.PI / 180);

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

  stopWatcher() {
    if (this.watchId !== undefined) {
      Geolocation.clearWatch({ id: this.watchId });
    } else {
      console.error('watchId is undefined');
    }
  }
}


