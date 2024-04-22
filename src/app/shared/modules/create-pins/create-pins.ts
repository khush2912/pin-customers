import {FormControl} from "@angular/forms";

export interface CreatePinsFormGroup {
  title: FormControl<string>,
  file: FormControl<string>,
  collaboratorIds: FormControl<number[]>,
  privacy: FormControl<string>;
}
