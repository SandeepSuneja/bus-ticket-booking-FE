import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { ApiService } from '../../api.service';

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
  @Output() loginEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: Router, private apiService: ApiService){
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(form: FormGroup) {
    this.apiService.login('Auth', {"email": form.value.email, "password": form.value.password}).subscribe((data) => {
      let decoded: any = jwtDecode(data);
      sessionStorage.setItem('auth', data);
      if (decoded['type'] === 'user'){
        this.route.navigate(['/user']);
      } else if (decoded['type'] === 'admin') {
        this.route.navigate(['/admin']);
      }
      this.loginEvent.emit(decoded['first_name']+' '+ decoded['last_name']);
    });
  }
}
