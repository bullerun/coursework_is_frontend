import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tender} from '../model/tender.model';

@Injectable({providedIn: 'root'})
export class TenderService {
  private apiUrl = 'http://localhost:11488/tenders'

  constructor(private http: HttpClient) {
  }

  getTenders(): Observable<Array<Tender>> {
    return this.http.get<Array<Tender>>(`${this.apiUrl}`)
  }


}
