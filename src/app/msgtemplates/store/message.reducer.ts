import { fromJS } from 'immutable';
import { cloneDeep, filter, findIndex, union } from 'lodash';

import * as _ from 'lodash';

import { PipMessageState } from './message.state';
import { PipUpdateState } from '../models/message.data';
import { PipMessageActionTypes, MessageAction } from './message.action';

export const InitialPipMessageState: PipMessageState = {
    messages: [],
    selectId: null,
    updateState: null,
    loading: null,
    error: null,
    isSingle: false,
    urlState: {}
};

export function pipMessageReducer(state = InitialPipMessageState, action: MessageAction): PipMessageState {
    switch (action.type) {
        case PipMessageActionTypes.Messages:
            let map = fromJS(state);
            map = map.set('messages', []);
            map = map.set('error', null);
            map = map.set('loading', true);
            map = map.set('updateState', PipUpdateState.Progress);
            return map.toJS();

        case PipMessageActionTypes.MessageAbort:
            let updateState = state.messages && state.messages.length > 0 ? PipUpdateState.View : PipUpdateState.Empty;

            return { ...state, updateState: updateState, loading: false, error: null };

        case PipMessageActionTypes.MessageSuccess:
            map = fromJS(state);
            let messageSucess = action.payload;
            if (!messageSucess) {
                messageSucess = [];
            }
            map = map.set('messages', messageSucess);
            map = map.set('error', null);
            map = map.set('loading', false);
            return map.toJS();

        case PipMessageActionTypes.MessageData:
            return { ...state, updateState: action.payload.state };

        case PipMessageActionTypes.MessageEmpty:
            return { ...state, updateState: PipUpdateState.Empty, messages: [], selectId: null };

        case PipMessageActionTypes.MessageFailure:
            return { ...state, error: action.payload, loading: false };

        case PipMessageActionTypes.MessageSelect:
            let id = null;
            const oldId = state.selectId;
            const collection = state.messages;

            if (collection && collection.length > 0) {
                let index = _.findIndex(collection, (item) => item.id === action.payload);
                if (index === -1) {
                    const oldIndex = _.findIndex(collection, (item) => item.id === oldId);
                    if (oldIndex === -1) {
                        index = 0;
                    } else {
                        index = oldIndex < collection.length ? oldIndex : oldIndex - 1;
                    }

                    id = collection[index] ? collection[index].id : null;
                } else {
                    id = action.payload;
                }
            }
            let changes: any = {};
            if (state.selectId !== id) {
                changes.error = null;
            }
            changes.selectId = id;
            changes.updateState = (!state.messages || state.messages.length === 0) ? PipUpdateState.Empty : PipUpdateState.View

            return Object.assign({}, state, changes)

        case PipMessageActionTypes.MessageChangeState:
            return { ...state, updateState: action.payload, error: null };

        case PipMessageActionTypes.MessageUpdate:
            return { ...state, loading: true, error: null };

        case PipMessageActionTypes.MessageUpdateSuccess:
            map = fromJS(state);
            map = map.set('updateState', PipUpdateState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const updateIndex = findIndex(state.messages, { id: action.payload.id }),
                updateMessages = state.messages;
            updateMessages[updateIndex] = action.payload;

            map = map.set('messages', updateMessages);
            return map.toJS();

        case PipMessageActionTypes.MessageUpdateFailure:
            return { ...state, loading: false, error: action.payload }

        case PipMessageActionTypes.MessageChangeCancel:
            const stateAfterCancel = state.messages && state.messages.length > 0 ? PipUpdateState.View : PipUpdateState.Empty;
            return {
                ...state,
                updateState: stateAfterCancel,
                error: null,
                loading: false
            };


        case PipMessageActionTypes.MessageCreate:
            return { ...state, loading: true, error: null };

        case PipMessageActionTypes.MessageCreateSuccess:
            map = fromJS(state);
            map = map.set('updateState', PipUpdateState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const createMessages = state.messages;
            createMessages.push(action.payload);
            map = map.set('messages', createMessages);
            return map.toJS();

        case PipMessageActionTypes.MessageCreateFailure:
            return { ...state, loading: false, error: action.payload };

        case PipMessageActionTypes.MessageDelete:
            return { ...state, loading: true, error: null };

        case PipMessageActionTypes.MessageDeleteSuccess:
            map = fromJS(state);
            map = map.set('error', null);
            map = map.set('loading', false);
            const messages = filter(cloneDeep(state.messages), element => element.id !== action.payload);
            map = map.set('messages', messages);
            map = map.set('updateState', messages && messages.length > 0 ? PipUpdateState.View : PipUpdateState.Empty);
            return map.toJS();

        case PipMessageActionTypes.MessageDeleteFailure:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
