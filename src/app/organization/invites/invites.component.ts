import {Component, OnInit} from '@angular/core';
import {OrganizationService} from '../../service/organization.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Invite, InviteRequest} from '../../model/invite.model';
import {Error} from '../../model/error.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-invites',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './invites.component.html',
  styleUrl: './invites.component.css'
})
export class InvitesComponent implements OnInit {
  sentInvites: Invite[] = [];
  receivedInvites: Invite[] = [];
  isLoading = false;
  errorMessage = '';
  showInviteModal = false;
  newInvite: InviteRequest = {receiverUsername: '', organizationId: ''};


  closeInviteModal() {
    this.showInviteModal = false;
    this.newInvite = {organizationId: '', receiverUsername: ''};
  }


  onAddInvite() {
    this.orgService.addInvite(this.newInvite).subscribe({
      next: () => {
        this.closeInviteModal();
      },
      error: (err) => console.error('Error sending invite:', err)
    });
  }

  constructor(private orgService: OrganizationService) {
  }

  ngOnInit() {
    this.loadInvites();
  }

  loadInvites() {
    this.isLoading = true;

    this.orgService.getSentInvites().subscribe({
      next: (res) => this.sentInvites = res ?? []
    });

    this.orgService.getReceivedInvites().subscribe({
      next: (res: Invite[]) => this.receivedInvites = res,
      error: (err: Error) => this.errorMessage = err.error.message,
      complete: () => this.isLoading = false
    });
  }

  handleInviteAction(inviteId: string, action: 'accept' | 'reject') {
    const request = action === 'accept'
      ? this.orgService.acceptInvitation(inviteId)
      : this.orgService.rejectInvitation(inviteId);

    request.subscribe({
      next: () => this.loadInvites(),
      error: (err) => this.errorMessage = err.error.message
    });
  }
}
