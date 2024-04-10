import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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

  busForm: FormGroup;
  routeForm: FormGroup;
  scheduleForm: FormGroup;

  constructor(private http: HttpClient) {
    this.busForm = new FormGroup({
      bus_number: new FormControl('', Validators.required),
      seat_capacity: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      ticket_price: new FormControl('', Validators.required),
      seat_occupied: new FormControl('', Validators.required)
    });

    this.routeForm = new FormGroup({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      distance: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

    this.scheduleForm = new FormGroup({
      departure_time: new FormControl('', Validators.required),
      arrival_time: new FormControl('', Validators.required)
    });
  }

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

  editEntity(entity_id: number, entityType: string) {
    console.log(entity_id, entityType);
  }

  deleteEntity(entity_id: number, entityType: string) {
    console.log(entity_id, entityType)
  }

}
