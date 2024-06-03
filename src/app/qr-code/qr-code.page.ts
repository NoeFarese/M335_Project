import { Component } from '@angular/core';
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: true,
    imports: [TaskComponent]
})
export class QRCodePage {
  isTaskDone: boolean = false;

  constructor() { }

}
