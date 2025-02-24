import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tender, TenderRollback, TenderStatus, TenderStatusUpdate} from '../model/tender.model';

@Injectable({providedIn: 'root'})
export class TenderService {
  private apiUrl = 'http://localhost:11488/tenders'

  constructor(private http: HttpClient) {
  }

  getTenders(): Observable<Array<Tender>> {
    return this.http.get<Array<Tender>>(`${this.apiUrl}`)
  }

  getMyTenders(): Observable<Tender[]> {
    return this.http.get<Tender[]>(`${this.apiUrl}/my`);
  }

  getPublicTenders(): Observable<Tender[]> {
    return this.http.get<Tender[]>(`${this.apiUrl}`);
  }

  createTender(tender: Partial<Tender>): Observable<Tender> {
    return this.http.post<Tender>(`${this.apiUrl}/new`, tender);
  }

  editTender(tender: Tender): Observable<Tender> {
    return this.http.patch<Tender>(`${this.apiUrl}/${tender.id}/edit`, tender);
  }
  getTenderStatus(tenderId: string): Observable<TenderStatus> {
    return this.http.get<TenderStatus>(`${this.apiUrl}/${tenderId}/status`);
  }

  updateTenderStatus(update: TenderStatusUpdate): Observable<Tender> {
    return this.http.put<Tender>(
      `${this.apiUrl}/${update.tenderId}/status`,
      null,
      {params: {status: update.status}}
    );
  }

  rollbackTender(rollback: TenderRollback): Observable<Tender> {
    return this.http.put<Tender>(
      `${this.apiUrl}/${rollback.tenderId}/rollback/${rollback.version}`,
      {}
    );
  }

}
