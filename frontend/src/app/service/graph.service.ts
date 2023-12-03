// src/app/graph.service.ts

import { Injectable } from '@angular/core';
import { CoordinateService } from './coordinate.service';
import { CustomerService } from './customerservice';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  constructor(private coordinateService: CoordinateService, private customerService: CustomerService) {}

  initializeCanvas(canvasId: string): void {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (this.canvas) {
      let canvasStyle = getComputedStyle(this.canvas);
      this.canvas.width = parseInt(canvasStyle.width);
      this.canvas.height = parseInt(canvasStyle.height);
      this.ctx = this.canvas.getContext('2d');

      this.drawFigure(this.canvas.width / 2, this.canvas.height / 2);
    }
  }

  drawFigure(x: number, y: number): void {
    const canvas = this.canvas;
    if (canvas && this.ctx) {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      const axisLength = canvas.width / 1.5;
  
      this.drawAxis(this.ctx, canvas.width / 2, 0, canvas.width / 2, canvas.height);
      this.drawAxis(this.ctx, 0, canvas.height / 2, canvas.width, canvas.height / 2);
      this.drawArrow(this.ctx, x, y)
      this.drawLabels(this.ctx, axisLength, x, y);
      this.drawTag(this.ctx, x, y);
      this.drawCircle(this.ctx, canvas.width / 2, canvas.height / 2, axisLength / 4, 'lightblue');
      this.drawSquare(this.ctx, x, y, axisLength);
      this.drawTriangle(this.ctx, x, y, axisLength);
    }
  }

  private drawTag(ctx: CanvasRenderingContext2D, x:number, y:number){
    const canvas = this.canvas;
    if(ctx && canvas){
      // Нарисовать "x" и "y" на осях
      ctx.font = "14px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("X", canvas.width - 15, y - 10);
      ctx.fillText("Y", x + 10, 15);

      // Нарисовать метки на осях
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
    }
  }

  private drawArrow(ctx: CanvasRenderingContext2D, x:number, y:number){
    const arrowSize = 8;
    const canvas = this.canvas;
    if(ctx && canvas){
      // Стрелка по оси X
      ctx.beginPath();
      ctx.moveTo(canvas.width, canvas.height / 2);
      ctx.lineTo(canvas.width - arrowSize, canvas.height / 2 - arrowSize);
      ctx.lineTo(canvas.width - arrowSize, canvas.height / 2 + arrowSize);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.fillStyle = "black"; 
      ctx.fill();

      // Стрелка по оси Y
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x - arrowSize, arrowSize);
      ctx.lineTo(x + arrowSize, arrowSize);
      ctx.lineTo(x, 0);
      ctx.fillStyle = "black";
      ctx.fill();
    }
    
  }

  private drawLabels(ctx: CanvasRenderingContext2D, axisLength: number, x:number, y: number){
    const labels = ["-R", "-R/2", "R/2", "R"];
    const labelPositions = [
      -axisLength / 2,
      -axisLength / 4,
      axisLength / 4,
      axisLength / 2,
    ];
  
    labels.forEach((label, index) => {
      const labelX = x + labelPositions[index];
      const labelY = y - labelPositions[index];
      if(ctx){
        ctx.fillText(label, labelX - 10, y + 20);
        ctx.fillText(label, x + 10, labelY + 3);
    
        // Рисование вертикальной линии (|)
        ctx.beginPath();
        ctx.moveTo(labelX, y - 5);
        ctx.lineTo(labelX, y + 5);
        ctx.strokeStyle = "black";
        ctx.stroke();
    
        // Рисование горизонтальной линии (-)
        ctx.beginPath();
        ctx.moveTo(x - 5, labelY);
        ctx.lineTo(x + 5, labelY);
        ctx.strokeStyle = "black";
        ctx.stroke();
      }
    });
  
  }

  private drawAxis(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  private drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0.5 * Math.PI,  -Math.PI, false);
    ctx.lineTo(x, y);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  private drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, axisLength: number){
    if(ctx){
      // Рисование квадрата
      ctx.globalCompositeOperation = "destination-over";
      const squareSize = axisLength / 2;
      ctx.fillStyle = "lightgreen";
      ctx.fillRect(x, y, squareSize/2, -squareSize);
      ctx.globalCompositeOperation = "source-over";
    }
  }

  private drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, axisLength: number){
    if(ctx){
    // Рисование прямоугольного треугольника
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - axisLength / 2);
    ctx.lineTo(x - axisLength / 2, y);
    ctx.lineTo(x, y);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    }
  }
 

  handleCanvasClick(event: MouseEvent): void {
    if (!this.ifRSetCorrect()) {
      console.log("Невозможно определить координаты точки. Введите R");
      return;
    }

    const rect = this.canvas?.getBoundingClientRect();
    if (rect) {
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      // console.log(mouseX, mouseY)
      
     
      let canvas = document.getElementById('canvas') as HTMLCanvasElement;
      let canvasStyles = getComputedStyle(canvas);
      
      // Получить ширину в пикселях
      let canvasWidth = parseInt(canvasStyles.width);
      
      this.transformAndDraw(mouseX, mouseY, canvasWidth);
      
      
    }
  }

  private transformAndDraw(x: number, y: number, canvasLength: number): void {
    let R = this.getR();

    const staticX = x;
    const staticY = y;

    // console.log(canvasLength)

    let f = canvasLength/400
    const k = f * 133.3 / R + 0.5;
    x = (x - canvasLength/2) / k;
    y = -(y - canvasLength/2) / k;

    if (x < 0) {
      x = x - 0.01;
    }
    if (y > 0) {
      y = y - 0.005;
    }

    

    x = Number.parseFloat(x.toFixed(4));
    y = Number.parseFloat(y.toFixed(4));
    // console.log(x + " " + y)

    // this.drawFigure(x, y);
    this.checkAndDrawResult(staticX, staticY, x, y);

    this.coordinateService.setValueX(x)
    this.coordinateService.setValueY(y)
    this.coordinateService.setValueR(R)
    
      
    this.customerService.sendHit()?.subscribe(
      (response) => {
        // Обработка успешного ответа
        console.log('Hit sent successfully:', response);
      },
      (error) => {
        // Обработка ошибки
        console.error('Failed to send hit:', error);
      }
    );
    
  }

  private checkAndDrawResult(x: number, y: number, basedX: number, basedY: number): void {
    const ctx = this.ctx;
    if (ctx) {
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);

      if (this.isRound(basedX, basedY) || this.isSquare(basedX, basedY) || this.isTriangle(basedX, basedY)) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "red";
      }

      ctx.fill();
    }
}



  private isRound(x: number, y: number): boolean {
    let R = this.getR();
    return x <= 0 && y <= 0 && x >= -R/2 && y >= -R/2 && Math.sqrt(x * x + y * y) <= R / 2

  }

  private isSquare(x: number, y: number): boolean {
    let R = this.getR();
    return x >= 0 && x <= R/2 && y >= 0 && y <= R;
  }

  private isTriangle(x: number, y: number): boolean {
    let R = this.getR();
    return x <= 0 && y >= 0 && x >= -R && y <= R && y <= x + R;
  }



  private ifRSetCorrect(): boolean {
    let rValue = this.getR().toString();
    return !this.nonCorrectDec(rValue, "r");
  }

  private getR(): number {
    let R = this.coordinateService.getValues().r
    if (R <= 0) R = 1;
    return R;
  }

  private nonCorrectDec(value: string, what: string): boolean {
    const regex = /^-?\d*\.?\d+$/;
    if (!regex.test(value)) {
      console.log(`Введенное значение ${what} не является десятичным числом`);
      return true;
    }
    return false;
  }
}
