import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Bid} from '../model/bid.model';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  private baseUrl = 'http://localhost:11488/bid';

  constructor(private http: HttpClient) { }

  getBidsForTender(tenderId: string): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.baseUrl}/${tenderId}/list`);
  }

  getUserBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(`${this.baseUrl}/my`);
  }

  createBid(bidData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/new`, bidData);
  }

  updateBid(bidId: string, updateData: Bid): Observable<any> {
    console.log(updateData);
    return this.http.patch(`${this.baseUrl}/${bidId}/edit`, updateData);
  }

  updateBidStatus(bidId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bidId}/status`, null, {
      params: { status: status }
    });
  }

  rollbackBid(bidId: string, version: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bidId}/rollback/${version}`, {});
  }

  getBidStatus(bidId: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${bidId}/status`);
  }
}
