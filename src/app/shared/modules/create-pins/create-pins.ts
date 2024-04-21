import {FormControl} from "@angular/forms";

export interface CreatePinsFormGroup {
  title: FormControl<string>,
  file: FormControl<string>,
  collaborator: FormControl<string[]>,
  privacy: FormControl<string>;
}
