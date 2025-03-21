import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

interface Log {
  id: number;
  description: string;
  event: string;
  causer_name: string;
  created_at: string;
  details: string;
}

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  // Sample data – in a real app, you’d fetch this from your backend
  logs: Log[] = [
    {
      id: 1,
      description: "User profile updated - Changed email address",
      event: "updated",
      causer_name: "John Admin",
      created_at: "2024-03-13T10:30:00",
      details: "Email changed from john@old.com to john@new.com"
    },
    {
      id: 2,
      description: "Category 'Hardware' deleted from system",
      event: "deleted",
      causer_name: "Sarah Manager",
      created_at: "2024-03-13T09:15:00",
      details: "Category contained 5 items before deletion"
    },
    {
      id: 3,
      description: "New user account created",
      event: "created",
      causer_name: "System",
      created_at: "2024-03-12T16:45:00",
      details: "User: jane.doe@example.com"
    },
    {
      id: 4,
      description: "Ticket #1234 status updated",
      event: "updated",
      causer_name: "Mike Support",
      created_at: "2024-03-12T15:30:00",
      details: "Status changed from 'Open' to 'In Progress'"
    },
    {
      id: 5,
      description: "Department 'Sales' modified",
      event: "updated",
      causer_name: "Linda HR",
      created_at: "2024-03-12T14:20:00",
      details: "Added new team leader position"
    },
    {
      id: 6,
      description: "System backup completed",
      event: "created",
      causer_name: "System",
      created_at: "2024-03-12T12:00:00",
      details: "Backup size: 2.5GB"
    },
    {
      id: 7,
      description: "Product catalog updated",
      event: "updated",
      causer_name: "Tom Marketing",
      created_at: "2024-03-12T11:45:00",
      details: "Added 15 new products"
    },
    {
      id: 8,
      description: "User permissions modified",
      event: "updated",
      causer_name: "John Admin",
      created_at: "2024-03-12T10:30:00",
      details: "Updated access levels for Sales team"
    },
    {
      id: 9,
      description: "Old customer records archived",
      event: "deleted",
      causer_name: "System",
      created_at: "2024-03-12T09:15:00",
      details: "Archived 500 inactive customer records"
    },
    {
      id: 10,
      description: "New department created",
      event: "created",
      causer_name: "Linda HR",
      created_at: "2024-03-12T08:00:00",
      details: "Created 'Digital Marketing' department"
    },
    // Page 2
    {
      id: 11,
      description: "Employee handbook updated",
      event: "updated",
      causer_name: "HR System",
      created_at: "2024-03-11T17:30:00",
      details: "Updated remote work policies"
    },
    {
      id: 12,
      description: "Customer feedback logged",
      event: "created",
      causer_name: "Support Bot",
      created_at: "2024-03-11T16:45:00",
      details: "New feedback for Product X"
    },
    {
      id: 13,
      description: "Security policy updated",
      event: "updated",
      causer_name: "Security Team",
      created_at: "2024-03-11T15:30:00",
      details: "Enhanced password requirements"
    },
    {
      id: 14,
      description: "Old project files removed",
      event: "deleted",
      causer_name: "Project Manager",
      created_at: "2024-03-11T14:15:00",
      details: "Cleaned up completed project files"
    },
    {
      id: 15,
      description: "New marketing campaign created",
      event: "created",
      causer_name: "Marketing Team",
      created_at: "2024-03-11T13:00:00",
      details: "Summer Sale Campaign 2024"
    },
    {
      id: 16,
      description: "System maintenance completed",
      event: "updated",
      causer_name: "System",
      created_at: "2024-03-11T12:00:00",
      details: "Updated system packages"
    },
    {
      id: 17,
      description: "User group modified",
      event: "updated",
      causer_name: "Admin System",
      created_at: "2024-03-11T11:30:00",
      details: "Added new members to Developers group"
    },
    {
      id: 18,
      description: "Report generated",
      event: "created",
      causer_name: "Reporting System",
      created_at: "2024-03-11T10:15:00",
      details: "Monthly sales report"
    },
    {
      id: 19,
      description: "Old notifications cleared",
      event: "deleted",
      causer_name: "System",
      created_at: "2024-03-11T09:00:00",
      details: "Removed notifications older than 30 days"
    },
    {
      id: 20,
      description: "New office location added",
      event: "created",
      causer_name: "Admin Team",
      created_at: "2024-03-11T08:45:00",
      details: "Added Sydney office location"
    },
    // Page 3
    {
      id: 21,
      description: "Website content updated",
      event: "updated",
      causer_name: "Content Team",
      created_at: "2024-03-10T17:30:00",
      details: "Updated homepage content"
    },
    {
      id: 22,
      description: "New supplier added",
      event: "created",
      causer_name: "Procurement",
      created_at: "2024-03-10T16:15:00",
      details: "Added supplier: Tech Solutions Inc"
    },
    {
      id: 23,
      description: "Old inventory records archived",
      event: "deleted",
      causer_name: "Inventory System",
      created_at: "2024-03-10T15:00:00",
      details: "Archived 2023 inventory records"
    },
    {
      id: 24,
      description: "Training module updated",
      event: "updated",
      causer_name: "Training Team",
      created_at: "2024-03-10T14:30:00",
      details: "Updated safety training materials"
    },
    {
      id: 25,
      description: "New policy document created",
      event: "created",
      causer_name: "Legal Team",
      created_at: "2024-03-10T13:15:00",
      details: "Created data privacy policy"
    },
    {
      id: 26,
      description: "Employee records updated",
      event: "updated",
      causer_name: "HR System",
      created_at: "2024-03-10T12:00:00",
      details: "Updated benefits information"
    },
    {
      id: 27,
      description: "System alert created",
      event: "created",
      causer_name: "Monitoring System",
      created_at: "2024-03-10T11:30:00",
      details: "New server performance alert"
    },
    {
      id: 28,
      description: "Customer survey launched",
      event: "created",
      causer_name: "Marketing Team",
      created_at: "2024-03-10T10:15:00",
      details: "Q1 Customer Satisfaction Survey"
    },
    {
      id: 29,
      description: "Old support tickets archived",
      event: "deleted",
      causer_name: "Support System",
      created_at: "2024-03-10T09:00:00",
      details: "Archived resolved tickets from 2023"
    },
    {
      id: 30,
      description: "Software license updated",
      event: "updated",
      causer_name: "IT Admin",
      created_at: "2024-03-10T08:45:00",
      details: "Renewed enterprise software licenses"
    }
  ];

  // Filtering and pagination
  filteredLogs: Log[] = [];
  currentLogs: Log[] = [];
  searchQuery: string = '';
  selectedEvent: string = 'null';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pages: number[] = [];

  // For showing details in modal
  selectedLog: Log | null = null;

  ngOnInit(): void {
    this.applyFilters();
  }

  onSearch(event: Event): void {
    event.preventDefault();
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters(): void {
    const query = this.searchQuery.trim().toLowerCase();
    const eventFilter = this.selectedEvent;
    this.filteredLogs = this.logs.filter(log => {
      const matchesSearch =
        log.description.toLowerCase().includes(query) ||
        log.causer_name.toLowerCase().includes(query);
      const matchesEvent =
        eventFilter === 'null' || log.event === eventFilter;
      return matchesSearch && matchesEvent;
    });
    this.calculatePagination();
  }

  resetFilters(): void {
    this.selectedEvent = 'null';
    this.currentPage = 1;
    this.applyFilters();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLogs.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentLogs = this.filteredLogs.slice(startIndex, endIndex);
  }

  getBadgeClass(event: string): string {
    switch (event) {
      case 'deleted':
        return 'bg-danger text-white';
      case 'updated':
        return 'bg-warning text-dark';
      case 'created':
        return 'bg-success text-white';
      default:
        return 'bg-secondary';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  viewDetails(log: Log): void {
    this.selectedLog = log;
    // Use Bootstrap's modal API to show the modal.
    const modalElement = document.getElementById('viewDetailsModal');
    if (modalElement) {
      // @ts-ignore
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteLog(log: Log): void {
    if (confirm("Are you sure you want to delete this log?")) {
      // In a real app, you would call an API to delete the log.
      this.logs = this.logs.filter(l => l.id !== log.id);
      this.applyFilters();
    }
  }
}
