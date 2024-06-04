import { Component } from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {IonButton} from "@ionic/angular/standalone";
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: true,
    imports: [TaskComponent, IonButton]
})
export class QRCodePage {
  isTaskDone: boolean = false;
  predefinedSequence = "M335@ICT-BZ";

  constructor() { }

  async scanBarcode(): Promise<void> {
    try {
        const barcode = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });
        console.log('Barcode data:', barcode.ScanResult);

        if (barcode.ScanResult === this.predefinedSequence) {
          this.isTaskDone = true;
          console.log('Die Barcode-Daten stimmen mit der vordefinierten Zahlenfolge überein.');
      } else {
          console.log('Die Barcode-Daten stimmen NICHT mit der vordefinierten Zahlenfolge überein.');
      }
    } catch (error) {
        console.error('Fehler beim Scannen des Barcodes:', error);
    }
  }
}
