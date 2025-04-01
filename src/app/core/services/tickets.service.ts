import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdByName: string;   // now holds the creator’s id
  assignedToName: string;  // now holds the agent’s id
  createdAt: string;
}

// Interface representing the paginated response
export interface TicketPage {
  content: Ticket[];
  totalElements: number;
  totalPages: number;
  number: number; // current page index (0-based)
}

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://localhost:4040/api/tickets';

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  // Get tickets for a user with pagination
  getUserTickets(userId: string | null, page: number, size: number): Observable<TicketPage> {
    return this.http.get<TicketPage>(`${this.apiUrl}/my?userId=${userId}&page=${page}&size=${size}`);
  }

  // Get tickets for an agent with pagination
  getAgentTickets(userId: string, page: number, size: number): Observable<TicketPage> {
    return this.http.get<TicketPage>(`${this.apiUrl}/assigned?userId=${userId}&page=${page}&size=${size}`);
  }

  // Create a new ticket
  createTicket(ticketData: any): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticketData);
  }

  // Update an existing ticket
  updateTicket(ticket: {
    title: string;
    description: string;
    status: string;
    priority: string;
    createdBy: string | null;
    id: string
  }): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${ticket.id}`, ticket);
  }

  // Delete a ticket by its ID
  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${ticketId}`);
  }
}
