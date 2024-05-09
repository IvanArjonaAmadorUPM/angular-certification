import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getModels() {
    return this.http.get<Model[]>('/models');
  }

  getOptions(modelId: string) {
    return this.http.get<CarModel>(`/options/${modelId}`);
  }
}

export interface Model {
  code: string;
  description: string;
  colors: Color[];
}

export interface Color {
  code: string;
  description: string;
  price: number;
}

export interface CarModel {
  configs: CarConfig[];
  towHitch: boolean; 
  yoke: boolean;
}

export interface CarConfig {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}