import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePinsFormGroup} from "./create-pins";
import {PinService} from "../../service/pin.service";
import {ToastrService} from "ngx-toastr";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import * as bootstrap from "bootstrap";
import {CustomerService} from "../../service/customer.service";
import {Customers} from "../../interface/customers";
import {Pin} from "../../../modules/pins/pin";

@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.scss'
})
export class CreatePinComponent implements OnInit, OnChanges, OnDestroy {
  private allowedExtensions: string[] = ['image/jpeg', 'image/png', 'image/gif'];

  @BlockUI() blockUI!: NgBlockUI;

  @Input()
  pin!: Pin | null;

  @Output()
  refreshList: EventEmitter<boolean> = new EventEmitter<boolean>();

  hasBaseDropZoneOver: boolean = false;
  fileSelectError: boolean = false;
  fileSelectStr: string = "";
  selectedFile!: File | null;
  selectedFileBase64Str!: string | ArrayBuffer | null;
  formGroup!: FormGroup;
  customers: Customers[] = [];

  constructor(
    private customerService: CustomerService,
    private pinService: PinService,
    private toaster: ToastrService,
    private elRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.elRef.nativeElement.closest('.modal')?.addEventListener('shown.bs.modal', this.loadCustomers);
    this.elRef.nativeElement.closest('.modal')?.addEventListener('hide.bs.modal', this.reset);

    this.formGroup = new FormGroup<CreatePinsFormGroup>({
      title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      file: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      collaboratorIds: new FormControl([], {nonNullable: true, validators: [Validators.required]}),
      privacy: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('pin')) {
      if (this.pin) {
        this.formGroup.addControl('id', new FormControl());
        this.formGroup.patchValue(this.pin);
      }
    }
  }

  ngOnDestroy() {
    this.elRef.nativeElement.closest('.modal')?.removeEventListener('shown.bs.modal', this.loadCustomers);
    this.elRef.nativeElement.closest('.modal')?.removeEventListener('hide.bs.modal', this.reset);
  }

  fileOver(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  async fileSelectOrDrop(fileList: File[]) {
    this.fileSelectError = false;
    this.fileSelectStr = "";
    this.clearFileSelection();
    this.formGroup.get('file')?.markAsTouched();
    if (fileList.length > 1) {
      this.fileSelectError = true;
      this.fileSelectStr = 'Please select only one file.';
      return;
    }
    const file = fileList[0];
    if (!this.allowedExtensions.includes(file.type)) {
      this.fileSelectError = true;
      this.fileSelectStr = 'Please select an image file.';
      return;
    }
    const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
    if (fileSizeMB > 2) {
      this.fileSelectError = true;
      this.fileSelectStr = 'File size exceeds the maximum allowed limit (2 MB).';
      return;
    }
    this.selectedFile = file;
    try {
      this.selectedFileBase64Str = await this.fileToBase64(this.selectedFile);
      this.formGroup.get('file')?.setValue(this.selectedFileBase64Str);
    } catch (e) {
      this.blockUI.stop();
      this.toaster.error("Failed to upload image.");
    }
  }

  async createPin() {
    if (this.formGroup.invalid || !this.selectedFile) {
      this.formGroup.markAllAsTouched();
      this.formGroup.updateValueAndValidity();
      return;
    }
    this.blockUI.start();
    if (this.pin) {
      this.pinService.update(this.formGroup.value).subscribe({
        next: () => {
          this.blockUI.stop();
          this.toaster.success("Pin updated Successfully");
          this.closeModal();
          this.refreshList.emit(true);
        },
        error: () => {
          this.blockUI.stop();
          this.toaster.error("Failed to create pin.");
        }
      });
    } else {
      this.pinService.create(this.formGroup.value).subscribe({
        next: () => {
          this.blockUI.stop();
          this.toaster.success("Pin created Successfully");
          this.closeModal();
          this.refreshList.emit(true);
        },
        error: () => {
          this.blockUI.stop();
          this.toaster.error("Failed to create pin.");
        }
      });
    }
  }

  clearFileSelection() {
    this.selectedFileBase64Str = null;
    this.selectedFile = null;
    this.formGroup.get('file')?.setValue(this.selectedFileBase64Str);
  }

  private loadCustomers = () => {
    this.blockUI.start();
    this.customerService.list().subscribe({
      next: list => {
        this.blockUI.stop();
        if (!list.data.length) {
          if (this.elRef.nativeElement.closest('.modal')?.classList.contains('show')) {
            this.toaster.error("There are no customers. please add customer.");
            this.closeModal();
          }
        }
        this.customers = list.data;
      },
      error: () => {
        this.blockUI.stop();
        this.closeModal();
        this.toaster.error("Failed to load customers. Try Again Later.");
      }
    });
  }

  private closeModal = () => {
    const modal = bootstrap.Modal.getInstance(this.elRef.nativeElement.closest('.modal'));
    modal?.hide();
    this.reset();
  }

  private reset = () => {
    this.pin = null;
    this.formGroup.reset();
    this.fileSelectStr = '';
    this.fileSelectError = false;
    this.selectedFile = null;
    this.selectedFileBase64Str = null;
  }

  private fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
