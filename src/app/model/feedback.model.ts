export interface Feedback {
  id: string;
  description: string;
  feedbackStatus: FeedbackStatus;
  createdAt: Date;
}

export enum FeedbackStatus {
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}
