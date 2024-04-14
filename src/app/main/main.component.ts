import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
export class MainComponent {

  name: string = '';
  signedIn: boolean = false;

  constructor(private router: Router) {}


  logout(): void {
    sessionStorage.removeItem('auth');
    this.router.navigate(['/']);
  }

  checkAuth(event: any) {
    if (this.router.url !== '/login') {
      let auth: any = sessionStorage.getItem('auth');
      let decode_auth:any = jwtDecode(auth);
      this.name = decode_auth['first_name'] + ' ' + decode_auth['last_name'];
    }
    this.signedIn = this.router.url === '/user' || this.router.url === '/admin';
  }
}
