import {Component, inject, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import { Device } from "@capacitor/device";
import {HapticService} from "../Services/haptic.service";
import {TimeCheckService} from "../Services/time-check.service";

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.page.html',
  styleUrls: ['./device-status.page.scss'],
  standalone: true,
  imports: [TaskComponent]
})
export class DeviceStatusPage implements OnInit {
  isTaskDone: boolean = false;
  intervalId: any;
  startTime: number | undefined;
  private hapticService = inject(HapticService)
  private timeCheckService = inject(TimeCheckService);

  constructor() { }

  ngOnInit() {
    this.startTime = Date.now();
    this.startCheckingChargingStatus();
  }

  async checkChargingStatus() {
    const info = await Device.getBatteryInfo();
    if (info.isCharging) {
        this.isTaskDone = true;
        this.stopCheckingChargingStatus();
        await this.hapticService.vibrate();
        this.timeCheckService.checkTime(this.startTime!, 60);
    }
  }

  startCheckingChargingStatus() {
    this.intervalId = setInterval(() => {
      this.checkChargingStatus();
    }, 1000);
  }

  stopCheckingChargingStatus() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
