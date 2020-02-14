import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
    PipMediaModule,
    PipSidenavModule
} from 'pip-webui2-layouts';

import { MsgTemplatesContainerComponent } from './msgtemplates-container.component';
import { MsgTemplatesContainerModule } from './msgtemplates-container.module';
import { MessageDataService } from '../../services/message.data.service';

describe('a message-example component', () => {
    let component: MsgTemplatesContainerComponent;
    let fixture: ComponentFixture<MsgTemplatesContainerComponent>;
    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };
    const mockActivatedRoute = {
        snapshot: {
            queryParams: {
                state: null,
                single: false
            }
        }
    };
    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                LocalStorageModule.withConfig({
                    prefix: 'my-app',
                    storageType: 'localStorage'
                }),
                PipMediaModule.forRoot(),
                PipSidenavModule.forRoot(),

                MsgTemplatesContainerModule
            ],
            providers: [
                { provide: Router, useValue: mockRouter },
                {
                    provide: ActivatedRoute,
                    useValue: mockActivatedRoute
                },
                MessageDataService
            ]
        });
        fixture = TestBed.createComponent(MsgTemplatesContainerComponent);
        component = fixture.componentInstance;
    });

    // instantiation through framework injection
    // beforeEach(inject([MessageExampleComponent], (ExampleComponent) => {
    //     component = ExampleComponent;
    // }));

    it('should have an instance', () => {
        expect(component).toBeDefined();
    });
});
