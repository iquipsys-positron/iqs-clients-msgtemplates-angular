import { NgModule } from '@angular/core';
import { PipMessageListModule } from './message-list/message-list.module';
import { PipMessageUpdateModule } from './message-update/message-update.module';



@NgModule({
  imports: [
    PipMessageListModule,
    PipMessageUpdateModule
  ] 
})
export class MsgTemplatesComponentsModule { }