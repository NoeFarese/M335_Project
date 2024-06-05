import {Component, inject, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {Geolocation} from '@capacitor/geolocation';
import {PointService} from "../Services/point.service";
import {HapticService} from "../Services/haptic.service";
import {delay} from "rxjs";

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
export class GeolocationPage implements OnInit{
  isTaskDone: boolean = false;
  startTime: number | undefined;
  private hapticService = inject(HapticService)
  private pointService = inject(PointService);

  async checkCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
      console.log('Current', coordinates.coords.latitude, coordinates.coords.longitude);

      const latDiff = Math.abs(coordinates.coords.latitude - GeolocationEnum.latitude);
      const lonDiff = Math.abs(coordinates.coords.longitude - GeolocationEnum.longitude);

      // Define your acceptable margin of error (in degrees)
      const marginOfError = 0.0002;

      console.log(latDiff < marginOfError, lonDiff < marginOfError)
      this.isTaskDone = latDiff < marginOfError && lonDiff < marginOfError;

      if(this.isTaskDone){
        await this.hapticService.vibrate();
        this.pointService.checkTimeAndGivePoints(this.startTime!, 30);
      }
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  async ngOnInit() {
    this.startTime = Date.now();

    const intervalId = setInterval(async () => {
      if (!this.isTaskDone) {
        await this.checkCurrentPosition();
        delay(2000);
      } else {
        clearInterval(intervalId);
      }
    }, 2000); // checks every two seconds
  }
}
