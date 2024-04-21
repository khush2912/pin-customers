import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsRoutingModule } from './pins-routing.module';
import {PinListComponent} from "./component/pin-list/pin-list.component";
import {CreateCustomersModule} from "../../shared/modules/create-customers/create-customers.module";
import {CreatePinsModule} from "../../shared/modules/create-pins/create-pins.module";


@NgModule({
  declarations: [
    PinListComponent
  ],
    imports: [
        CommonModule,
        PinsRoutingModule,
        CreateCustomersModule,
        CreatePinsModule
    ]
})
export class PinsModule { }
