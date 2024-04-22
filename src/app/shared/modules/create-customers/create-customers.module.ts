import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateCustomerComponent} from "./create-customer.component";
import {RouterModule} from "@angular/router";
import {CreatePinComponent} from "../create-pins/create-pin.component";
import {CustomerService} from "../../service/customer.service";
import {CountryRegionService} from "../../service/country-region.service";
import {ReactiveFormsModule} from "@angular/forms";
import {BlockUIModule} from "ng-block-ui";


@NgModule({
  declarations: [
    CreateCustomerComponent
  ],
  exports: [
    CreateCustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BlockUIModule,
  ]
})
export class CreateCustomersModule {
}
