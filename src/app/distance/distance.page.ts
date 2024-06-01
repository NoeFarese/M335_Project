import {Component} from '@angular/core';
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-distance',
  templateUrl: './distance.page.html',
  styleUrls: ['./distance.page.scss'],
  standalone: true,
  imports: [TaskComponent]
})
export class DistancePage {
  isTaskDone: boolean = false;

  constructor() { }

}
