import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from '../../models/user-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
private baseUrl = `http://certichainbff.ddns.net:8082/api/userTypes`;

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
