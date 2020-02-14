import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatProgressBarModule,
  MatButtonToggleModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PipActionListModule, PipButtonToggleGroupModule } from 'pip-webui2-buttons';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipDocumentListModule } from 'pip-webui2-documents';
import { PipDocumentLayoutModule, PipShadowModule } from 'pip-webui2-layouts';
import { PipPictureModule, PipCollageModule } from 'pip-webui2-pictures';

import { PipMessageUpdateComponent } from './message-update.component';

@NgModule({
  declarations: [
    PipMessageUpdateComponent
  ],
  imports: [
    PipDocumentLayoutModule,
    PipShadowModule,
    PipButtonToggleGroupModule,

    FlexLayoutModule,

    TranslateModule,
    FormsModule,
    HttpClientModule,
    CommonModule,

    MatTabsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    PipPictureModule,
    PipActionListModule,
    PipDocumentListModule,
    PipCollageModule,

    PipEmptyStateModule
  ],
  exports: [
    PipMessageUpdateComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipMessageUpdateModule { }
