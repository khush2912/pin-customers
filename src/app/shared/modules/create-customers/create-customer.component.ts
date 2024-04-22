import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {CountryRegionService} from "../../service/country-region.service";
import {CreateCustomersFormGroup, Customers, GeoData} from "../../interface/customers";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import {ToastrService} from "ngx-toastr";
import * as bootstrap from "bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime, timeout} from "rxjs";
import {Pin} from "../../../modules/pins/pin";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss'
})
export class CreateCustomerComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  @Input()
  customer!: Customers | null;

  @Output()
  refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();

  private countries: GeoData[] = [];
  regions: string[] = [];
  filteredCountries: GeoData[] = [];
  formGroup!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private countryRegionService: CountryRegionService,
    private toastrService: ToastrService,
    private elRef: ElementRef
  ) {
  }

  ngOnInit() {

    this.formGroup = new FormGroup<CreateCustomersFormGroup>({
      title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      region: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      country: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });

    this.regions = this.countryRegionService.regions;
    this.countries = this.countryRegionService.countries;
    if (!this.regions.length || !this.countries.length) {
      this.blockUI.start();
      this.countryRegionService.get().subscribe({
        next: () => {
          this.blockUI.stop();
          this.regions = this.countryRegionService.regions;
          this.countries = this.countryRegionService.countries;
        },
        error: () => {
          this.toastrService.error("Failed to load data. Try Again Later.");
          this.closeModal();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('customer')) {
      if (this.customer) {
        this.formGroup.addControl('id', new FormControl());
        this.formGroup.patchValue(this.customer);
        this.filterCountries(this.formGroup.get('region')?.value);
      }
    }
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.closest('.modal')?.addEventListener('hide.bs.modal', this.onModalClose);
  }

  ngOnDestroy() {
    this.elRef.nativeElement.closest('.modal')?.removeEventListener('hide.bs.modal', this.onModalClose);
  }

  regionSelectionChange($event: Event) {
    this.filterCountries(($event.target as HTMLSelectElement).value);
  }

  createCustomer() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
      return;
    }
    this.blockUI.start();
    if (this.customer) {
      this.customerService.update(this.formGroup.value).subscribe({
        next: () => {
          this.blockUI.stop();
          this.toastrService.success("Customer updated Successfully");
          this.closeModal();
          this.refreshList.emit(true);
        },
        error: () => {
          this.blockUI.stop();
          this.toastrService.error("Failed to create customer.");
        }
      });
    } else {
      this.customerService.create(this.formGroup.value).subscribe({
        next: () => {
          this.blockUI.stop();
          this.toastrService.success("Customer created Successfully");
          this.closeModal();
          this.refreshList.emit(true);
        },
        error: () => {
          this.blockUI.stop();
          this.toastrService.error("Failed to create customer.");
        }
      });
    }
  }

  private closeModal() {
    const modal = bootstrap.Modal.getInstance(this.elRef.nativeElement.closest('.modal'));
    modal?.hide();
  }

  private onModalClose = () => {
    this.customer = null;
    this.formGroup.reset();
  }

  private filterCountries(value: string) {
    this.filteredCountries = this.countries.filter(c => c.region.toLowerCase() === value.toLowerCase());
  }
}
