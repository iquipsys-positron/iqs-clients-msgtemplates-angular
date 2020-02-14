import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { cloneDeep } from 'lodash';

import { Message, MessageStatus, MessageStatusItem } from '../../models/message.data';

@Component({
    selector: 'pip-message-update',
    templateUrl: 'message-update.component.html',
    styleUrls: ['./message-update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipMessageUpdateComponent implements OnInit, OnChanges {

    public updateItem: Message = new Message();
    public isChange = false;

    @Input() ln = 'en';
    @Input() statuses: MessageStatusItem[];
    @Input() languages: string[] = [];
    @Input() loading = false;
    @Input() error: any = null;
    @Input() message: Message;
    @Input() icon: string;

    @Input() updateTitleText = '';
    @Input() nameText = 'Name';
    @Input() statusText = 'Status';
    @Input() subjectText = 'Subject';
    @Input() textText = 'Text';
    @Input() htmlText = 'Html';
    @Input() updateText = 'Update';
    @Input() messageText = 'Message';
    @Input() cancelText = 'Cancel';
    @Input() reviewText = 'Review';
    @Input() deleteText = 'Delete';
    @Input() messageErrorNameRequired = 'Name is required';

    @Output() cancel = new EventEmitter();
    @Output() update = new EventEmitter();
    @Output() review = new EventEmitter();
    @Output() create = new EventEmitter();
    @Output() delete = new EventEmitter();
    @Output() change = new EventEmitter();
    @Output() changeLang = new EventEmitter();

    public constructor() {

    }

    private initStatuses() {
        if (!this.statuses) {
            this.statuses = [
                { title: 'MESSAGE_STATUS_NEW', id: MessageStatus.New },
                { title: 'MESSAGE_STATUS_WRITING', id: MessageStatus.Writing },
                { title: 'MESSAGE_STATUS_TRANSLATING', id: MessageStatus.Translating },
                { title: 'MESSAGE_STATUS_VERIFYING', id: MessageStatus.Verifying },
                { title: 'MESSAGE_STATUS_COMPLETED', id: MessageStatus.Completed }
            ];
        }
    }

    public ngOnChanges(change: SimpleChanges) {
        if (change.message && change.message.currentValue !== change.message.previousValue) {
            this.updateItem = cloneDeep(change.message.currentValue);

            if (!this.updateItem) {
                this.updateItem = new Message();
            }

            if (!this.updateItem.status) {
                this.updateItem.status = this.statuses && this.statuses[0] ? this.statuses[0].id : null;
            }

            if (!this.updateItem.subject) {
                this.updateItem.subject = {};
            }
            if (!this.updateItem.text) {
                this.updateItem.text = {};
            }
            if (!this.updateItem.html) {
                this.updateItem.html = {};
            }

            // for new message id not present
            this.isChange = !this.updateItem.id;
        }
    }

    public onCancel(): void {
        this.cancel.emit();
        this.updateItem = cloneDeep(this.message);
        this.isChange = !this.updateItem.id;       
    }

    public ngOnInit() {
        this.initStatuses();
    }

    public deleteSubmit(): void {
        this.delete.emit(this.message.id);
    }

    public saveSubmit(): void {
        const message = cloneDeep(this.updateItem);
        this.update.emit(message);
    }

    public changeLn(event: any): void {
        this.ln = event;
        this.changeLang.emit(this.ln);
    }

    public onReview(message: Message) {
        this.review.emit({
            message: message,
            ln: this.ln
        });
    }

    public onChange() {
        this.isChange = true;
        if (this.change) { this.change.emit(); }
    }

    public changeStatus(st) {
        this.updateItem.status = st;
        //this.isChange = true;
        this.onChange();
    }

    public changeName() {
        //this.isChange = true;
        this.onChange();
    }

    public changeSubject() {
        //this.isChange = true;
        this.onChange();
    }

    public changeText() {
        //this.isChange = true;
        this.onChange();
    }

    public changeHtml(html) {
        //this.isChange = true;
        this.onChange();
    }
}
