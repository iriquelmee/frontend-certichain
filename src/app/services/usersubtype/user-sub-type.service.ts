import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSubType } from '../../models/user-sub-type';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserSubTypeService {
    private baseUrl = `${environment.apiUrl}/userSubTypes`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<UserSubType[]> {
        return this.http.get<UserSubType[]>(this.baseUrl);
    }

    getById(id: string): Observable<UserSubType> {
        return this.http.get<UserSubType>(`${this.baseUrl}/${id}`);
    }

    create(userSubType: UserSubType): Observable<UserSubType> {
        return this.http.post<UserSubType>(this.baseUrl, userSubType);
    }

    update(id: string, userSubType: UserSubType): Observable<UserSubType> {
        return this.http.put<UserSubType>(`${this.baseUrl}/${id}`, userSubType);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
