import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;
  user$: Observable<any>

  constructor(
    private userService:UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLogged = this.userService.isLogged();
    this.user$ = this.userService.getUser();
  }

  logout() {
    this.userService.logout()
    this.isLogged = false;
    this.router.navigate([''])
  }
}
