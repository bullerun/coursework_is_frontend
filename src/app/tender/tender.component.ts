import {Component, OnInit} from '@angular/core';
import {Tender, TenderRollback, TenderStatus, TenderStatusUpdate} from '../model/tender.model';
import {TenderService} from '../service/tender.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RUSSIAN_REGIONS} from '../model/russion-region.model';
import {OrganizationService} from '../service/organization.service';
import {Organization} from '../model/organization.model';
import {NgbDropdownModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthorType, Bid} from '../model/bid.model';
import {BidService} from '../service/bid.service';
import {Feedback, FeedbackDecisionDTO, FeedbackStatus} from '../model/feedback.model';
import {FeedbackService} from '../service/feedback.service';


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
  newBid: Partial<Bid> = {};
  newFeedback: Partial<Feedback> = {};
  selectedTenderForBid?: Tender;
  tenderBids: Bid[] = [];
  isLoadingBids = false;
  feedbackStatus: FeedbackStatus[] = [
    FeedbackStatus.APPROVED,
    FeedbackStatus.PENDING,
    FeedbackStatus.CANCELED
  ]
  selectedBid: Partial<Bid> = {};

  getBidStatusClass(status: string): string {
    return {
      'CREATED': 'bg-primary',
      'PUBLISHED': 'bg-info',
      'APPROVED': 'bg-success',
      'CLOSED': 'bg-secondary'
    }[status] || 'bg-light';
  }

// Метод для открытия модального окна
  openBidsModal(tender: Tender, modalTemplate: any): void {
    this.selectedTender = tender;
    this.isLoadingBids = true;
    this.modalService.open(modalTemplate, {size: 'xl'});

    this.bidService.getBidsForTender(tender.id).subscribe({
      next: (bids) => {
        this.tenderBids = bids;
        this.isLoadingBids = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bids';
        this.isLoadingBids = false;
      }
    });
  }

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
              private organizationService: OrganizationService,
              private modalService: NgbModal,
              private bidService: BidService,
              private feedbackService: FeedbackService,
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

  getStatusLabel(status: TenderStatus): string {
    return {
      'CREATED': 'Created',
      'PUBLISHED': 'Published',
      'CLOSED': 'Closed',
      'CANCELED': 'Canceled'
    }[status];
  }

  getStatusIcon(status: TenderStatus): string {
    return {
      'CREATED': 'bi bi-circle text-primary',
      'PUBLISHED': 'bi bi-check-circle text-success',
      'CLOSED': 'bi bi-lock text-secondary',
      'CANCELED': 'bi bi-x-circle text-danger'
    }[status];
  }

  openBidModal(tender: Tender, content: any): void {
    this.selectedTenderForBid = tender;
    this.newBid = {
      tenderId: tender.id,
      authorType: AuthorType.EMPLOYEE,
    };
    this.modalService.open(content, {size: 'lg'});
  }

  openFeedbackModal(content: any, bid: Bid, tender?: Tender): void {
    this.selectedTender = tender;
    this.selectedBid = bid;
    this.modalService.open(content, {size: 'lg'});
  }

  submitBid(): void {
    if (this.newBid.authorType === 'ORGANIZATION' && !this.newBid.authorId) {
      alert('Please select an organization');
      return;
    }

    this.bidService.createBid(this.newBid as Bid).subscribe({
      next: () => {
        alert("success");
      },
      error: (err) => this.errorMessage = err.error.message
    });
  }

  submitFeedBack() {
    this.feedbackService.createFeedback({
      bidId: this.selectedBid.id || "",
      description: this.newFeedback.description || "",
      organizationId: this.selectedTender?.organizationId || ""
    }).subscribe()
  }

  approve(id: string) {
    this.feedbackService.submitDecision(id, FeedbackDecisionDTO.APPROVE).subscribe({
      next: () => alert("success"),
      error: (err) => console.error(err)
    });
  }

  reject(id: string) {
    this.feedbackService.submitDecision(id, FeedbackDecisionDTO.REJECT).subscribe({
      next: () => alert("success"),
      error: (err) => console.error(err)
    });
  }
}
