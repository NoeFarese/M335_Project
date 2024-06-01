import { Component } from '@angular/core';
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.page.html',
  styleUrls: ['./device-status.page.scss'],
  standalone: true,
  imports: [TaskComponent]
})
export class DeviceStatusPage {
  isTaskDone: boolean = false;

  constructor() { }

}
