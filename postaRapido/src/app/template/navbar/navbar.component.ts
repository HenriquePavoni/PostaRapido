import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

const SIDEBAR_STORAGE_KEY = 'sb|sidebar-toggle';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  sair(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    if (localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true') {
      document.body.classList.add('sb-sidenav-toggled');
    }
  }

  toggleSidebar(event: Event): void {
    event.preventDefault();
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      String(document.body.classList.contains('sb-sidenav-toggled'))
    );
  }
}
