import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PinsRoutingModule } from './pins-routing.module';
import {PinListComponent} from "./component/pin-list/pin-list.component";


@NgModule({
  declarations: [
    PinListComponent
  ],
  imports: [
    CommonModule,
    PinsRoutingModule
  ]
})
export class PinsModule { }
