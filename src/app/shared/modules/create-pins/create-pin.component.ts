import {Component, OnDestroy, OnInit} from '@angular/core';
import {FileLikeObject, FileUploader, FileUploaderOptions} from "ng2-file-upload";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePinsFormGroup} from "./create-pins";

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.scss'
})
export class CreatePinComponent implements OnInit {
  private allowedExtensions: string[] = ['image/jpeg', 'image/png', 'image/gif'];
  hasBaseDropZoneOver: boolean = false;
  fileSelectError: boolean = false;
  fileSelectStr: string = "";
  formGroup!: FormGroup;

  ngOnInit() {
    const myModalEl = document.getElementById('createPinModal')
    myModalEl?.addEventListener('hidden.bs.modal', this.modalClose);
    this.formGroup = new FormGroup<CreatePinsFormGroup>({
      title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      file: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      collaborator: new FormControl([], {nonNullable: true, validators: [Validators.required]}),
      privacy: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });
  }

  fileOver(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileSelectOrDrop(fileList: File[]) {
    if (fileList.length > 1) {
      this.fileSelectError = true;
      this.fileSelectStr = 'Please select only one file.';
    }
    const file = fileList[0];
    if (!this.allowedExtensions.includes(file.type)) {
      this.fileSelectError = true;
      this.fileSelectStr = 'Please select an image file.';
      return;
    }
  }

  private modalClose = () => {
    this.formGroup.reset();
    this.fileSelectStr = '';
    this.fileSelectError = false;
    const myModalEl = document.getElementById('createPinModal')
    myModalEl?.removeEventListener('hidden.bs.modal', this.modalClose);
  }
}
