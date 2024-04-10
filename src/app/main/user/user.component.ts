import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    SearchBoxComponent,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  buses: any = [];
  selectedBus: any = {}
  route: any = {};
  schedule: any = {};
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  getBusData(bus_id: number){
    this.selectedBus = this.buses.filter((x: any) => x.bus_id === bus_id)[0];
    this.http.get('http://localhost:5047/api/Route/'+this.selectedBus.route_id).subscribe((data) => {
      this.route = data;
    });
    this.http.get('http://localhost:5047/api/Schedule/'+this.selectedBus.schedule_id).subscribe((data) => {
      this.schedule = data;
    });
  }

  getSearchData(ends: any) {
    this.http.get('http://localhost:5047/api/Bus/'+ ends.origin+'/'+ends.destination).subscribe((data) => {
      this.buses = data;
    })
  }

  booking(bus: any, route: any, schedule: any) {
    let date = new Date();
    let reqBody = {
      "booking_id": this.generateBookingId(),
      "bus_id": bus.bus_id,
      "route_id": route.route_id,
      "schedule_id": schedule.schedule_id,
      "ticket_booked": 1,
      "ticket_price": bus.ticket_price
    };
    this.loading = true;
    // this.http.post('http://localhost:5047/api/Booking', reqBody).subscribe((data) => {
      
    // });
  }

  generateBookingId(): string {
    let date = new Date();
    return 'booking_'+date.getDate()+date.getMonth()+date.getFullYear()+date.getTime();
  }
}
