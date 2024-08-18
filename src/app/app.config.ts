import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(withNoHttpTransferCache()), 
              provideHttpClient(withFetch()),
                provideAnimations(),
                provideToastr({
                  timeOut: 3000,
                  positionClass: 'toast-bottom-right',
                  preventDuplicates: true,
                }),
              ],
    
};
