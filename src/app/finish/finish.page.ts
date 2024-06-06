import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  IonButton,
  IonCard, IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import { CapacitorHttp } from "@capacitor/core";
import {PointService} from "../Services/point.service";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class FinishPage implements OnInit {
  private router = inject(Router)
  private pointService = inject(PointService)
  schnitzelJagd: any;

  constructor() { }

  ngOnInit() {
    this.pointService.saveSchnitzeljagd();
    this.getSchnitzeljagdData();
    this.postSchnitzeljagdData();
  }

  navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }

  getSchnitzeljagdData(){
    const schnitzeljagden = JSON.parse(localStorage.getItem('schnitzeljagden') || '[]');
    if (schnitzeljagden.length > 0) {
      this.schnitzelJagd = schnitzeljagden[schnitzeljagden.length - 1];
    }
  }

  async postSchnitzeljagdData() {
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
    const body = `entry.1860183935=${this.schnitzelJagd.name}` +
      `&entry.564282981=${this.schnitzelJagd.countSchnitzel}` +
      `&entry.1079317865=${this.schnitzelJagd.countKartoffel}` +
      `&entry.985590604=${this.schnitzelJagd.duration}`;
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};

    const options = {
      url: url,
      headers: headers,
      data: body
    }

    const response = await CapacitorHttp.post(options);
    console.log('RESPONSE STATUS POST', response.status)
    console.log(response)
  }
}
