import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePinComponent} from "./create-pin.component";
import {RouterModule} from "@angular/router";
import {PinsRoutingModule} from "../../../modules/pins/pins-routing.module";



@NgModule({
  declarations: [
    CreatePinComponent
  ],
  imports: [
    CommonModule,
    PinsRoutingModule
  ]
})
export class CreatePinsModule { }
