import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css']
})
export class AdminContactsComponent implements OnInit {

  @Input() contacts;

  constructor() { }

  ngOnInit() {
  }

}
