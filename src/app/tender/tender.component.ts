import {Component, OnInit} from '@angular/core';
import {Tender, TenderRollback, TenderStatus, TenderStatusUpdate} from '../model/tender.model';
import {TenderService} from '../service/tender.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RUSSIAN_REGIONS} from '../model/russion-region.model';
import {OrganizationService} from '../service/organization.service';
import {Organization} from '../model/organization.model';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    NgbDropdownModule
  ],
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {
  organizations: Organization[] = [];
  tenders: Tender[] = [];
  selectedTender?: Tender;
  statusUpdate: TenderStatusUpdate = {tenderId: '', status: TenderStatus.CREATED};
  rollbackRequest: TenderRollback = {tenderId: '', version: 0};
  errorMessage = '';
  isLoading = false;
  isViewingMyTenders = true;
  isEditing = false;
  newTender: Partial<Tender> = {};


  loadTenders(): void {
    this.isLoading = true;
    const loader = this.isViewingMyTenders
      ? this.tenderService.getMyTenders()
      : this.tenderService.getPublicTenders();

    loader.subscribe({
      next: (data) => {
        this.tenders = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    });
  }

  // Новые методы
  toggleViewMode(): void {
    this.isViewingMyTenders = !this.isViewingMyTenders;
    this.loadTenders();
  }

  startCreate(): void {
    this.isEditing = true;
    this.newTender = {};
    this.selectedTender = undefined;
  }

  startEdit(tender: Tender): void {
    this.isEditing = true;
    this.newTender = {...tender};
  }

  saveTender(): void {
    if (!this.newTender.organizationId) {
      this.errorMessage = 'Please select an organization';
      return;
    }
    const operation = this.newTender.id
      ? this.tenderService.editTender(this.newTender as Tender)
      : this.tenderService.createTender(this.newTender);

    operation.subscribe({
      next: () => {
        this.loadTenders();
        this.isEditing = false;
        this.newTender = {};
      },
      error: (err) => this.errorMessage = err.error.message
    });
  }

  constructor(private tenderService: TenderService,
              private organizationService: OrganizationService
  ) {
  }

  ngOnInit(): void {
    this.loadOrganizations();
    this.loadTenders();
  }


  loadOrganizations(): void {
    this.organizationService.getOrganizations().subscribe({
      next: (orgs) => this.organizations = orgs,
      error: (err) => this.errorMessage = 'Failed to load organizations'
    });
  }

  onSelectTender(tender: Tender): void {
    this.selectedTender = tender;
    this.statusUpdate.tenderId = tender.id;
    this.rollbackRequest.tenderId = tender.id;
  }

  updateStatus(id: string, status: TenderStatus): void {
    this.tenderService.updateTenderStatus({tenderId: id, status: status}).subscribe({
      next: () => {
        this.loadTenders();
        this.errorMessage = '';
      },
      error: (err) => this.errorMessage = err.error.message
    });
  }

  rollbackVersion(): void {
    if (!this.rollbackRequest.tenderId || this.rollbackRequest.version < 1) return;

    this.tenderService.rollbackTender(this.rollbackRequest).subscribe({
      next: () => {
        this.loadTenders();
        this.errorMessage = '';
      },
      error: (err) => this.errorMessage = err.error.message
    });
  }

  getStatusClass(status: TenderStatus): string {
    return {
      'CREATED': 'bg-primary',
      'PUBLISHED': 'bg-success',
      'CLOSED': 'bg-secondary',
      'CANCELED': 'bg-danger'
    }[status];
  }

  protected readonly RUSSIAN_REGIONS = RUSSIAN_REGIONS;
  readonly statuses: TenderStatus[] = [
    TenderStatus.CREATED,
    TenderStatus.PUBLISHED,
    TenderStatus.CLOSED,
    TenderStatus.CANCELED
  ];
}
