import { Component, OnInit } from '@angular/core';
import {Ticket, TicketsService} from '../../../../../core/services/tickets.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  imports: [
    NgClass,
    NgIf,
    DatePipe,
    NgForOf
  ],
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null; // Ticket selected for viewing

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5; // adjust as needed
  totalTickets: number = 0;
  totalPages: number = 0;

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.ticketsService.getAllTickets().subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data;
        this.totalTickets = data.length;
        this.totalPages = Math.ceil(this.totalTickets / this.pageSize);
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
      }
    });
  }

  // Calculate tickets to display for current page
  get paginatedTickets(): Ticket[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.tickets.slice(start, start + this.pageSize);
  }

  // Change the current page
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Set the selected ticket to view its details in the modal
  openTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }
}
