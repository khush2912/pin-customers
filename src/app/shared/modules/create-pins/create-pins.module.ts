import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePinComponent} from "./create-pin.component";
import {RouterModule} from "@angular/router";
import {PinsRoutingModule} from "../../../modules/pins/pins-routing.module";
import {FileUploadModule} from "ng2-file-upload";
import {NgxSelectModule} from "ngx-select-ex";
import {ReactiveFormsModule} from "@angular/forms";



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
        ReactiveFormsModule
    ]
})
export class CreatePinsModule { }
