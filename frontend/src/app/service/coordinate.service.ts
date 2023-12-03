import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoordinateService {
  private valueX: number = 0;
  private valueY: number = 0;
  private valueR: number = 0;

  setValueX(x: number): void {
    this.valueX = x;
  }

  setValueY(y: number): void {
    this.valueY = y;
  }

  setValueR(r: number): void {
    this.valueR = r;
  }

  getValues(): { x: number; y: number; r: number } {
    return { x: this.valueX, y: this.valueY, r: this.valueR };
  }

  
}
