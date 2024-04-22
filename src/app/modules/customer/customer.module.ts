import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import {BlockUIModule} from "ng-block-ui";
import {CreateCustomersModule} from "../../shared/modules/create-customers/create-customers.module";
import {CreatePinsModule} from "../../shared/modules/create-pins/create-pins.module";
import {CustomersListComponent} from "./customers-list/customers-list.component";


@NgModule({
  declarations: [
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CreateCustomersModule,
    BlockUIModule
  ]
})
export class CustomerModule { }
