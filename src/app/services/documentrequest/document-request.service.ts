import { Injectable } from '@angular/core';
import { DocumentRequest } from '../../models/document-request';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentRequestService {
    private baseUrl = `http://certichainbff.ddns.net:8082/api/requests`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<DocumentRequest[]> {
        return this.http.get<DocumentRequest[]>(this.baseUrl);
    }

    create(doc: DocumentRequest): Observable<DocumentRequest> {
        return this.http.post<DocumentRequest>(this.baseUrl, doc);
    }

    update(doc: DocumentRequest): Observable<DocumentRequest> {
        return this.http.put<DocumentRequest>(this.baseUrl, doc);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getByRequester(requesterID: string): Observable<DocumentRequest[]> {
        return this.http.get<DocumentRequest[]>(`${this.baseUrl}/requester/${requesterID}`);
    }

    getByIssuer(issuerID: string): Observable<DocumentRequest[]> {
        return this.http.get<DocumentRequest[]>(`${this.baseUrl}/issuer/${issuerID}`);
    }

    getByDateRange(start: Date, end: Date): Observable<DocumentRequest[]> {
        const params = new HttpParams()
            .set('startDate', start.toISOString())
            .set('endDate', end.toISOString());
        return this.http.get<DocumentRequest[]>(`${this.baseUrl}/dates`, { params });
    }

    search(
        requesterID?: string,
        issuerID?: string,
        startDate?: Date,
        endDate?: Date
    ): Observable<DocumentRequest[]> {
        let params = new HttpParams();

        if (requesterID) {
            params = params.set('requesterID', requesterID);
        }
        if (issuerID) {
            params = params.set('issuerID', issuerID);
        }
        if (startDate) {
            params = params.set('startDate', startDate.toISOString());
        }
        if (endDate) {
            params = params.set('endDate', endDate.toISOString());
        }

        return this.http.get<DocumentRequest[]>(`${this.baseUrl}/search`, { params });
    }
}
