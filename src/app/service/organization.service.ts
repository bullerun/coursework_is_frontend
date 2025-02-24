import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Organization} from '../model/organization.model';
import {Invite} from '../model/invite.model';
import {Error} from '../model/error.model';

@Injectable({providedIn: 'root'})
export class OrganizationService {
  private apiUrl = 'http://localhost:11488/organizations'

  constructor(private http: HttpClient) {
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.apiUrl}/my`);
  }

  createOrganization(data: any) {
    return this.http.post(`${this.apiUrl}/new`, data);
  }

  addInvite(inviteData: {
    organizationId: string,
    receiverUsername: string
  }): Observable<string | Error> {
    return this.http.post(`${this.apiUrl}/invite/add`, inviteData, {responseType: 'text'});
  }

  acceptInvitation(invitationId: string): Observable<string | Error> {
    return this.http.post(`${this.apiUrl}/invite/${invitationId}/accept`, {}, {responseType: 'text'});
  }

  rejectInvitation(invitationId: string): Observable<string | Error> {
    return this.http.post(`${this.apiUrl}/invite/${invitationId}/reject`, {}, {responseType: 'text'});
  }

  updateRole(roleData: any) {
    return this.http.post(`${this.apiUrl}/updateRole`, roleData);
  }

  //TODO сделать как тут
  getSentInvites(): Observable<Invite[] | null> {
    return this.http.get<Array<Invite>>(`${this.apiUrl}/invite/myInvite`).pipe(
      catchError((err: Error) => {
        alert(err.error.message)
        return of(null)
      })
    );
  }

  getReceivedInvites(): Observable<Array<Invite>> {
    return this.http.get<Array<Invite>>(`${this.apiUrl}/invite/myInvitations`);
  }
}
