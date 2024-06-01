import {Component, inject} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class FinishPage {
  private router = inject(Router)

  constructor() { }

  navigateToHomePage(): void {
    this.router.navigate(['/home']);
  }

}
