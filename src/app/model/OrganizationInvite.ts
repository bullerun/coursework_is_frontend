export interface OrganizationInvite {
  id: string;
  senderName: string;
  receiverName: string;
  organization?: {
    id: string;
    name: string;
  };
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}
