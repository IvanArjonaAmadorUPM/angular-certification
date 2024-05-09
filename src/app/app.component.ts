import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import {StepperComponent} from './components/stepper/stepper.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule, StepperComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
