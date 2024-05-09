import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarConfig, Color, Model } from './data-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserSelectionService {

  //step1 user selected data
  private readonly userCarModelSelection$: BehaviorSubject<Model | null> =
    new BehaviorSubject<Model | null>(null);
  private readonly userCarColorSelection$: BehaviorSubject<Color | null> =
    new BehaviorSubject<Color | null>(null);

  setUserCarModelSelection(userSelection: Model) {
    this.userCarModelSelection$.next(userSelection);
  }

  getUserCarModelSelection(): Observable<Model | null> {
    return this.userCarModelSelection$.asObservable();
  }
  
  setUserCarColorSelection(userSelection: Color) {
    this.userCarColorSelection$.next(userSelection);
  }
  
  getUserCarColorSelection(): Observable<Color | null> {
    return this.userCarColorSelection$.asObservable();
  }

  //step2 user selected data
  private readonly userCarConfigurationSelection$: BehaviorSubject<CarConfig | null> =
  new BehaviorSubject<CarConfig | null>(null);
  private readonly userCarTowSelection$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);
  private readonly userCarYokeSelection$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);

  setUserCarConfigurationSelection(userSelection: CarConfig) {
    this.userCarConfigurationSelection$.next(userSelection);
  }

  getUserCarConfigurationSelection(): Observable<CarConfig | null> {
    return this.userCarConfigurationSelection$.asObservable();
  }

  setUserCarTowSelection(userSelection: boolean) {
    this.userCarTowSelection$.next(userSelection);
  }

  getUserCarTowSelection(): Observable<boolean> {
    return this.userCarTowSelection$.asObservable();
  }
  
  setUserCarYokeSelection(userSelection: boolean) {
    this.userCarYokeSelection$.next(userSelection);
  }

  getUserCarYokeSelection(): Observable<boolean> {
    return this.userCarYokeSelection$.asObservable();
  }

  resetConfigurationSelectedData(){
    this.userCarConfigurationSelection$.next(null);
    this.userCarTowSelection$.next(false);
    this.userCarYokeSelection$.next(false);

  }
  
  


}
  