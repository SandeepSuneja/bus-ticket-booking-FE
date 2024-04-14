import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title: string = "Bus Ticket Booking System";
  name: string = '';

  constructor(private route: Router) {}

  logout(): void {
    let auth = sessionStorage.getItem('auth');
    if (auth) {
      sessionStorage.removeItem('auth');
      this.route.navigate(['/']);
    }
  }
}
