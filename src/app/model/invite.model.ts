export interface InviteRequest {
  receiverUsername: string;
  organizationId: string;
}
export interface Invite {
  id: string;
  senderName: string;
  receiverName: string;
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}
