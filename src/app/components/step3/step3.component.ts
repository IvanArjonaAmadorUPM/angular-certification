import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Color, Model, CarConfig } from '../../services/data-service.service';
import { UserSelectionService } from '../../services/user-selection.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [MatProgressSpinnerModule, CurrencyPipe, MatDividerModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component implements OnInit, OnDestroy {
  constructor(private userSelectedDataService: UserSelectionService) {}
  ngOnInit(): void {
    this.getUserSelectedData();
  }
  private unsubscribe$ = new Subject<void>();

  //Image data
  private readonly baseUrl: string =
    'https://interstate21.com/tesla-app/images/';
  imgUrl: string = '';
  //userSelectionData
  modelSelected: Model | null = null;
  colorSelected: Color | null = null;
  configurationSelected: CarConfig | null = null;
  includeYoke: boolean = false;
  includeTow: boolean = false;

  //Total cost
  totalCost: number = 0;
  readonly extraCost: number = 1000;
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
        this.imgUrl = `${this.baseUrl}${model?.code}/${color?.code}.jpg`;
        this.modelSelected = model;
        this.colorSelected = color;
        this.configurationSelected = config;
        this.includeYoke = yoke;
        this.includeTow = tow;
        this.calculateCost();
      });
  }
  private calculateCost() {
    if (this.colorSelected && this.configurationSelected) {
      this.totalCost =
        this.colorSelected.price + this.configurationSelected.price;
      if (this.includeYoke) {
        this.totalCost += this.extraCost;
      }
      if (this.includeTow) {
        this.totalCost += this.extraCost;
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
