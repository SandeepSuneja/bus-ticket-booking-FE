import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

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

  constructor(private apiService: ApiService) {

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
    this.apiService.getCall('Bus').subscribe((data) => {
      this.buses = data;
    });

    this.apiService.getCall('Route').subscribe((data) => {
      this.routes = data;
    });

    this.apiService.getCall('Schedule').subscribe((data) => {
      this.schedules = data;
    });
    
    this.apiService.getCall('Booking').subscribe((data) => {
      this.bookings = data;
    });
  }

  addOrEditEntity(entity_id?: number, entityType?: string, mode?: string) {
    if (mode === 'edit') {
      if (entityType === 'bus') {
        let selectedBus = this.buses.filter((bus: any) => bus.bus_id === entity_id);
        this.busForm.setValue({
          bus_number: selectedBus[0].bus_number || '',
          seat_capacity: selectedBus[0].seat_capacity || '',
          status: selectedBus[0].status || '',
          ticket_price: selectedBus[0].ticket_price || '',
          seat_occupied: selectedBus[0].seat_occupied || ''
        });
      } else if (entityType === 'route') {
        let selectedRoute = this.routes.filter((route: any) => route.route_id === entity_id);
        this.routeForm.setValue({
          origin: selectedRoute[0].origin || '',
          destination: selectedRoute[0].destination || '',
          distance: selectedRoute[0].distance || '',
          duration: selectedRoute[0].duration || '',
          status: selectedRoute[0].status || ''
        })
      } else if (entityType === 'schedule') {
        let selectedSchedule = this.schedules.filter((schedule: any) => schedule.schedule_id === entity_id);
        this.scheduleForm.setValue({
          departure_time: selectedSchedule[0].departure_time || '',
          arrival_time: selectedSchedule[0].arrival_time || ''
        });
      }
    } else {
      this.busForm.reset();
      this.routeForm.reset();
      this.scheduleForm.reset();
    }
  }

  deleteEntity(entity_id: number, entityType: string) {
    console.log(entity_id, entityType)
  }

}
