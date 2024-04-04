import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  
  buses: any = [];
  routes: any = [];
  schedules: any = [];
  users: any = [];
  bookings: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5047/api/Bus').subscribe((data) => {
      this.buses = data;
    });

    this.http.get('http://localhost:5047/api/Route').subscribe((data) => {
      this.routes = data;
    });

    this.http.get('http://localhost:5047/api/Schedule').subscribe((data) => {
      this.schedules = data;
    });

    this.http.get('http://localhost:5047/api/User').subscribe((data) => {
      this.users = data;
    });

    this.http.get('http://localhost:5047/api/Booking').subscribe((data) => {
      this.bookings = data;
    });
  }

}
