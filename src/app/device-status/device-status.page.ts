import {Component, inject, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import { Device } from "@capacitor/device";
import {HapticService} from "../Services/haptic.service";

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
  private hapticServce = inject(HapticService)

  constructor() { }

  ngOnInit() {
    this.startCheckingChargingStatus();
  }

  async checkChargingStatus() {
    const info = await Device.getBatteryInfo();
    if (info.isCharging) {
        this.isTaskDone = true;
        this.stopCheckingChargingStatus();
        await this.hapticServce.vibrate();
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
