import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoleRequest} from '../model/role.request.model';

@Injectable({providedIn: 'root'})
export class RoleRequestService {
  private apiUrl = 'http://localhost:11488/role'

  constructor(private http: HttpClient) {
  }

  getRoleRequests(): Observable<Array<RoleRequest>> {
    return this.http.get<Array<RoleRequest>>(`${this.apiUrl}/pending`)
  }

}
