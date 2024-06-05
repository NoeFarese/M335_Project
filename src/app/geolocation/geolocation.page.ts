import { Component, inject, OnInit } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { Geolocation } from '@capacitor/geolocation';
import { PointService } from "../Services/point.service";
import { HapticService } from "../Services/haptic.service";
import { delay } from "rxjs";

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
  private hapticService = inject(HapticService);
  private pointService = inject(PointService);
  private taskCompleted: boolean = false; // New flag to ensure task is completed only once

  async checkCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
      console.log('Current', coordinates.coords.latitude, coordinates.coords.longitude);

      const latDiff = Math.abs(coordinates.coords.latitude - GeolocationEnum.latitude);
      const lonDiff = Math.abs(coordinates.coords.longitude - GeolocationEnum.longitude);

      // Define your acceptable margin of error (in degrees)
      const marginOfError = 0.0002;

      console.log(latDiff < marginOfError, lonDiff < marginOfError);
      this.isTaskDone = latDiff < marginOfError && lonDiff < marginOfError;

      if (this.isTaskDone && !this.taskCompleted) {
        this.taskCompleted = true; // Set the flag to true to prevent further execution
        await this.hapticService.vibrate();
        if (this.startTime) {
          this.pointService.checkTimeAndGivePoints(this.startTime, 30);
        }
      }
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  async ngOnInit() {
    this.startTime = Date.now();

    const intervalId = setInterval(async () => {
      if (!this.taskCompleted) { // Check the flag instead of isTaskDone
        await this.checkCurrentPosition();
      } else {
        clearInterval(intervalId);
      }
    }, 2000); // checks every two seconds
  }
}
