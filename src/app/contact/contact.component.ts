import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  currentUrl:string;

  constructor(private _router: Router) {
    _router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        this.currentUrl = val.url
      }
    })
  }

  ngOnInit() {
  }

}
