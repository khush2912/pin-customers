import {FormControl} from "@angular/forms";

export interface CreateCustomersFormGroup {
  title: FormControl<string>,
  email: FormControl<string>,
  region: FormControl<string>,
  country: FormControl<string>
}
export interface Customers {
  id?: number,
  title: string,
  email: string,
  region: string,
  country: string
}

export interface GeoData {
  country: string,
  region: string
}
