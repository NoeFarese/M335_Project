import {Component, inject, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {IonButton} from "@ionic/angular/standalone";
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { HapticService } from "../Services/haptic.service";
import {TimeCheckService} from "../Services/time-check.service";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: true,
    imports: [TaskComponent, IonButton]
})
export class QRCodePage implements OnInit {
  isTaskDone: boolean = false;
  predefinedSequence = "M335@ICT-BZ";
  startTime: number | undefined;
  private hapticService = inject(HapticService);
  private timeCheckService = inject(TimeCheckService);


  constructor() { }

  ngOnInit(): void {
    this.startTime = Date.now();
  }

  async scanBarcode(): Promise<void> {
    try {
        const barcode = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });
        console.log('Barcode data:', barcode.ScanResult);

        if (barcode.ScanResult === this.predefinedSequence) {
          this.isTaskDone = true;
          await this.hapticService.vibrate();
          this.timeCheckService.checkTimeAndGivePoints(this.startTime!, 60);
        }
    } catch (error) {
        console.error('Fehler beim Scannen des Barcodes:', error);
    }
  }
}
