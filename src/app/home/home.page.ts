import {Component, inject} from '@angular/core';
import {
  AlertController,
  IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol,
  IonContent, IonGrid,
  IonHeader, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";

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
export class HomePage {
  rows = [
    {name: 'Row 1', date: '123', emoji1: '456', emoji2: '456'},
    {name: 'Row 2', date: '123', emoji1: '456', emoji2: '456'},
    {name: 'Row 3', date: '123', emoji1: '456', emoji2: '456'},
    {name: 'Row 4', date: '123', emoji1: '456', emoji2: '456'},
    {name: 'Row 5', date: '123', emoji1: '456', emoji2: '456'},
    {name: 'Row 6', date: '123', emoji1: '456', emoji2: '456'},
    {name: 'Row 7', date: '123', emoji1: '456', emoji2: '456'},
  ];

  private alertController = inject(AlertController)
  private router = inject(Router)

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
      message: 'Hiermit kannst du Fotots von Schnitzeljagd aus aufnehmen',
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
            this.router.navigate(['/geolocation']);
          }
        }
      ]
    });

    await alert.present();
  }
}
