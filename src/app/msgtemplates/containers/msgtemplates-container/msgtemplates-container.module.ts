import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatProgressBarModule,
  MatListModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { PipEmptyStateModule } from 'pip-webui2-controls';
import { PipDocumentListModule } from 'pip-webui2-documents';
import { PipMediaModule, PipMenuLayoutModule, PipShadowModule, PipDocumentLayoutModule, PipSidenavModule } from 'pip-webui2-layouts';
import { PipNavService, PipNavModule } from 'pip-webui2-nav';
import { PipMessageEffects } from '../../store/message.effects';
import { pipMessageReducer, InitialPipMessageState } from '../../store/message.reducer';
import { PipMessageListModule } from '../../components/message-list/message-list.module';
import { PipMessageUpdateModule } from '../../components/message-update/message-update.module';
import { PipMessageService } from '../../services/message.service';
import { MessageDeleteDialog } from '../../components/message-delete-dialog/message-delete-dialog';
import { MessageReviewDialog } from '../../components/message-review-dialog/message-review-dialog';
import { MsgTemplatesContainerComponent } from './msgtemplates-container.component';
import { IqsAskDialogComponent, IqsAskDialogModule } from 'iqs-libs-clientshell2-angular';

@NgModule({
  declarations: [
    MsgTemplatesContainerComponent,
    MessageDeleteDialog,
    MessageReviewDialog
  ],
  entryComponents: [
    MessageDeleteDialog,
    MessageReviewDialog,
    IqsAskDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDialogModule,

    PipMediaModule.forRoot(),
    PipSidenavModule.forRoot(),
    PipMenuLayoutModule,
    PipShadowModule,
    PipEmptyStateModule,
    PipDocumentLayoutModule,
    PipDocumentListModule,

    PipMessageUpdateModule,
    PipMessageListModule,
    PipNavModule.forRoot(),
    IqsAskDialogModule,

    EffectsModule.forFeature([
      PipMessageEffects
    ]),
    StoreModule.forFeature(
      'message',
      pipMessageReducer,
      {
        initialState: InitialPipMessageState
      }
    ),
  ],
  exports: [
    MsgTemplatesContainerComponent
  ],
  providers: [
    PipNavService,
    PipMessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MsgTemplatesContainerModule { }
