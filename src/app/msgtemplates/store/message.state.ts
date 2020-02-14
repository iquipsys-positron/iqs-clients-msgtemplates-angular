import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Message } from '../models/message.data';

export class PipMessageState {
    public messages: Message[];
    public loading: boolean;
    public updateState: string;
    public error: any;
    public selectId: string;
    public urlState: any;
    public isSingle: boolean;
}

export const getMessagesStoreState = createFeatureSelector<PipMessageState>('message');

export const getMessageMessages = createSelector(getMessagesStoreState, (state: PipMessageState) => state.messages);
export const getMessageLoading = createSelector(getMessagesStoreState, (state: PipMessageState) => state.loading);
export const getMessageUpdateState = createSelector(getMessagesStoreState, (state: PipMessageState) => state.updateState);
export const getMessageError = createSelector(getMessagesStoreState, (state: PipMessageState) => state.error);
export const getMessageSelectedId = createSelector(getMessagesStoreState, (state: PipMessageState) => state.selectId);
export const getMessageUrlState = createSelector(getMessagesStoreState, (state: PipMessageState) => state.urlState);
export const getMessageIsSingle = createSelector(getMessagesStoreState, (state: PipMessageState) => state.isSingle);