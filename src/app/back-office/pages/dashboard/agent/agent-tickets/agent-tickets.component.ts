import { Component, OnInit } from '@angular/core';
import { Ticket, TicketsService, TicketPage } from '../../../../../core/services/tickets.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agent-tickets',
  templateUrl: './agent-tickets.component.html',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule
  ],
  styleUrls: ['./agent-tickets.component.css']
})
export class AgentTicketsComponent implements OnInit {
  // All tickets assigned to the agent
  allTickets: Ticket[] = [];
  // Tickets filtered by search query
  filteredTickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;

  // Pagination properties (client-side)
  currentPage: number = 0;
  pageSize: number = 10;
  totalTickets: number = 0;
  totalPages: number = 0;

  // Authenticated agent id
  userId: string | null = '';
  // Search query for filtering tickets
  searchQuery: string = '';

  // Fields for updating a ticket (agent can update only status)
  updateTicketId: string = '';
  updateTicketStatus: string = '';

  // Allowed status options for agent update
  statusOptions: string[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

  constructor(private ticketsService: TicketsService, private authService: AuthService) {}

  ngOnInit(): void {
    // Get agent id from AuthService
    this.userId = this.authService.getUserId();
    this.fetchAgentTickets();
  }

  // Fetch all tickets for the agent (using a large page size for filtering)
  fetchAgentTickets(): void {
    this.ticketsService.getAgentTickets(this.userId!, 0, 1000).subscribe({
      next: (data: TicketPage) => {
        this.allTickets = data.content;
        this.applySearch();
      },
      error: (err) => {
        console.error('Error fetching agent tickets:', err);
        Swal.fire('Error', 'Failed to load tickets', 'error');
      }
    });
  }

  // Filter tickets based on the search query (front-end filtering)
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

  // Get paginated tickets from filteredTickets array
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

  // Open the update modal and pre-populate with current ticket status
  openUpdateModal(ticket: Ticket): void {
    this.updateTicketId = ticket.id;
    this.updateTicketStatus = ticket.status;
    const modal = document.getElementById('updateTicketModal');
    if (modal) {
      // @ts-ignore
      window['bootstrap'].Modal.getOrCreateInstance(modal).show();
    }
  }

  // Save updated ticket (agent updates only the status)
  saveUpdatedTicket(): void {
    const updatedTicketData = {
      title: this.selectedTicket ? this.selectedTicket.title : '',
      description: this.selectedTicket ? this.selectedTicket.description : '',
      status: this.updateTicketStatus,
      priority: this.selectedTicket ? this.selectedTicket.priority : '',
      createdBy: this.selectedTicket ? this.selectedTicket.createdByName : this.userId,
      id: this.updateTicketId
    };

    this.ticketsService.updateTicket(updatedTicketData).subscribe({
      next: (updatedTicket) => {
        Swal.fire('Success', 'Ticket status updated successfully', 'success');
        this.fetchAgentTickets();
        const modal = document.getElementById('updateTicketModal');
        if (modal) {
          // @ts-ignore
          window['bootstrap'].Modal.getOrCreateInstance(modal).hide();
        }
      },
      error: (err) => {
        console.error('Error updating ticket status:', err);
        Swal.fire('Error', 'Failed to update ticket status', 'error');
      }
    });
  }

  // For agent, update button opens update modal (only status editable)
  updateTicket(ticket: Ticket): void {
    this.openUpdateModal(ticket);
  }
}
