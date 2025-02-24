import {Component, OnInit} from '@angular/core';
import {RoleRequest} from '../model/role.request.model';
import {RoleRequestService} from '../service/role.request.service';
import {Error} from '../model/error.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-role.request',
  imports: [
    NgForOf
  ],
  standalone: true,
  templateUrl: './role.request.component.html',
  styleUrl: './role.request.component.css'
})
export class RoleRequestComponent implements OnInit {

  roleRequests: RoleRequest[] = [];

  constructor(
    private roleRequestService: RoleRequestService,
  ) {
  }

  ngOnInit(): void {
    this.roleRequestService.getRoleRequests().subscribe({
        next: (res) => this.roleRequests = res,
        error: (err: Error) => this.handleError(err)
      }
    )
  }

  private handleError(response: any) {
    console.log(response || 'Unknown error occurred');
    alert(response.error.message)
  }

}
