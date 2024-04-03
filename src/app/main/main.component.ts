import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchBoxComponent } from './search-box/search-box.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    SearchBoxComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  buses: any = [];
  route: any = {};
  schedule: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5047/api/Bus').subscribe((data) => {
      this.buses = data;
    });
  }

  getBusData(bus_id: number){
    let bus = this.buses.filter((x: any) => x.bus_id === bus_id);
    this.http.get('http://localhost:5047/api/Route/'+bus[0].route_id).subscribe((data) => {
      this.route = data;
    });
    this.http.get('http://localhost:5047/api/Schedule/'+bus[0].schedule_id).subscribe((data) => {
      this.schedule = data;
    });
  }
}