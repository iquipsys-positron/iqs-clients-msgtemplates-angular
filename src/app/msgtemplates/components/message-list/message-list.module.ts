import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material';
import { PipSelectedModule } from 'pip-webui2-behaviors';
import { PipEmptyStateModule, PipRefItemModule } from 'pip-webui2-controls';
import { PipDocumentLayoutModule, PipShadowModule } from 'pip-webui2-layouts';

import { PipMessageListComponent } from './message-list.component';

@NgModule({
  declarations: [
    PipMessageListComponent
  ],
  imports: [
    PipDocumentLayoutModule,
    PipShadowModule,

    FormsModule,
    HttpClientModule,
    CommonModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,

    PipEmptyStateModule,
    PipRefItemModule,
    PipSelectedModule
  ],
  exports: [
    PipMessageListComponent
  ],
  providers: [],
})
export class PipMessageListModule { }
