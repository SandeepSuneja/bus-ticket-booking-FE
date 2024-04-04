import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  origin: string = '';
  destination: string  = '';
  @Output() searchEvent = new EventEmitter<any>();

  search() {
    this.searchEvent.emit({"origin": this.origin, "destination": this.destination});
  }

  onSelect(value: string, type: string) {
    if (type === 'origin') {
      this.origin = value;
    } else if (type === 'destination') {
      this.destination = value;
    }
  }
}
