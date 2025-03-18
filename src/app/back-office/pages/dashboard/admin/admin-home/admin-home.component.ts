import { Component, AfterViewInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements AfterViewInit {

  constructor() {
    // Register all necessary chart components
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initializeTicketsStatusChart();
    this.initializeTicketsByDayChart();
    this.initializeTicketsByCategoryChart();
    this.initializeNotifications();
  }

  private initializeTicketsStatusChart(): void {
    const ticketStatuses = {
      "Open": 25,
      "In Progress": 40,
      "Closed": 30,
      "Cancelled": 5
    };

    const xValues = Object.keys(ticketStatuses);
    const yValues = Object.values(ticketStatuses);
    const barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145",
      "#ff5733"
    ];

    new Chart('myChart', {
      type: 'pie',
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        plugins: {
          title: {
            display: true
          },
          legend: {
            position: 'left',
            labels: {
              boxWidth: 15,
              padding: 15,
              usePointStyle: true
            }
          }
        }
      }
    });
  }

  private initializeTicketsByDayChart(): void {
    const dateLabels = ["2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", "2025-03-05", "2025-03-06", "2025-03-07"];
    const ticketCounts = [5, 8, 3, 7, 4, 9, 6];

    const canvas = document.getElementById('ticketsByDayChart') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: dateLabels,
            datasets: [{
              label: 'Tickets',
              data: ticketCounts,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              fill: false
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              title: {
                display: true,
                text: 'Tickets Created by Day'
              }
            }
          }
        });
      }
    }
  }

  private initializeTicketsByCategoryChart(): void {
    const categories = ["Technical", "Billing", "General", "Account", "Service", "Other"];
    const categoryTickets = [15, 25, 10, 18, 12, 5];

    const canvas = document.getElementById('ticketsByCategoryChart') as HTMLCanvasElement;
    if (canvas) {
      const ctxCategory = canvas.getContext('2d');
      if (ctxCategory) {
        new Chart(ctxCategory, {
          type: 'doughnut',
          data: {
            labels: categories,
            datasets: [{
              label: '',
              data: categoryTickets,
              backgroundColor: [
                '#3bc0c3',
                '#4489e4',
                '#d03f3f',
                '#716cb0',
                '#1e7145',
                '#ff5733'
              ],
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right'
              },
              title: {
                display: true,
                text: ''
              }
            }
          }
        });
      }
    }
  }

  private initializeNotifications(): void {
    // Update the notification count element
    const notificationCountEl = document.getElementById('notificationCount');
    if (notificationCountEl) {
      notificationCountEl.textContent = "3";
    }

    // Add sample notifications
    const notificationList = document.getElementById('notificationList');
    if (notificationList) {
      const sampleNotifications = [
        { message: "New client registration: John Doe", time: "5 minutes ago" },
        { message: "New ticket created #1234", time: "1 hour ago" },
        { message: "System maintenance scheduled", time: "1 day ago" }
      ];

      sampleNotifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.classList.add('dropdown-item', 'notify-item');
        notificationItem.innerHTML = `
          <a href="#" class="notification-link">
            <div class="notify-icon bg-warning-subtle">
              <i class="mdi mdi-account-plus text-warning"></i>
            </div>
            <div class="notify-details">
              ${notification.message}
              <small class="text-dark noti-time">${notification.time}</small>
            </div>
          </a>
        `;
        notificationList.appendChild(notificationItem);
      });

      // Clear notifications when button is clicked
      const clearBtn = document.getElementById('clearAllNotifications');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          notificationList.innerHTML = '';
          if (notificationCountEl) {
            notificationCountEl.textContent = '0';
          }
        });
      }
    }
  }
}
