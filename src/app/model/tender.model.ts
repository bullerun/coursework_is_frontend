export interface Tender {
  id: string;
  name: string;
  description: string;
  cost: number;
  region: string;
  organizationId: string;
  version: number
  status: TenderStatus
  createdAt: Date
  updatedAt: Date
  expiredAt: Date
  ownerID: string
}

export enum TenderStatus {
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED'
}


export interface TenderStatusUpdate {
  tenderId: string;
  status: TenderStatus;
}

export interface TenderRollback {
  tenderId: string;
  version: number;
}
