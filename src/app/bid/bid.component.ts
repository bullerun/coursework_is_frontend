import {Component, OnInit} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BidService} from '../service/bid.service';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Bid} from '../model/bid.model';
import {RUSSIAN_REGIONS} from '../model/russion-region.model';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu
  ],
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  bids: Bid[] = [];
  selectedBid: any;
  newBid: Partial<Bid> = {};
  editBidData: Partial<Bid> = {};
  errorMessage = '';
  isLoading = false;

  statusUpdate = {bidId: '', status: ''};
  rollbackRequest = {bidId: '', version: 0};

  constructor(
    private bidService: BidService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.loadBids();
  }

  loadBids(): void {
    this.isLoading = true;

    this.bidService.getUserBids().subscribe({
      next: (data) => {
        console.log(data)
        this.bids = data;
        this.isLoading = false;
      },
      error: (err) => this.handleError(err)
    });

  }

  onCreateBid(): void {
    this.bidService.createBid(this.newBid).subscribe({
      next: () => {
        this.loadBids();
        this.modalService.dismissAll();
      },
      error: (err) => this.handleError(err)
    });
  }

  onUpdateBid(): void {
    this.bidService.updateBid(this.selectedBid.id, this.editBidData as Bid).subscribe({
      next: () => {
        alert("success")
        this.loadBids();
        this.modalService.dismissAll();
      },
      error: (err) => this.handleError(err)
    });
  }

  updateStatus(): void {
    this.bidService.updateBidStatus(this.statusUpdate.bidId, this.statusUpdate.status)
      .subscribe({
        next: () => this.loadBids(),
        error: (err) => this.handleError(err)
      });
  }

  rollbackVersion(): void {
    this.bidService.rollbackBid(this.rollbackRequest.bidId, this.rollbackRequest.version)
      .subscribe({
        next: () => this.loadBids(),
        error: (err) => this.handleError(err)
      });
  }

  private handleError(err: any): void {
    this.errorMessage = err.error?.message || 'An error occurred';
    this.isLoading = false;
  }

  openModal(content: any, bid?: Bid): void {
    if (bid) {
      this.selectedBid = bid;
      this.editBidData = {...bid};
    }
    this.modalService.open(content, {size: 'lg'});
  }

  getStatusClass(status: string): string {
    return {
      'CREATED': 'bg-primary',
      'PUBLISHED': 'bg-info',
      'APPROVED': 'bg-success',
      'CLOSED': 'bg-secondary'
    }[status] || 'bg-light';
  }

  protected readonly RUSSIAN_REGIONS = RUSSIAN_REGIONS;
}
