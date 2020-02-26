import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchParams } from './searchParams';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  @Input() isSearching = false;
  @Output() userParamsEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [''],
      linesPerPage: [''],
      orderBy: ['name'],
      sortBy: ['ASC']
    })
  }

  searchContacts() {
    this.isSearching = true;
    this.userParamsEvent.emit((<SearchParams>this.searchForm.getRawValue()))
  }

}
