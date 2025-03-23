import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Department, DepartmentService} from '../../../../../core/services/department.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  // Full list loaded from the backend
  allDepartments: Department[] = [];
  // Filtered list based on the search query
  filteredDepartments: Department[] = [];
  // Data for current page to display in the table
  pagedDepartments: Department[] = [];

  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';

  // Variables for the add modal
  departmentName: string = '';

  // Variables for the edit modal
  editDepartmentId: string = '';
  editDepartmentName: string = '';

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadAllDepartments();
  }

  // Loads all departments by requesting a very high page size.
  loadAllDepartments(): void {
    this.departmentService.getDepartments(0, 1000).subscribe({
      next: (data) => {
        this.allDepartments = data.content;
        // Apply search filter (if any) and paginate.
        this.filterDepartments();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // Filter the full list based on the search query.
  filterDepartments(): void {
    if (this.searchQuery.trim()) {
      this.filteredDepartments = this.allDepartments.filter(dept =>
        dept.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredDepartments = [...this.allDepartments];
    }
    // Reset to first page on new search.
    this.currentPage = 0;
    this.paginateDepartments();
  }

  // Slice the filtered list to show only the departments for the current page.
  paginateDepartments(): void {
    this.totalPages = Math.ceil(this.filteredDepartments.length / this.pageSize);
    this.pagedDepartments = this.filteredDepartments.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }

  // Called when the search form is submitted.
  searchDepartments(): void {
    this.filterDepartments();
  }

  addDepartment(): void {
    if (!this.departmentName.trim()) {
      Swal.fire('Error', 'Department name is required', 'error');
      return;
    }
    const newDepartment: Department = {
      name: this.departmentName.trim()
    };
    this.departmentService.createDepartment(newDepartment).subscribe({
      next: () => {
        Swal.fire('Success', 'Department added successfully', 'success');
        this.departmentName = '';
        // Reload all departments to update the list.
        this.loadAllDepartments();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  openEditModal(dept: Department): void {
    this.editDepartmentId = dept.id ? dept.id : '';
    this.editDepartmentName = dept.name;
  }

  updateDepartment(): void {
    if (!this.editDepartmentName.trim()) {
      Swal.fire('Error', 'Department name is required', 'error');
      return;
    }
    const updatedDepartment: Department = {
      name: this.editDepartmentName.trim()
    };
    this.departmentService.updateDepartment(this.editDepartmentId, updatedDepartment).subscribe({
      next: () => {
        Swal.fire('Success', 'Department updated successfully', 'success');
        this.loadAllDepartments();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  confirmDelete(dept: Department): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the department "${dept.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed && dept.id) {
        this.deleteDepartment(dept.id);
      }
    });
  }

  deleteDepartment(id: string): void {
    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'Department has been deleted.', 'success');
        this.loadAllDepartments();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // Pagination controls: update the current page and re-paginate.
  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.paginateDepartments();
  }

  protected name = name;
}
