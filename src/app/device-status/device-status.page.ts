import {Component, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import { Device } from "@capacitor/device";

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

  constructor() { }

  ngOnInit() {
    this.startCheckingChargingStatus();
  }

  async checkChargingStatus() {
    const info = await Device.getBatteryInfo();
    if (info.isCharging) {
        this.isTaskDone = true;
        this.stopCheckingChargingStatus();
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
