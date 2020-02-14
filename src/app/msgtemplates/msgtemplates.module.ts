import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PipMessageEffects, pipMessageReducer } from './store';
import { PipMessageService } from './services/message.service';
import { MessageDataService } from './services/message.data.service';
import { MsgTemplatesComponentsModule } from './components/components.module';
import { MsgTemplatesContainersModule } from './containers/containers.module';


@NgModule({
    imports: [
        MsgTemplatesContainersModule,
        MsgTemplatesComponentsModule,
        EffectsModule.forFeature([PipMessageEffects]),
        StoreModule.forFeature('guide', pipMessageReducer),
    ],
    providers: [
        PipMessageService,
        MessageDataService
    ],
})
export class MsgTempatesModule { }
