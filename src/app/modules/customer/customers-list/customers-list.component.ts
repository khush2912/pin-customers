import {Component, OnInit} from '@angular/core';
import {BlockUI, BlockUIModule, NgBlockUI} from "ng-block-ui";
import {CreateCustomersModule} from "../../../shared/modules/create-customers/create-customers.module";
import {CreatePinsModule} from "../../../shared/modules/create-pins/create-pins.module";
import {NgForOf, NgIf} from "@angular/common";
import {Customers} from "../../../shared/interface/customers";
import * as bootstrap from "bootstrap";
import {CustomerService} from "../../../shared/service/customer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss'
})
export class CustomersListComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  constructor(
    private customerService: CustomerService,
    private toaster: ToastrService,
  ) {
  }

  clickedCustomer!: Customers | null;
  customerList: Customers[] = [];
  totalPinCount!: number;
  currentPage: number = 1;
  itemPerPage: number = 20;
  allPageNoArray: number[] = [];


  ngOnInit() {
    this.listAllCustomers();
  }

  openCustomerModal() {
    const modal = bootstrap.Modal.getOrCreateInstance('#createCustomerModal');
    modal?.show();
  }

  nextPrevPage(offset: number) {
    if (offset > 0 && this.currentPage === this.allPageNoArray.length) {
      return;
    }
    if (offset < 0 && this.currentPage === 1) {
      return;
    }
    this.currentPage += offset;
    this.listAllCustomers();
  }

  loadCustomers(pageNo: number) {
    if (this.currentPage != pageNo) {
      this.currentPage = pageNo;
      this.listAllCustomers();
    }
  }

  editCustomer(customer: Customers) {
    this.clickedCustomer = customer;
    this.openCustomerModal();
  }

  listAllCustomers() {
    this.customerService.list(this.currentPage, this.itemPerPage).subscribe({
      next: response => {
        this.blockUI.stop();
        this.customerList = response.data;
        this.totalPinCount = response.totalCount;
        this.allPageNoArray = Array(Math.ceil(this.totalPinCount / this.itemPerPage)).fill(0).map((x, i) => i + 1);
      },
      error: () => {
        this.blockUI.stop();
        this.toaster.error("Failed to load customers. Try Again Later.");
      }
    });
  }

}
