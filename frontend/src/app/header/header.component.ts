// src/app/header/header.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateCurrentPage();
  }

  private updateCurrentPage(): void {
    const currentUrl = this.router.url;

    if (currentUrl === '/main') {
      this.currentPage = 'Main';
    } else {
      this.currentPage = 'Auth';
    }
  }

  goToMainPage(): void {
    this.router.navigate(['/']);
  }
}
