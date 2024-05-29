import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonLabel,
  IonItem, IonCol, IonRow, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonLabel, IonItem, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonGrid, IonCol],
})
export class HomePage {
  rows = [
    { name: 'Row 1', date: '123', emoji1: '456', emoji2: '456' },
    { name: 'Row 2', date: '123', emoji1: '456', emoji2: '456' },
    { name: 'Row 3', date: '123', emoji1: '456', emoji2: '456' },
    { name: 'Row 4', date: '123', emoji1: '456', emoji2: '456' },
    { name: 'Row 5', date: '123', emoji1: '456', emoji2: '456' },
    { name: 'Row 6', date: '123', emoji1: '456', emoji2: '456' },
    { name: 'Row 7', date: '123', emoji1: '456', emoji2: '456' },
  ];

  constructor() {}
}
