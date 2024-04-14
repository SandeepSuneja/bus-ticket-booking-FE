import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  name: string = '';
  signedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let auth = sessionStorage.getItem('auth');
    if (auth) {
      this.signedIn = true;
    }
  }

  logout(): void {
    sessionStorage.removeItem('auth');
    this.signedIn = false;
    this.router.navigate(['/']);
  }

  login(event: any) {
    console.log('login');
    this.name = event;
    this.signedIn = true;
  }
}
