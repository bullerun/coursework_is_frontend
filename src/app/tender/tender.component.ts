import {Component, OnInit} from '@angular/core';
import {Tender} from '../model/tender.model';
import {TenderService} from '../service/tender.service';
import {Error} from '../model/error.model';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tender',
  imports: [
    NgForOf
  ],
  templateUrl: './tender.component.html',
  styleUrl: './tender.component.css'
})
export class TenderComponent implements OnInit {
  tenders: Tender[] = []

  constructor(
    private tenderService: TenderService,
  ) {
  }

  ngOnInit(): void {
    this.tenderService.getTenders().subscribe({
        next: (res) => this.tenders = res,
        error: (err: Error) => this.handleError(err)
      }
    )
  }

  private handleError(response: any) {
    console.log(response || 'Unknown error occurred');
    alert(response.error.message)
  }

}
