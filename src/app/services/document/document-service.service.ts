import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentRequest } from '../../models/document-request';
import { Observable } from 'rxjs';
import { SearchDocumentRequestInfo } from '../../models/search-document-request-info';

@Injectable({
    providedIn: 'root'
})
export class DocumentServiceService {

    private baseUrl = `http://certichainbff.ddns.net:8082/api/document`;

    constructor(private http: HttpClient) { }

    createRequest(doc: DocumentRequest): Observable<DocumentRequest> {
        return this.http.post<DocumentRequest>(`${this.baseUrl}`, doc);
    }

    discardRequest(id: string): Observable<DocumentRequest> {
        return this.http.delete<DocumentRequest>(`${this.baseUrl}`, {
            params: new HttpParams().set('Id', id)
        });
    }

    uploadDocument(id: string, file: File): Observable<DocumentRequest> {
        const form = new FormData();
        form.append('file', file);
        return this.http.post<DocumentRequest>(`${this.baseUrl}/upload/${id}`, form);
    }

    userSearchRequests(
        requesterID?: string,
        issuerID?: string,
        startDate?: string,
        endDate?: string): Observable<SearchDocumentRequestInfo[]> {
        let params = new HttpParams();
        if (requesterID) { params = params.set('requesterID', requesterID); }
        if (issuerID) { params = params.set('issuerID', issuerID); }
        if (startDate) { params = params.set('startDate', startDate); }
        if (endDate) { params = params.set('endDate', endDate); }
        return this.http.get<SearchDocumentRequestInfo[]>(`${this.baseUrl}/user/search`, { params });
    }

    institutionSearchRequests(
        requesterID?: string,
        issuerID?: string,
        startDate?: string,
        endDate?: string): Observable<SearchDocumentRequestInfo[]> {
        let params = new HttpParams();
        if (requesterID) { params = params.set('requesterID', requesterID); }
        if (issuerID) { params = params.set('issuerID', issuerID); }
        if (startDate) { params = params.set('startDate', startDate); }
        if (endDate) { params = params.set('endDate', endDate); }
        return this.http.get<SearchDocumentRequestInfo[]>(`${this.baseUrl}/institution/search`, { params });
    }

}
