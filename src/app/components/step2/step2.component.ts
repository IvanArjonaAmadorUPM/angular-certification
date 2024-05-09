import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import {
  CarConfig,
  CarModel,
  DataService,
} from '../../services/data-service.service';
import { UserSelectionService } from '../../services/user-selection.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    CurrencyPipe,
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit, OnDestroy {
  //Image data
  private readonly baseUrl: string =
    'https://interstate21.com/tesla-app/images/';
  imgUrl: string = '';
  //Options
  options: CarModel | undefined = undefined;
  configSelect: number | undefined = undefined;
  configSelectConfiguration: CarConfig | undefined = undefined;
  includeYoke: boolean = false;
  includeTow: boolean = false;

  constructor(
    private dataService: DataService,
    private userSelectedDataService: UserSelectionService
  ) {}
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getUserSelectedData();
  }
  private getUserSelectedData() {
    combineLatest([
      this.userSelectedDataService.getUserCarModelSelection(),
      this.userSelectedDataService.getUserCarColorSelection(),
      this.userSelectedDataService.getUserCarConfigurationSelection(),
      this.userSelectedDataService.getUserCarYokeSelection(),
      this.userSelectedDataService.getUserCarTowSelection(),
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([model, color, config, yoke, tow]) => {
        if (model !== null && color !== null) {
          this.imgUrl = `${this.baseUrl}${model.code}/${color.code}.jpg`;
          this.dataService
            .getOptions(model.code)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((options) => {
              this.options = options;
            });
          if (config) {
            this.configSelectConfiguration = config;
            this.configSelect = config.id;
          }
          if (yoke) {
            this.includeYoke = yoke;
          }
          if (tow) {
            this.includeTow = tow;
          }
        }
      });
  }
  onSelectOption(config: number) {
    this.configSelect = config;
    this.configSelectConfiguration = this.options?.configs.find(
      (option) => option.id === this.configSelect
    );
    if (this.configSelectConfiguration) {
      this.userSelectedDataService.setUserCarConfigurationSelection(
        this.configSelectConfiguration
      );
    }
  }

  onYokeClicked(checked: boolean) {
    this.includeYoke = checked;
    this.userSelectedDataService.setUserCarYokeSelection(this.includeYoke);
  }
  onTowHitchClicked(checked: boolean) {
    this.includeTow = checked;
    this.userSelectedDataService.setUserCarTowSelection(this.includeTow);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
