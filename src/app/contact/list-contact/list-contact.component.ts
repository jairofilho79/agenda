import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts:Contact[];

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.contacts = this.activatedRoute.snapshot.data.contacts.data;
  }

  removeDeletedContact(index) {
    this.contacts.splice(index, 1)
  }

}
