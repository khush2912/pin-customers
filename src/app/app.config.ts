import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {BlockUIModule} from "ng-block-ui";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideToastr({
    positionClass: 'toast-bottom-center'
  }), importProvidersFrom(BlockUIModule.forRoot()), provideHttpClient()]
};
