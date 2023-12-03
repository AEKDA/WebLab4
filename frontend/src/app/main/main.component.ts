import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../service/customerservice';
import { CoordinateService } from '../service/coordinate.service'; // Импортируйте CoordinateService

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [CoordinateService], // Добавьте CoordinateService в провайдеры
})
export class MainComponent implements OnInit {
  hitData!: any[];
  tableColumns: string[] = [];

  constructor(
    private customerService: CustomerService,
    private coordinateService: CoordinateService // Внедрите CoordinateService
  ) {}

  valueX: number = 0;
  valueY: number = 0;
  valueR: number = 0;

  ngOnInit() {
    this.loadHitData();
  }

  loadHitData() {
    this.customerService.getHitData()?.subscribe(
      (data) => {
        this.hitData = data;
        if (this.hitData.length > 0) {
          this.tableColumns = Object.keys(this.hitData[0]);
        }
        console.log(this.hitData);
      },
      (error) => {
        console.error('Failed to fetch hit data:', error);
      }
    );
  }

  
  setCoordinates() {
    this.coordinateService.setValueX(this.valueX);
    this.coordinateService.setValueY(this.valueY);
    this.coordinateService.setValueR(this.valueR);

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
}
