import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateCustomerComponent} from "./create-customer.component";
import {RouterModule} from "@angular/router";
import {CreatePinComponent} from "../create-pins/create-pin.component";



@NgModule({
    declarations: [
        CreateCustomerComponent
    ],
    exports: [
        CreateCustomerComponent
    ],
    imports: [
        CommonModule,
    ]
})
export class CreateCustomersModule { }
