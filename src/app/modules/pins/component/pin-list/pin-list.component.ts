import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import * as bootstrap from "bootstrap";
import {PinService} from "../../../../shared/service/pin.service";
import {Pin} from "../../pin";
import {CustomerService} from "../../../../shared/service/customer.service";
import {Customers} from "../../../../shared/interface/customers";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-pin-list',
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss'
})
export class PinListComponent implements OnInit, AfterViewInit, OnDestroy {
  @BlockUI() blockUI!: NgBlockUI;

  clickedPin!: Pin | null;
  clickedCustomer!: Customers;
  pins: Pin[] = [];
  totalPinCount!: number;
  currentPage: number = 1;
  itemPerPage: number = 20;
  allPageNoArray: number[] = [];

  constructor(
    private pinService: PinService,
    private customerService: CustomerService,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit() {
    this.listAllPins();
  }

  ngAfterViewInit() {
    document.getElementById('createPinModal')?.addEventListener('hide.bs.modal', this.onHidePinModal);
  }

  ngOnDestroy() {
    document.getElementById('createPinModal')?.removeEventListener('hide.bs.modal', this.onHidePinModal);
  }

  openModal(id: string) {
    const modal = bootstrap.Modal.getOrCreateInstance(`#${id}`, {});
    modal.show()
  }

  nextPrevPage(offset: number) {
    if (offset > 0 && this.currentPage === this.allPageNoArray.length) {
      return;
    }
    if (offset < 0 && this.currentPage === 1) {
      return;
    }
    this.currentPage += offset;
    this.listAllPins();
  }

  loadPins(pageNo: number) {
    if (this.currentPage != pageNo) {
      this.currentPage = pageNo;
      this.listAllPins();
    }
  }

  listAllPins() {
    this.pinService.list(this.currentPage, this.itemPerPage).subscribe({
      next: response => {
        this.pins = response.data;
        this.totalPinCount = response.totalCount;
        this.allPageNoArray = Array(Math.ceil(this.totalPinCount / this.itemPerPage)).fill(0).map((x, i) => i + 1);
      }
    });
  }

  editPin(pin: Pin) {
    this.clickedPin = pin;
    this.openModal('createPinModal');
  }

  editCustomer(customer: Partial<Customers>) {
    if (customer.id) {
      this.blockUI.start();
      this.customerService.get(customer.id).subscribe({
        next: value => {
          this.blockUI.stop();
          this.clickedCustomer = value;
          this.openModal('createCustomerModal');
        },
        error: () => {
          this.blockUI.stop();
          this.toastrService.error('Failed to fetch customer details.');
        }
      });
    }
  }

  private onHidePinModal = () => {
    this.clickedPin = null;
  }
}
