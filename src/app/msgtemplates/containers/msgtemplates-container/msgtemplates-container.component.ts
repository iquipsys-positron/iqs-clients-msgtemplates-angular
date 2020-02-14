import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewContainerRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { PipMediaService, MediaMainChange, PipSidenavService } from 'pip-webui2-layouts';
import { PipNavService } from 'pip-webui2-nav';
import { IqsAskDialogComponent } from 'iqs-libs-clientshell2-angular';

import { MessageTranslations } from './message.strings';
import { PipUpdateState } from '../../models/message.data';
import { MessageReviewDialog } from '../../components/message-review-dialog/message-review-dialog';
import { PipMessageService } from '../../services/message.service';
import { Message } from '../../models/message.data';
import { MessageDataService } from '../../services/message.data.service';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-msgtemplates-container',
    templateUrl: 'msgtemplates-container.component.html',
    styleUrls: ['msgtemplates-container.component.scss']
})

export class MsgTemplatesContainerComponent implements OnInit, OnDestroy {

    public messages$: Observable<Message[]>;
    public loading$: Observable<boolean>;
    public error$: Observable<any>;
    public updateState$: Observable<string>;
    public selectId$: Observable<string>;
    public selectMessage$: Observable<Message>;
    public isSingle: boolean;
    public languages: string[] = ['en', 'ru'];
    public ln = 'en';

    private _messages: Message[];
    private _state: string;
    public isSingle$: BehaviorSubject<boolean>;

    public emptyMessage = new Message();
    private subscriptions: Subscription = new Subscription();
    public emptyStateActions: any[];
    private isBackIcon = false;

    constructor(
        private _viewContainerRef: ViewContainerRef,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private navService: PipNavService,
        private cd: ChangeDetectorRef,
        public media: PipMediaService,
        private router: Router,
        private data: MessageDataService,
        public sidenav: PipSidenavService,
        private messageService: PipMessageService,
        private translate: TranslateService,
        private ngZone: NgZone
    ) {

        this.sidenav.active = true;
        this.error$ = this.messageService.error$;
        this.loading$ = this.messageService.loading$;
        this.messages$ = this.messageService.messages$;
        this.updateState$ = this.messageService.updateState$;
        this.selectId$ = this.messageService.selectId$;
        this.selectMessage$ = this.messageService.selectMessage$;

        this.translate.setTranslation('en', MessageTranslations.en, true);
        this.translate.setTranslation('ru', MessageTranslations.ru, true);

        this.subscriptions.add(combineLatest(
            this.messageService.selectMessage$.pipe(filter(p => !!p)),
            this.messageService.updateState$,
            this.messageService.isSingle$,
        ).pipe(
            debounceTime(10)
        ).subscribe(([message, state, isSingle]) => {
            this.ngZone.run(() => this.router.navigate([], {
                queryParams: { message_id: message.id, state: state, single: isSingle },
                queryParamsHandling: 'merge'
            }));
        }));


        this.navService.showBreadcrumb({
            items: [
                { title: 'MESSAGE.BREADCRUMB.TITLE' }
            ]
        });

        this.emptyStateActions = [
            { title: this.translate.instant('MESSAGE.ADD.BUTTON.TEXT'), action: () => { this.initAdd(); } }
        ];
        this.subscriptions = new Subscription();
    }

    public ngOnInit() {

        this.isSingle$ = new BehaviorSubject(!(this.media.isMainActive('xs') || this.media.isMainActive('sm'))
            ? this.activatedRoute.snapshot.queryParams['single']
            : false);
        this.subscriptions.add(this.isSingle$.subscribe(single => {
            this.isSingle = single;
            this.changeNavWithState();
        }));
        this.isSingle$.next((this.media.isMainActive('xs') || this.media.isMainActive('sm'))
            && (this.activatedRoute.snapshot.queryParams['state'] === PipUpdateState.Create
                || this.activatedRoute.snapshot.queryParams['state'] === PipUpdateState.Edit)
            ? true
            : this.isSingle);

        this.subscriptions.add(this.messages$.subscribe(guides => this._messages = guides));
        this.subscriptions.add(this.updateState$.subscribe(state => {
            this._state = state;
            this.changeNavWithState();
        }));


        this.messageService.message();
        this.subscriptions.add(this.media.asObservableMain().subscribe((change: MediaMainChange) => {
            if (!(change.aliases.includes('xs') || change.aliases.includes('sm'))) {
                this.isSingle$.next(false);
                if (this.isBackIcon) { this.restoreIcon(); }
            }

            if ((change.aliases.includes('xs') || change.aliases.includes('sm'))
                && (this.activatedRoute.snapshot.queryParams['state'] === PipUpdateState.Create
                    || this.activatedRoute.snapshot.queryParams['state'] === PipUpdateState.Edit)) {
                this.isSingle$.next(true);
            }

            this.cd.detectChanges();
        }));
    }

    public ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }


    public changeLn(ln: string) {
        this.ln = ln;
    }

    public openReview(review: any): void {
        this.ln = review.ln;
        const dialogRef = this.dialog.open(MessageReviewDialog, {
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',

            data: { review: review }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
    }

    public openDialog(id: string): void {
        this.dialog.open(IqsAskDialogComponent, {
            width: '450px',
            data: {
                title: 'MESSAGE.DELETE.DIALOG.TITLE',
                content: [
                    this.translate.instant('MESSAGE.DELETE.DIALOG.MESSAGE')
                ],
                actions: {
                    no: {
                        text: 'MESSAGE.DELETE.DIALOG.BUTTON.CANCEL',
                        returnValue: false
                    },
                    yes: {
                        text: 'MESSAGE.DELETE.DIALOG.BUTTON.OK',
                        returnValue: true,
                        color: 'warn'
                    }
                },
                initFocusActionKey: 'no'
            }
        }).afterClosed().subscribe((accept: boolean) => {
            if (accept) {
                // DO SOMETHING
                this.delete(id);
            } else {
                // DO SOMETHING ELSE
            }
        });
    }

    public select(id) {
        if (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit) {
            this.dialog.open(IqsAskDialogComponent, {
                width: '450px',
                data: {
                    title: 'MESSAGE.EDIT.CANCEL.DIALOG.TITLE',
                    content: [
                        this.translate.instant('MESSAGE.EDIT.CANCEL.DIALOG.MESSAGE')
                    ],
                    actions: {
                        no: {
                            text: 'MESSAGE.EDIT.CANCEL.DIALOG.BUTTON.CANCEL',
                            returnValue: false
                        },
                        yes: {
                            text: 'MESSAGE.EDIT.CANCEL.DIALOG.BUTTON.OK',
                            returnValue: true,
                            color: 'warn'
                        }
                    },
                    initFocusActionKey: 'no'
                }
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    // DO SOMETHING
                    this.cancel();
                    this.onSelectById(id);
                } else {
                    // DO SOMETHING ELSE
                }
            });
        } else {
            this.onSelectById(id);
        }

    }

    private onSelectById(id: string): void {
        this.messageService.messageSelect(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => {
                    if (this._state === PipUpdateState.Create || this._state === PipUpdateState.Edit) {
                        this.select(null);
                    } else {
                        this.isSingle$.next(false);
                        this.restoreIcon();
                    }
                }
            });

        }
    }


    private restoreIcon() {
        this.isBackIcon = false;
        this.navService.showNavIcon({
            icon: 'menu',
            action: () => {
                this.sidenav.toggleOpened();
            }
        });
    }


    public initUpdate() {
        this.messageService.messageChangeState(PipUpdateState.Edit);
    }


    public initAdd() {
        this.messageService.messageChangeState(PipUpdateState.Create);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(true);
            this.isBackIcon = true;
            this.navService.showNavIcon({
                icon: 'arrow_back',
                action: () => this.select(null)
            });

        }
    }

    public cancel() {
        this.messageService.messageChangeCancel(this._messages);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
        if (this.isBackIcon) {
            this.restoreIcon();
        }
    }

    public update(message: Message) {
        this.messageService.messageUpdate(message);
    }

    public create(message: Message) {
        this.messageService.messageCreate(message);
    }

    public delete(id: string) {
        this.messageService.messageDelete(id);
        if (this.media.isMainActive('xs') || this.media.isMainActive('sm')) {
            this.isSingle$.next(false);
        }
    }

    public change() {
        this.messageService.messageChangeState(PipUpdateState.Edit);
    }


    public changeNavWithState() {
        const isMobile = this.media.isMainActive('xs') || this.media.isMainActive('sm');
        if (!this.isSingle && this.isBackIcon) {
            this.restoreIcon();
        }
        if (!isMobile) {
            switch (this._state) {
                case PipUpdateState.Edit:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'MESSAGE.BREADCRUMB.TITLE',
                                click: () => {
                                    this.cancel();
                                }
                            },
                            { title: 'MESSAGE.EDIT' }
                        ]
                    });
                    return;
                    case PipUpdateState.View:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'MESSAGE.BREADCRUMB.TITLE',
                                click: () => {
                                    this.cancel();
                                }
                            },
                            { title: 'MESSAGE.VIEW' }
                        ]
                    });
                    return;
                case PipUpdateState.Create:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'MESSAGE.BREADCRUMB.TITLE',
                                click: () => {
                                    this.cancel();
                                }
                            },
                            { title: 'MESSAGE.CREATE' }
                        ]
                    });
                    return;
                default:
                    this.navService.showBreadcrumb({
                        items: [
                            { title: 'MESSAGE.BREADCRUMB.TITLE' }
                        ]
                    });
            }
        } else {
            if (this.isSingle && !this.isBackIcon) {
                this.isBackIcon = true;
                this.navService.showNavIcon({
                    icon: 'arrow_back',
                    action: () => {
                        if (this._state == PipUpdateState.Edit || this._state === PipUpdateState.Create) {
                            this.select(null);
                        } else {
                            this.cancel();
                        }
                    }
                });
            }
            switch (this._state) {
                case PipUpdateState.View:
                    if (!this.isSingle) {
                        this.navService.showBreadcrumb({
                            items: [
                                { title: 'MESSAGE.BREADCRUMB.TITLE' }
                            ]
                        });

                        return;
                    }
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'MESSAGE.DETAILS',
                                click: () => {
                                    this.cancel();
                                }
                            }
                        ]
                    });

                    return;

                    case PipUpdateState.Edit:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'MESSAGE.EDIT',
                                click: () => {
                                    this.cancel();
                                }
                            }
                        ]
                    });
                    return;

                case PipUpdateState.Create:
                    this.navService.showBreadcrumb({
                        items: [
                            {
                                title: 'MESSAGE.CREATE',
                                click: () => {
                                    this.cancel();
                                }
                            }
                        ]
                    });
                    return;
                default:
                    this.navService.showBreadcrumb({
                        items: [
                            { title: 'MESSAGE.BREADCRUMB.TITLE' }
                        ]
                    });
            }

        }

    }
}
