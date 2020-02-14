import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Message } from '../models/message.data';
import { getMessageIsSingle, getMessageError, getMessageLoading, getMessageUpdateState, getMessageMessages, getMessageSelectedId } from '../store/message.state';
import { MessagesAction, MessageSelectAction, MessageChangeStateAction, MessageCreateAction, MessageUpdatesAction, MessageDeleteAction, MessageChangeCancelAction } from '../store';

@Injectable()
export class PipMessageService {

    constructor(
        private store: Store<any>
    ) { }


    public get error$(): Observable<string> {
        return this.store.select<any>(getMessageError);
    }

    public get loading$(): Observable<boolean> {
        return this.store.select<any>(getMessageLoading);
    }

    public get updateState$(): Observable<string> {
        return this.store.select<any>(getMessageUpdateState);
    }

    public get messages$(): Observable<Message[]> {
        return this.store.select<any>(getMessageMessages);
    }

    public get selectId$(): Observable<string> {
        return this.store.select<any>(getMessageSelectedId);
    }

    public get isSingle$(): Observable<boolean> {
        return this.store.select<any>(getMessageIsSingle);
    }


    public get selectMessage$() {
        return this.store.select<any>((state) => {
            const id: string = state.message.selectId;
            const messages = state.message.messages;
            if (messages && id) {
                for (const message of messages) {
                    if (message.id === id) {
                        return message;
                    }
                }
            }
            return null;
        });
    }

    public message(): void {
        this.store.dispatch(new MessagesAction());
    }

    public messageSelect(id: string): void {
        this.store.dispatch(new MessageSelectAction(id));
    }

    public messageChangeState(state: string): void {
        this.store.dispatch(new MessageChangeStateAction(state));
    }

    public messageCreate(message: Message) {
        this.store.dispatch(new MessageCreateAction(message));
    }

    public messageUpdate(message: Message) {
        this.store.dispatch(new MessageUpdatesAction(message));
    }

    public messageDelete(id: string) {
        this.store.dispatch(new MessageDeleteAction(id));
    }

    public messageChangeCancel(messages: Message[]) {
        this.store.dispatch(new MessageChangeCancelAction(messages));
    }


}
