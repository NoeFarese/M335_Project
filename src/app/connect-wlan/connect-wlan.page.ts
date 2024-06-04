import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TaskComponent} from "../task/task.component";

@Component({
  selector: 'app-connect-wlan',
  templateUrl: './connect-wlan.page.html',
  styleUrls: ['./connect-wlan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TaskComponent]
})
export class ConnectWlanPage {
  isTaskDone: boolean = false;

  constructor() { }


}
