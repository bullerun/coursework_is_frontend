export interface Tender {
  id: string;
  name: string;
  description: string;
  cost: number;
  region: string;
  organizationId: string;
  version: number
  tenderStatus: TenderStatus
  createdAt: Date
  updatedAt: Date
  expiredAt: Date
}

export enum TenderStatus {
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED'
}
