import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {FeedbackRequestDTO, FeedbackResponseDTO} from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = 'http://localhost:11488/feedback';

  constructor(private http: HttpClient) {}


  createFeedback(feedbackData: FeedbackRequestDTO): Observable<FeedbackResponseDTO> {
    console.log(feedbackData);
    return this.http.post<FeedbackResponseDTO>(`${this.baseUrl}`, feedbackData);
  }

  getFeedbacks(bidId: string): Observable<FeedbackResponseDTO[]> {
    return this.http.get<FeedbackResponseDTO[]>(`${this.baseUrl}/${bidId}`);
  }

  submitDecision(bidId: string, decision: string): Observable<any> {
    console.log(decision);
    return this.http.post(`${this.baseUrl}/${bidId}/decision`, { decision: decision });
  }

  getApprovedFeedbacks(bidId: string): Observable<FeedbackResponseDTO[]> {
    return this.http.get<FeedbackResponseDTO[]>(`${this.baseUrl}/${bidId}/approved`);
  }

}
