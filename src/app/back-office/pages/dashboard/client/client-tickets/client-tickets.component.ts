import { Component, OnInit } from '@angular/core';
import { Ticket, TicketsService, TicketPage } from '../../../../../core/services/tickets.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-tickets',
  templateUrl: './client-tickets.component.html',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule
  ],
  styleUrls: ['./client-tickets.component.css']
})
export class ClientTicketsComponent implements OnInit {
  // All tickets fetched from backend
  allTickets: Ticket[] = [];
  // Tickets filtered by the search query
  filteredTickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;

  // Pagination properties (client-side pagination)
  currentPage: number = 0;
  pageSize: number = 10;
  totalTickets: number = 0;
  totalPages: number = 0;

  // Authenticated user id
  userId: string | null = '';
  // Search query bound to the search input
  searchQuery: string = '';

  // Fields for adding a new ticket
  newTicketTitle: string = '';
  newTicketDescription: string = '';
  newTicketPriority: string = 'HIGH'; // default value

  // Priority options for the dropdown
  priorityOptions: string[] = ['HIGH', 'MEDIUM', 'LOW'];

  // Fields for updating an existing ticket (client cannot update status)
  updateTicketId: string = '';
  updateTicketTitle: string = '';
  updateTicketDescription: string = '';
  updateTicketPriority: string = 'HIGH';
  // We'll keep the current ticket status (unchanged) for update
  updateTicketStatus: string = '';

  constructor(private ticketsService: TicketsService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the authenticated user's id from AuthService
    this.userId = this.authService.getUserId();
    this.fetchUserTickets();
  }

  // Fetch all tickets for the user (using a large page size for front-end filtering)
  fetchUserTickets(): void {
    this.ticketsService.getUserTickets(this.userId, 0, 1000).subscribe({
      next: (data: TicketPage) => {
        this.allTickets = data.content;
        this.applySearch();
      },
      error: (err) => {
        console.error('Error fetching user tickets:', err);
        Swal.fire('Error', 'Failed to load tickets', 'error');
      }
    });
  }

  // Filter the tickets based on the search query (front-end filtering)
  applySearch(): void {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.filteredTickets = this.allTickets.filter(ticket =>
        ticket.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTickets = [...this.allTickets];
    }
    this.totalTickets = this.filteredTickets.length;
    this.totalPages = Math.ceil(this.totalTickets / this.pageSize);
    this.currentPage = 0;
  }

  // Called when the search form is submitted
  searchTickets(): void {
    this.applySearch();
  }

  // Get the paginated tickets from the filtered array
  get paginatedTickets(): Ticket[] {
    const start = this.currentPage * this.pageSize;
    return this.filteredTickets.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
    }
  }

  openTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  // Open the update modal and pre-populate fields (client update: all fields except status)
  openUpdateModal(ticket: Ticket): void {
    // Set update fields from the selected ticket
    this.updateTicketId = ticket.id;
    this.updateTicketTitle = ticket.title;
    this.updateTicketDescription = ticket.description;
    this.updateTicketPriority = ticket.priority;
    // Keep the existing status (client cannot change it)
    this.updateTicketStatus = ticket.status;

    // Open the update modal (Bootstrap 5)
    const modal = document.getElementById('updateTicketModal');
    if (modal) {
      // @ts-ignore
      window['bootstrap'].Modal.getOrCreateInstance(modal).show();
    }
  }

  // Save updated ticket (client update: status remains unchanged)
  saveUpdatedTicket(): void {
    const updatedData = {
      title: this.updateTicketTitle,
      description: this.updateTicketDescription,
      // Preserve the existing status
      status: this.updateTicketStatus,
      priority: this.updateTicketPriority,
      createdBy: this.userId
    };

    const ticketToUpdate = { ...this.selectedTicket, ...updatedData, id: this.updateTicketId };
    this.ticketsService.updateTicket(ticketToUpdate).subscribe({
      next: (updatedTicket) => {
        Swal.fire('Success', 'Ticket updated successfully', 'success');
        // Refresh ticket list
        this.fetchUserTickets();
        // Close the update modal
        const modal = document.getElementById('updateTicketModal');
        if (modal) {
          // @ts-ignore
          window['bootstrap'].Modal.getOrCreateInstance(modal).hide();
        }
      },
      error: (err) => {
        console.error('Error updating ticket:', err);
        Swal.fire('Error', 'Failed to update ticket', 'error');
      }
    });
  }

  // Allow update/delete only if ticket status is OPEN.
  canUpdateOrDelete(ticket: Ticket): boolean {
    return ticket.status === 'OPEN';
  }

  updateTicket(ticket: Ticket): void {
    // For client update, open the update modal
    this.openUpdateModal(ticket);
  }

  deleteTicket(ticket: Ticket): void {
    console.log('Delete ticket', ticket);
    // Implement delete functionality (e.g., call ticketsService.deleteTicket(ticket.id))
  }
}
