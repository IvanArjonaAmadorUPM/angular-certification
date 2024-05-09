import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Color, DataService, Model } from '../../services/data-service.service';
import { UserSelectionService } from '../../services/user-selection.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
  providers: [DataService],
})
export class Step1Component implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private userSelectedDataService: UserSelectionService
  ) {}
  private unsubscribe$ = new Subject<void>();

  get imgUrl(): string {
    if (this.modelSelect && this.colorSelect) {
      return `${this.baseUrl}${this.modelSelect}/${this.colorSelect}.jpg`;
    } else return '';
  }
  // Models data
  models: Model[] = [];
  modelSelect: string = '';
  // Colors data
  colors: Color[] = [];
  colorSelect: string = '';
  // Image variables
  private readonly baseUrl: string =
    'https://interstate21.com/tesla-app/images/';
  // Selected data
  userPreSelectedModel: Model | undefined = undefined;
  userPreSelectedColor: Color | undefined = undefined;
  ngOnInit() {
    this.getUserSelectedData();
    this.getCarsData();
  }
  private getUserSelectedData() {
    combineLatest([
      this.userSelectedDataService.getUserCarModelSelection(),
      this.userSelectedDataService.getUserCarColorSelection(),
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([model, color]) => {
        if (model !== null && color !== null) {
          this.colors = model.colors;
          this.modelSelect = model.code;
          this.colorSelect = color.code;
        }
      });
  }
  private getCarsData() {
    this.dataService
      .getModels()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((models) => {
        this.models = models;
      });
  }
  onSelectModel(modelId: string) {
    this.colorSelect = '';
    this.modelSelect = modelId;
    const model: Model | undefined =
      this.models.find((model) => model.code === this.modelSelect) ?? undefined;
    if (model) {
      this.colors = model.colors;
      this.userSelectedDataService.setUserCarModelSelection(model);
      this.userSelectedDataService.resetConfigurationSelectedData();
      this.colorSelect = this.colors[0].code;
      this.userSelectedDataService.setUserCarColorSelection(this.colors[0]);
    }
  }
  onSelectColor(colorId: string) {
    this.colorSelect = colorId;
    const colorSelected: Color | undefined = this.colors.find(
      (color) => color.code === this.colorSelect
    );
    if (colorSelected) {
      this.userSelectedDataService.setUserCarColorSelection(colorSelected);
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
