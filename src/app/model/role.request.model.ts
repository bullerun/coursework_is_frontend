export interface RoleRequest {
  id: string
  userId: string
  requestedRole: string
  status: RequestStatus
  createdAt: Date
}

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
