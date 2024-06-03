import {Component, inject, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [
    IonicModule
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
  private router = inject(Router);

  constructor() { }

  navigateToNextTask() {
    this.router.navigate([this.nextRoute]);
  }

  stopCurrentSchnitzeljagd() {
    this.router.navigate(['/home']);
  }
}
