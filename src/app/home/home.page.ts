import {Component, inject, OnInit} from '@angular/core';
import {
  AlertController,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {PointService} from "../Services/point.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class HomePage implements OnInit {
  rows: any[] = [];

  private alertController = inject(AlertController)
  private router = inject(Router)
  private pointSerivce = inject(PointService)

  constructor() { }

  ngOnInit() {
    this.loadSchnitzeljagden();
  }

  ionViewWillEnter() {
    this.loadSchnitzeljagden();
  }

  loadSchnitzeljagden() {
    const schnitzeljagden = JSON.parse(localStorage.getItem('schnitzeljagden') || '[]');
    this.rows = schnitzeljagden.reverse().slice(0, 15);
  }

  async enterNameAlert() {
    const alert = await this.alertController.create({
      header: 'Gebe deinen Namen ein',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Dein Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            if (data.name !== '') {
              this.askForCameraAccessAlert();
              localStorage.setItem('name', data.name);
            } else {
              console.error('name required');
              this.nameRequiredWarningAlert();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async nameRequiredWarningAlert(){
    const alert = await this.alertController.create({
      header: 'Du musst einen Namen eingeben',
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async askForCameraAccessAlert(){
    const alert = await this.alertController.create({
      header: 'Schnitzeljagd möchte auf deine Kamera zugreifen',
      message: 'Hiermit kannst du Fotos von Schnitzeljagd aus aufnehmen',
      buttons: [
        {
          text: 'nicht erlauben',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.askForLocationAccessAlert();
          }
        }
      ]
    });

    await alert.present();
  }

  async askForLocationAccessAlert(){
    const alert = await this.alertController.create({
      header: '“Schnitzeljagd” möchte auf deinen Standort zugreifen',
      message: 'Hiermit kannst du Schnitzeljagden absolvieren',
      buttons: [
        {
          text: 'nicht erlauben',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.pointSerivce.initializeSchnitzeljagd();
            this.router.navigate(['/geolocation']);
          }
        }
      ]
    });

    await alert.present();
  }
}
