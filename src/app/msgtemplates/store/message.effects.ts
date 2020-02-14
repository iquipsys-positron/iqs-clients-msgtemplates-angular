import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { findIndex } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';

import * as fromMessageActions from './message.action';

import { MessageDataService } from '../services/message.data.service';
import { PipUpdateState } from '../models/message.data';
import { PipMessageActionTypes } from './message.action';

@Injectable()
export class PipMessageEffects {
    private messages;
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private messageDataService: MessageDataService,
    ) { }

    @Effect() message$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                fromMessageActions.PipMessageActionTypes.Messages,
                fromMessageActions.PipMessageActionTypes.MessageAbort
            ),
            switchMap((action: any) => {
                if (action.type = PipMessageActionTypes.Messages) {
                    const payload = (<any>action).payload;
                    return this.messageDataService.messages()
                        .pipe(
                            delay(3000),
                            map(data => {
                                const url = this.messageDataService.serverUrl;

                                if (data && data.length > 0) {
                                    data.forEach(element => {
                                        element = messageUpdate(url, element);
                                    });
                                }
                                return new fromMessageActions.MessageSucessAction(data);

                            }),
                            catchError(error => of(new fromMessageActions.MessageFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() messageSuccess$ = this.actions$
        .pipe(
            ofType(fromMessageActions.PipMessageActionTypes.MessageSuccess),
            map((action: any) => action.payload),
            map(payload => {
                const saveState = this.activatedRoute.snapshot.queryParams['state'];
                if (payload && payload.length > 0) {

                    let index: number = findIndex(payload, { id: this.activatedRoute.snapshot.queryParams['message_id'] });
                    index = index > -1 ? index : 0;
                    if (!saveState || saveState === PipUpdateState.View) {
                        return new fromMessageActions.MessageDataAction({ state: PipUpdateState.View, id: payload[index].id });
                    }
                    return new fromMessageActions.MessageDataAction({ state: saveState, id: payload[index].id });

                }
                return new fromMessageActions.MessageEmptyAction();
            })
        );

    @Effect() messageData$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageData),
            map((action: any) => action.payload),
            map(payload => {
                return new fromMessageActions.MessageSelectAction(payload.id);
            })
        );

    @Effect({ dispatch: false }) messageChangeState$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageChangeState),
            tap(action => {
                const actionWithPayload = <any>action;
            })
        );


    @Effect({ dispatch: false }) messageSelect$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageSelect),
            tap(action => {
                const actionWithPayload = <any>action;
            })
        );

    @Effect() messageUpdate$: Observable<Action> = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageUpdate),
            switchMap((action: any) => {
                if (action.type = PipMessageActionTypes.MessageUpdate) {
                    const payload = (<any>action).payload;
                    return this.messageDataService.messageUpdate(payload)
                        .pipe(
                            delay(3000),
                            map(data => {
                                const url = this.messageDataService.serverUrl;
                                data = messageUpdate(url, data);
                                // this.router.navigate([], { queryParams: { state: PipUpdateState.Update }, queryParamsHandling: 'merge' });

                                return new fromMessageActions.MessageUpdatesSuccessAction(data);

                            }),
                            catchError(error => of(new fromMessageActions.MessageUpdatesFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );


    @Effect() messageCreate$: Observable<Action> = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageCreate),
            switchMap((action: any) => {
                if (action.type = PipMessageActionTypes.MessageCreate) {
                    const payload = (<any>action).payload;
                    return this.messageDataService.messageCreate(payload)
                        .pipe(
                            delay(3000),
                            map(data => {
                                const url = this.messageDataService.serverUrl;

                                data = messageUpdate(url, data);

                                return new fromMessageActions.MessageCreateSuccessAction(data);

                            }),
                            catchError(error => of(new fromMessageActions.MessageCreateFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() messageCreateSuccess$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageCreateSuccess),
            map((action: any) => action.payload),
            map(payload => {
                //let messages;
                // this.router.navigate([], { queryParams: { state: PipUpdateState.Update }, queryParamsHandling: 'merge' });
                // this.MessageService.messages$.subscribe(data => messages = data);
                /*let index: number = _.findIndex(messages, { id: payload });
                index--;
                index = index > -1 ? index : 0;*/
                const messageId = payload ? payload.id : null;
                return new fromMessageActions.MessageSelectAction(messageId);
            })
        );


    @Effect() messageDelete$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageDelete),
            switchMap((action: any) => {
                if (action.type = PipMessageActionTypes.MessageDelete) {
                    const payload = (<any>action).payload;
                    return this.messageDataService.messageDelete(payload)
                        .pipe(
                            delay(3000),
                            map(data => {
                                return new fromMessageActions.MessageDeleteSuccessAction(data);
                            }),
                            catchError(error => of(new fromMessageActions.MessageDeleteFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );


    @Effect() messageDeleteSuccess$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageDeleteSuccess),
            map((action: any) => action.payload),
            map(payload => {
                // let messages;
                // this.MessageService.messages$.subscribe(data => messages = data);
                // let index: number = findIndex(messages, { id: payload });
                // index--;
                // index = index > -1 ? index : 0;
                return new fromMessageActions.MessageSelectAction(null);
            })
        );

    @Effect({ dispatch: false }) messageChangeCancel$ = this.actions$
        .pipe(
            ofType(PipMessageActionTypes.MessageChangeCancel),
            map((action: any) => action.payload),
            map(payload => {
                return new fromMessageActions.MessageChangeCancelAction(payload.messages);
            })
        );


}

function messageUpdate(url: string, element) {
    /*  element.imgUrl = url + '/api/v1/blobs/' + element.sender.id;
      element.docUrls = [];
      element.docs.forEach(doc => {
          element.docUrls.push({ url: url + '/api/v1/blobs/' + doc.id });
      })

      element.picUrls = [];
      element.pics.forEach(pic => {

          element.picUrls.push(url + '/api/v1/blobs/' + pic.id);
      })

      element.updateUrl = element.replier ? url + '/api/v1/blobs/' + element.replier.id : null;
  */
    return element;

}
