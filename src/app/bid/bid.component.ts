import {Component, OnInit} from '@angular/core';
import {Bid} from '../model/bid.model';
import {BidService} from '../service/bid.service';
import {Error} from '../model/error.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-bid',
  imports: [
    NgForOf
  ],
  standalone: true,
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css'
})
export class BidComponent implements OnInit {

  bids: Bid[] = [];

  constructor(
    private bidService: BidService,
  ) {
  }

  ngOnInit(): void {
    this.bidService.getBids().subscribe({
        next: (res) => this.bids = res,
        error: (err: Error) => this.handleError(err)
      }
    )
  }

  private handleError(response: any) {
    console.log(response || 'Unknown error occurred');
    alert(response.error.message)
  }

}
