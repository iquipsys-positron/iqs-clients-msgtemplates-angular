import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IqsSessionConfigService } from 'iqs-libs-clientshell2-angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Message } from '../models/message.data';

@Injectable()
export class MessageDataService {

    public constructor(
        private http: HttpClient,
        private sessionConfig: IqsSessionConfigService
    ) { }

    public get serverUrl(): string {
        return this.sessionConfig.serverUrl;
    }

    private handleError(response: Response) {
        const error = response.json();
        return Observable.throw(error);
    }

    public messages(): Observable<any> {

        const url = this.serverUrl + '/api/v1/msg_templates';

        return this.http.get(url)
            .pipe(
                map(response => {
                    return response['data'];
                }),
                catchError(this.handleError)
            );

    }

    public messageUpdate(message: Message): Observable<any> {


        const url = this.serverUrl + '/api/v1/msg_templates/' + message.id + '';

        return this.http.put(url, message)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public messageCreate(message: Message): Observable<any> {

        const url = this.serverUrl + '/api/v1/msg_templates';

        return this.http.post(url, message)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(this.handleError)
            );
    }

    public messageDelete(id: string): Observable<any> {

        const url = this.serverUrl + '/api/v1/msg_templates/' + id + '';

        return this.http.delete(url)
            .pipe(
                map(response => {
                    return id;
                }),
                catchError(this.handleError)
            );
    }
}
