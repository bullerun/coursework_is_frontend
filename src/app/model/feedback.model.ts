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

export interface FeedbackRequestDTO {
  bidId: string;
  description: string;
  organizationId: string;
}

export interface FeedbackResponseDTO {
  id: string;
  description: string;
  feedbackStatus: FeedbackStatus;
  createdAt: string;
}

export enum FeedbackDecisionDTO {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT'
}
