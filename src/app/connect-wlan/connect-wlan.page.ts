import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {TaskComponent} from "../task/task.component";
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-connect-wlan',
  templateUrl: './connect-wlan.page.html',
  styleUrls: ['./connect-wlan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TaskComponent]
})
export class ConnectWlanPage implements OnInit {
  isTaskDone : boolean = false;
  cdr = inject(ChangeDetectorRef)

  constructor() { }

  ngOnInit() {
    this.checkWlanStatus();
  }

  async checkWlanStatus(): Promise<void> {
    try {
      Network.addListener('networkStatusChange', (status) => {
        console.log('Network status changed', status.connected);
        if (status.connected == true) {
         this.isTaskDone = true;
         this.cdr.detectChanges();
        }
      });
    }
    catch (error) {
      console.error('Fehler beim Überprüfen der Gerätestellung:', error);
    }
  }

}
