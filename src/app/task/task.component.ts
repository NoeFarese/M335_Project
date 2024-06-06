import {Component, inject, Input} from '@angular/core';
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
import {TimerComponent} from "../timer/timer.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonButton,
    TimerComponent
  ],
  standalone: true
})
export class TaskComponent {

  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() availableTime: string | undefined;
  @Input() progressValue: number | undefined;
  @Input() isTaskDone: boolean | undefined;
  @Input() nextRoute: string | undefined;
  @Input() timerTime!: number;
  private router = inject(Router);

  constructor() { }

  navigateToNextTask() {
    this.router.navigate([this.nextRoute]);
  }

  stopCurrentSchnitzeljagd() {
    this.router.navigate(['/home']);
  }
}
