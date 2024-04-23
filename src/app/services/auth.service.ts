import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../model/authInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
api = 'http://localhost:3000/api/v1/'
  constructor(private httpClient: HttpClient) { }

  signUp(user: UserInfo){
  return this.httpClient.post<{message: string, status: string, data: any}>(this.api+ 'user', user)
}
  signIn(user: UserInfo){
  return this.httpClient.post<{message: string, status: string, data: any, token: string}>(this.api+ 'user/login', user)
  }
  
  getMe(){
    const getToken = localStorage.getItem('token') as string;
    if (!getToken) {
      console.error('Token not found in localStorage');
      return;
    }
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken,
   });
  return this.httpClient.get<any>(this.api + "user/getMe", { headers: reqHeader });
  }
}
