import {Component, OnInit} from '@angular/core';
import {Organization} from '../model/organization.model';
import {NgForOf} from '@angular/common';
import {OrganizationService} from '../service/organization.service';
import {Error} from '../model/error.model';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  myOrganizations: Array<Organization> = [];
  newOrg = {name: '', description: ''};
  newInvite = {organizationId: '', receiverUsername: ''};
  selectedInvitationId = '';

  constructor(
    private organizationService: OrganizationService,
  ) {
  }

  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe({
      next: (res) => this.myOrganizations = res,
      error: (err: Error) => this.handleError(err)
    })
  }

  ngOnInit(): void {
    this.loadOrganizations()
  }

  private handleError(response: any) {
    console.log(response || 'Unknown error occurred');
    alert(response.error.message)
  }

  onCreateOrganization() {
    this.organizationService.createOrganization(this.newOrg).subscribe({
      next: (res) => {
        this.loadOrganizations();
        this.newOrg = {name: '', description: ''};
      },
      error: (err) => console.error('Error creating organization:', err)
    });
  }

  onAddInvite() {
    this.organizationService.addInvite(this.newInvite).subscribe({
      next: (response) => {
        this.newInvite = {organizationId: '', receiverUsername: ''};
        alert(response)
      },
      error: (err: Error) => {
        alert(err.error.message)
        console.error('Error sending invite:', err);
      }
    });
  }

  onAcceptInvitation() {
    this.organizationService.acceptInvitation(this.selectedInvitationId).subscribe({
      next: (response) => {
        this.selectedInvitationId = '';
        alert(response)
      },
      error: (err: Error) => {
        alert(err.error)
        console.error('Error accepting invitation:', err);
      }
    });
  }

  onRejectInvitation() {
    this.organizationService.rejectInvitation(this.selectedInvitationId).subscribe({
      next: (response) => {
        alert(response)
        this.selectedInvitationId = '';
      },
      error: (err: Error) => {
        alert(err.error)
        console.error('Error rejecting invitation:', err);
      }
    });
  }

}
