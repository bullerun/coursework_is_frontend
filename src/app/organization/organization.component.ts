import {Component, OnInit} from '@angular/core';
import {Organization} from '../model/organization.model';
import {NgForOf} from '@angular/common';
import {OrganizationService} from '../service/organization.service';
import {Error} from '../model/error.model';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  organizations: Organization[] = [];

  constructor(
    private organizationService: OrganizationService,
  ) {
  }

  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe({
        next: (res) => this.organizations = res,
        error: (err: Error) => this.handleError(err)
      }
    )
  }

  private handleError(response: any) {
    console.log(response || 'Unknown error occurred');
    alert(response.error.message)
  }
}
