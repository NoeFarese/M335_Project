import {Component, inject} from '@angular/core';
import {AlertController} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
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

  async startNewSchnitzelJagd() {
    const alert = await this.alertController.create({
      header: 'Enter Name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Your Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Confirm Ok', data);
            this.router.navigate(['/'], {queryParams: {name: data.name}});
          }
        }
      ]
    });

    await alert.present();
  }
}
