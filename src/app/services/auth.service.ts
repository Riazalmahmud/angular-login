import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../model/authInterface';

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
  
  getUsers(){
    const getToken = localStorage.getItem('token') as string;
  
    if (!getToken) {
      // Handle error: token does not exist in localStorage
      console.error('Token not found in localStorage');
      return;
    }
    // set token  exist in localStorage
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken,
   });
  return this.httpClient.get<any>(this.api + "user/getMe", { headers: reqHeader });
  }
}
