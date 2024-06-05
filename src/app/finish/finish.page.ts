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
import {HttpClient} from "@angular/common/http";

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
  private http = inject(HttpClient)
  name: string | null = '';
  countSchnitzel: string | null = '';
  countKartoffel: string | null = '';
  duration: number = 0;

  constructor() { }

  ngOnInit() {
    this.getSchnitzeljagdData();
    this.postSchnitzeljagdData();
  }

  navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }

  getSchnitzeljagdData(){
    this.name = localStorage.getItem('name');
    this.countSchnitzel = localStorage.getItem('countSchnitzel');
    this.countKartoffel = localStorage.getItem('countKartoffel');
    this.duration = this.calculateSchnitzeljagdTime();
  }

  postSchnitzeljagdData(){
    const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
    const body = `entry.1860183935=${this.name}` +
      `&entry.564282981=${this.countSchnitzel}` +
      `&entry.1079317865=${this.countKartoffel}` +
      `&entry.985590604=${this.duration}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    this.http.post(url, body, { headers: headers });
  }

  calculateSchnitzeljagdTime(){
    const endTime = Date.now().toString();
    const startTime = localStorage.getItem('startTime') ?? '0';
    return (parseInt(endTime) - parseInt(startTime, 10)) / 1000;
  }
}
