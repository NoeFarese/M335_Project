import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TaskComponent} from "../task/task.component";
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TaskComponent]
})
export class SensorPage implements OnInit, OnDestroy {
  isTaskDone: boolean = false;
  handle : PluginListenerHandle | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
    this.checkDeviceOriantation();
  }
  
  ngOnDestroy(): void {
    this.handle?.remove();
  }

  async checkDeviceOriantation(): Promise<void> {
    try {
       this.handle = await Motion.addListener('orientation', (event) => {
            const y = event.gamma;

            if ((y > -100 && y < -80) || (y > 80 && y < 100)) {
                this.isTaskDone = true;
            }
        }
      );
    } catch (error) {
        console.error('Fehler beim Überprüfen der Gerätestellung:', error);
    }
  }

}
