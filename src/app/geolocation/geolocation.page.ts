import {Component} from '@angular/core';
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [TaskComponent]
})
export class GeolocationPage {
  isTaskDone: boolean = false;

  constructor() { }

}
