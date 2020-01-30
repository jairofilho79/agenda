import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contact';

@Component({
  selector: 'app-card-contact',
  templateUrl: './card-contact.component.html',
  styleUrls: ['./card-contact.component.css']
})
export class CardContactComponent implements OnInit {

  @Input() contact:Contact;
  isEditing:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  editContact() {
    this.isEditing = true;
  }

  deleteContact() {

  }

}
