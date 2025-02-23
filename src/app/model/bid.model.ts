export interface Bid {
  id: string
  name: string
  description: string
  tenderId: string
  cost: number
  region: string
  authorType: AuthorType
  authorId: string
  bidStatus: BidStatus
  createdAt: Date
  updatedAt: Date
  expiredAt: Date
}

export enum AuthorType {
  ORGANIZATION = 'ORGANIZATION',
  EMPLOYEE = 'EMPLOYEE'
}

export enum BidStatus {
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED'
}
