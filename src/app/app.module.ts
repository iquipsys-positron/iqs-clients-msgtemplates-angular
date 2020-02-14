import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IqsShellContainerComponent, IqsShellModule } from 'iqs-libs-clientshell2-angular';

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { MessageDataService } from './msgtemplates/services/message.data.service';
import { MsgTempatesModule } from './msgtemplates/msgtemplates.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    // application modules
    IqsShellModule.forRoot(),
    AppRoutingModule,
    MsgTempatesModule

  ],
  bootstrap: [IqsShellContainerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
      MessageDataService
  ]

})
export class AppModule { }
