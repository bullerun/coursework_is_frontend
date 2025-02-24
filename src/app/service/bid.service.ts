import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bid} from '../model/bid.model';

@Injectable({providedIn: 'root'})
export class BidService {
  private apiUrl = 'http://localhost:11488/bids'

  constructor(private http: HttpClient) {
  }

  getBids(): Observable<Array<Bid>> {
    return this.http.get<Array<Bid>>(`${this.apiUrl}/my`)
  }


}
