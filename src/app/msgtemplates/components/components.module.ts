import { NgModule } from '@angular/core';
import { PipMessageListModule } from './message-list/message-list.module';
import { PipMessageUpdateModule } from './message-update/message-update.module';
import { LangFilterPipe } from './pipes/lang-filter.pipe';


@NgModule({
  declarations: [LangFilterPipe],
  imports: [
    PipMessageListModule,
    PipMessageUpdateModule
  ]
})
export class MsgTemplatesComponentsModule { }