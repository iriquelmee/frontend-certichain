import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../../models/user-data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private readonly baseUrl = `${environment.apiUrl}/userdata`;

    constructor(private readonly http: HttpClient) { }

    getAll(): Observable<UserData[]> {
        return this.http.get<UserData[]>(this.baseUrl);
    }

    getById(id: string): Observable<UserData> {
        return this.http.get<UserData>(`${this.baseUrl}/${id}`);
    }

    getByUserID(userID: string): Observable<UserData> {
        return this.http.get<UserData>(`${this.baseUrl}/userid/${userID}`);
    }

    getByUserTypeId(userTypeId: string): Observable<UserData[]> {
        return this.http.get<UserData[]>(`${this.baseUrl}/type/${userTypeId}`);
    }

    create(userData: UserData): Observable<UserData> {
        return this.http.post<UserData>(this.baseUrl, userData);
    }

    update(id: string, userData: UserData): Observable<UserData> {
        return this.http.put<UserData>(`${this.baseUrl}/${id}`, userData);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}
