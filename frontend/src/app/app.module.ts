// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Добавьте этот импорт
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from "primeng/inputtext";
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { GraphComponent } from './graph/graph.component'
import { TableModule } from 'primeng/table';
import { CustomerService } from './service/customerservice';
import { HttpClientModule } from '@angular/common/http';
import { CoordinateService } from './service/coordinate.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AuthComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    AppRoutingModule,
    SliderModule,
    TableModule,
    HttpClientModule
  ],
  providers: [CustomerService, CoordinateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
