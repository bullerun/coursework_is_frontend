import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Organization} from '../model/organization.model';

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface Error {
  error: ErrorResponse;

}

@Injectable({providedIn: 'root'})
export class OrganizationService {
  private apiUrl = 'http://localhost:11488/organizations'

  constructor(private http: HttpClient) {
  }

  getOrganizations(): Observable<Array<Organization>> {
    return this.http.get<Array<Organization>>(`${this.apiUrl}/my`)
  }


}
