import { Component, OnInit } from '@angular/core';

const SIDEBAR_STORAGE_KEY = 'sb|sidebar-toggle';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onContentClick(event: MouseEvent): void {
    if (window.innerWidth >= 992) {
      return;
    }

    if (!document.body.classList.contains('sb-sidenav-toggled')) {
      return;
    }

    const nav = document.getElementById('layoutSidenav_nav');
    if (nav && nav.contains(event.target as Node)) {
      return;
    }

    document.body.classList.remove('sb-sidenav-toggled');
    localStorage.setItem(SIDEBAR_STORAGE_KEY, 'false');
  }
}
