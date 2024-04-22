import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatePinComponent} from "./create-pin.component";
import {PinsRoutingModule} from "../../../modules/pins/pins-routing.module";
import {FileUploadModule} from "ng2-file-upload";
import {NgxSelectModule} from "ngx-select-ex";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PinService} from "../../service/pin.service";
import {BlockUIModule} from "ng-block-ui";


@NgModule({
  declarations: [
    CreatePinComponent
  ],
  exports: [
    CreatePinComponent
  ],
  imports: [
    CommonModule,
    PinsRoutingModule,
    FileUploadModule,
    NgxSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    BlockUIModule
  ]
})
export class CreatePinsModule {
}
