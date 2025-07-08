import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivateDocumentAuditLog } from '../../models/private-document-audit-log';
import { PublicDocumentAuditLog } from '../../models/public-document-audit-log';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DocumentAuditService {
    private baseUrl = `${environment.apiUrl}/audit`;

    constructor(private http: HttpClient) { }

    getPrivateAuditLogs(
        filterType: string,
        filterValue: string,
        startDate: string,
        endDate: string): Observable<PrivateDocumentAuditLog[]> {
        const params = new HttpParams()
            .set('filterType', filterType)
            .set('filterValue', filterValue)
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<PrivateDocumentAuditLog[]>(`${this.baseUrl}/private`, { params });
    }

    getPublicAuditLogs(
        filterType: string,
        filterValue: string,
        startDate: string,
        endDate: string): Observable<PublicDocumentAuditLog[]> {
        const params = new HttpParams()
            .set('filterType', filterType)
            .set('filterValue', filterValue)
            .set('startDate', startDate)
            .set('endDate', endDate);

        return this.http.get<PublicDocumentAuditLog[]>(`${this.baseUrl}/public`, { params });
    }
    
}
