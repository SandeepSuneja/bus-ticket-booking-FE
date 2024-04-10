import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private http: HttpClient, private route: Router){
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(form: FormGroup) {
    this.http.post('http://localhost:5047/api/Auth', 
      {"email": form.value.email, "password": form.value.password}, {responseType: 'text'}).subscribe((data) => {
      console.log(data);
      let decoded: any = jwtDecode(data);
      sessionStorage.setItem('auth', data);
      if (decoded['type'] === 'user'){
        this.route.navigate(['/user']);
      } else if (decoded['type'] === 'admin') {
        this.route.navigate(['/admin']);
      }
    });
  }
}
