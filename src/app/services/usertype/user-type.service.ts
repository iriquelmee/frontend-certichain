import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from '../../models/user-type';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
private baseUrl = `${environment.apiUrl}/userTypes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.baseUrl);
  }

  getById(id: string): Observable<UserType> {
    return this.http.get<UserType>(`${this.baseUrl}/${id}`);
  }

  create(userType: UserType): Observable<UserType> {
    return this.http.post<UserType>(this.baseUrl, userType);
  }

  update(id: string, userType: UserType): Observable<UserType> {
    return this.http.put<UserType>(`${this.baseUrl}/${id}`, userType);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
