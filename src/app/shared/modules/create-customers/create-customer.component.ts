import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements  OnInit {

  ngOnInit() {
    const myModalEl = document.getElementById('createCustomerModal')
    myModalEl?.addEventListener('hidden.bs.modal', event => {
    })
  }

}
