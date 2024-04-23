import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  userInformation: any;
  
  constructor(private authService: AuthService) { 

  }
  ngOnInit(): void {

  }
  getUerMe() {
    this.authService.getUsers()?.subscribe({
      next: (data) => {
        this.userInformation = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
}
}
