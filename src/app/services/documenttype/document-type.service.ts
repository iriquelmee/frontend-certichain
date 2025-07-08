import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentType } from '../../models/document-type';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DocumentTypeService {
    private baseUrl = `${environment.apiUrl}/documenttypes`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<DocumentType[]> {
        return this.http.get<DocumentType[]>(this.baseUrl);
    }

    getById(id: string): Observable<DocumentType> {
        return this.http.get<DocumentType>(`${this.baseUrl}/${id}`);
    }

    getByUserId(userId: string): Observable<DocumentType[]> {
        return this.http.get<DocumentType[]>(`${this.baseUrl}/user/${userId}`);
    }

    create(documentType: DocumentType): Observable<DocumentType> {
        return this.http.post<DocumentType>(this.baseUrl, documentType);
    }

    update(id: string, documentType: DocumentType): Observable<DocumentType> {
        return this.http.put<DocumentType>(`${this.baseUrl}/${id}`, documentType);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}
