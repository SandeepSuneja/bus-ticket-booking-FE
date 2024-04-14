import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'http://localhost:5047/api/';
  
  constructor(private http: HttpClient) {}

  login(url: string, form: any): Observable<any> {
    return this.http.post(this.baseUrl+url, form, {responseType: 'text'});
  }

  getCall(url: string): Observable<any> {
    return this.http.get(this.baseUrl+url);
  }

  postCall(url: string, formData: any, type: string = 'add'): Observable<any> {
    if (type === 'edit') {
      return this.http.put(this.baseUrl + url, formData);
    }
    return this.http.post(this.baseUrl+url, formData);
  }

  deleteCall(url: string, id: string): Observable<any> {
    return this.http.delete(this.baseUrl+url+'/'+id);
  }
}
