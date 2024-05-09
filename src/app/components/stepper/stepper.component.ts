import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  isSetter2Available: boolean = false;
  isSetter3Available: boolean = false;
  constructor(
    private router: Router,
    private userSelectedDataService: UserSelectionService
  ) {}
  ngOnInit(): void {
    this.getUserSelectedData();
  }
  getUserSelectedData() {
    combineLatest([
      this.userSelectedDataService.getUserCarModelSelection(),
      this.userSelectedDataService.getUserCarColorSelection(),
      this.userSelectedDataService.getUserCarConfigurationSelection(),
    ]).subscribe(([model, color, config]) => {
      this.isSetter2Available = model !== null && color !== null;
      this.isSetter3Available = config !== null;
    });
  }

  onStepperClick(stepperId: string) {
    switch (stepperId) {
      case '1':
        this.router.navigate(['/step1']);
        break;
      case '2':
        this.router.navigate(['/step2']);
        break;
      case '3':
        this.router.navigate(['/step3']);
        break;
      default:
        this.router.navigate(['/step1']);
        break;
    }
  }
}
