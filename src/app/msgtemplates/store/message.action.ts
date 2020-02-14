import { Action } from '@ngrx/store';


export enum PipMessageActionTypes {
    Messages = '[Content] Message',
    MessageAbort = '[Content] Message Abort',
    MessageEmpty = '[Content] Message Empty',
    MessageData = '[Content] Message Data',
    MessageSuccess = '[Content] Message Success',
    MessageFailure = '[Content] Message Failure',
    MessageSelect = '[Content] Message Select',
    MessageChangeState = '[Content] Message Change state',
    MessageCreate = '[Content] Message Create',
    MessageCreateSuccess = '[Content] Message Create Success',
    MessageCreateFailure = '[Content] Message Create Failure',
    MessageUpdate = '[Content] Message Update',
    MessageUpdateSuccess = '[Content] Message Update Success',
    MessageUpdateFailure = '[Content] Message Update Failure',
    MessageDelete = '[Content] Delete Message ',
    MessageDeleteSuccess = '[Content] Delete Message  Success',
    MessageDeleteFailure = '[Content] Delete Message Failure',
    MessageChangeCancel = '[Content] Message Edit/Create/Delete Cancel'
}

export class MessagesAction implements Action {
    readonly type = PipMessageActionTypes.Messages;

    constructor() { }
}

export class MessageAbortAction implements Action {
    readonly type = PipMessageActionTypes.MessageAbort;

    constructor(public payload: any) { }
}

export class MessageEmptyAction implements Action {
    readonly type = PipMessageActionTypes.MessageEmpty;

    constructor() { }
}

export class MessageDataAction implements Action {
    readonly type = PipMessageActionTypes.MessageData;

    constructor(public payload: any) { }
}

export class MessageSucessAction implements Action {
    readonly type = PipMessageActionTypes.MessageSuccess;

    constructor(public payload: any) { }
}

export class MessageFailureAction implements Action {
    readonly type = PipMessageActionTypes.MessageFailure;

    constructor(public payload: any) { }
}

export class MessageSelectAction implements Action {
    readonly type = PipMessageActionTypes.MessageSelect;

    constructor(public payload: any) { }
}

export class MessageChangeStateAction implements Action {
    readonly type = PipMessageActionTypes.MessageChangeState;

    constructor(public payload: any) { }
}

export class MessageCreateAction implements Action {
    readonly type = PipMessageActionTypes.MessageCreate;

    constructor(public payload: any) { }
}

export class MessageCreateSuccessAction implements Action {
    readonly type = PipMessageActionTypes.MessageCreateSuccess;

    constructor(public payload: any) { }
}

export class MessageCreateFailureAction implements Action {
    readonly type = PipMessageActionTypes.MessageCreateFailure;

    constructor(public payload: any) { }
}

export class MessageUpdatesAction implements Action {
    readonly type = PipMessageActionTypes.MessageUpdate;

    constructor(public payload: any) { }
}

export class MessageUpdatesSuccessAction implements Action {
    readonly type = PipMessageActionTypes.MessageUpdateSuccess;

    constructor(public payload: any) { }
}

export class MessageUpdatesFailureAction implements Action {
    readonly type = PipMessageActionTypes.MessageUpdateFailure;

    constructor(public payload: any) { }
}

export class MessageChangeCancelAction implements Action {
    readonly type = PipMessageActionTypes.MessageChangeCancel;

    constructor(public payload: any) { }
}

export class MessageDeleteAction implements Action {
    readonly type = PipMessageActionTypes.MessageDelete;

    constructor(public payload: any) { }
}

export class MessageDeleteSuccessAction implements Action {
    readonly type = PipMessageActionTypes.MessageDeleteSuccess;

    constructor(public payload: any) { }
}

export class MessageDeleteFailureAction implements Action {
    readonly type = PipMessageActionTypes.MessageDeleteFailure;

    constructor(public payload: any) { }
}

export type MessageAction = MessagesAction
    | MessageAbortAction
    | MessageEmptyAction
    | MessageDataAction
    | MessageSucessAction
    | MessageFailureAction
    | MessageSelectAction
    | MessageChangeStateAction
    | MessageCreateAction
    | MessageCreateSuccessAction
    | MessageCreateFailureAction
    | MessageUpdatesAction
    | MessageUpdatesSuccessAction
    | MessageUpdatesFailureAction
    | MessageChangeCancelAction
    | MessageDeleteAction
    | MessageDeleteSuccessAction
    | MessageDeleteFailureAction;

