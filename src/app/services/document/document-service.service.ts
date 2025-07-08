import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentRequest } from '../../models/document-request';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SearchDocumentRequestInfo } from '../../models/search-document-request-info';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DocumentServiceService {

    private baseUrl = `${environment.apiUrl}/document`;

    constructor(private http: HttpClient) { }

    createRequest(doc: DocumentRequest): Observable<DocumentRequest> {
        console.log('DocumentService - Enviando solicitud:', JSON.stringify(doc, null, 2));
        
        // validando id de objetos mongo
        if (!doc.requesterID || !doc.issuerID || !doc.documentTypeID) {
            console.warn('DocumentService - Solicitud con IDs faltantes:', {
                requesterID: doc.requesterID ? 'presente' : 'faltante',
                issuerID: doc.issuerID ? 'presente' : 'faltante',
                documentTypeID: doc.documentTypeID ? 'presente' : 'faltante'
            });
        }
        
        return this.http.post<DocumentRequest>(`${this.baseUrl}`, doc).pipe(
            catchError(error => {
                console.error('DocumentService - Error en la solicitud HTTP:', error);
                return throwError(() => new Error('Error al crear la solicitud: ' + (error.message || 'Error de servidor')));
            })
        );
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
