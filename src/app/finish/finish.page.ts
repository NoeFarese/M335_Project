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
  name: string | null = '';
  countSchnitzel: string | null = '';
  countKartoffel: string | null = '';
  duration: number = 0;

  constructor() { }

  ngOnInit() {
    this.getSchnitzeljagdStats();
  }

  navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }

  getSchnitzeljagdStats(){
    this.name = localStorage.getItem('name');
    this.countSchnitzel = localStorage.getItem('countSchnitzel');
    this.countKartoffel = localStorage.getItem('countKartoffel');
    this.duration = this.calculateSchnitzeljagdTime();
  }

  calculateSchnitzeljagdTime(){
    const endTime = Date.now().toString();
    const startTime = localStorage.getItem('startTime') ?? '0';
    return (parseInt(endTime) - parseInt(startTime, 10)) / 1000;
  }
}
