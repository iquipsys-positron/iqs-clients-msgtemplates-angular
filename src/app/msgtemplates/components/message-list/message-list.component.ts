import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { findIndex } from 'lodash';

import { Message, PipUpdateState } from '../../models/message.data';

@Component({
    selector: 'pip-message-list',
    templateUrl: 'message-list.component.html',
    styleUrls: ['./message-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipMessageListComponent implements OnInit {

    @Input() loading = false;
    @Input() state: string = null;
    @Input() messages: Message[];
    @Input() selectId: string;
    @Input() emptyStateActions: any;

    @Input() progressText = 'Loading messages';
    @Input() newMessageText = 'New message';
    @Input() newMessageSubText = 'New message status';
    @Input() progressImageUrl = './assets/progress.svg';
    @Input() emptyImageUrl = './assets/empty.svg';
    @Input() emptyText = 'Messages not found';
    @Input() emptySubText = '';
    @Input() emptyListUrl = './assets/menu-empty.svg';

    @Output() selectChange = new EventEmitter();
    @Output() add = new EventEmitter();

    public MessageColor = '#024184';

    public ngOnInit() {

    }

    public onSelect(event) {
        if (event)
            this.selectChange.emit(this.messages[event.index].id);
    }

    public select(id: string): void {
        if (this.state === PipUpdateState.Edit) this.selectChange.emit(id);
    }


    public addMessage() {
        this.add.emit();
    }

    public get index(): number {
        return findIndex(this.messages, { id: this.selectId });
    }
}
