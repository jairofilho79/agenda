import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    private ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
  }

  deleteContact() {
    this.ngxSmartModalService.setModalData({deleteContact: true}, 'deleteContact');
    this.ngxSmartModalService.close('deleteContact');
  }

}
