import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TaskComponent} from "../task/task.component";
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import {HapticService} from "../Services/haptic.service";
import {PointService} from "../Services/point.service";

@Component({
  selector: 'app-connect-wlan',
  templateUrl: './connect-wlan.page.html',
  styleUrls: ['./connect-wlan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TaskComponent]
})
export class ConnectWlanPage implements OnInit {
  isTaskDone : boolean = false;
  handle : PluginListenerHandle | undefined = undefined;
  startTime: number | undefined;
  cdr = inject(ChangeDetectorRef)
  private hapticService = inject(HapticService)
  private pointService = inject(PointService);

  constructor() { }

  ngOnInit() {
    this.startTime = Date.now();
    this.checkWlanStatus();
  }

  async checkWlanStatus(): Promise<void> {
    try {
      this.handle = await Network.addListener('networkStatusChange', async (status) => {
        console.log('Listening')
        if (status.connected) {
          this.handle?.remove();
          this.isTaskDone = true;
          await this.hapticService.vibrate();
          this.pointService.checkTimeAndGivePoints(this.startTime!, 120);
          this.cdr.detectChanges();
        }
      });
    }
    catch (error) {
      console.error('Fehler beim Überprüfen der Gerätestellung:', error);
    }
  }
}
