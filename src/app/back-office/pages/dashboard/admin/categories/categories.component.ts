import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {Category, CategoryService} from '../../../../../core/services/category.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  // Full list loaded from backend
  allCategories: Category[] = [];
  // Filtered list after applying search
  filteredCategories: Category[] = [];
  // List for the current page (for pagination)
  pagedCategories: Category[] = [];

  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';

  // Variables for Add Category modal
  addName: string = '';
  addDescription: string = '';

  // Variables for Edit Category modal
  editCategoryId: string = '';
  editName: string = '';
  editDescription: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.allCategories = data;
        this.filterCategories();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  filterCategories(): void {
    if (this.searchQuery.trim()) {
      this.filteredCategories = this.allCategories.filter(cat =>
        cat.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCategories = [...this.allCategories];
    }
    this.currentPage = 0;
    this.paginateCategories();
  }

  paginateCategories(): void {
    this.totalPages = Math.ceil(this.filteredCategories.length / this.pageSize);
    this.pagedCategories = this.filteredCategories.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }

  searchCategories(): void {
    this.filterCategories();
  }

  addCategory(): void {
    if (!this.addName.trim()) {
      Swal.fire('Error', 'Category name is required', 'error');
      return;
    }
    const newCategory: Category = {
      name: this.addName.trim(),
      description: this.addDescription.trim()
    };
    this.categoryService.createCategory(newCategory).subscribe({
      next: () => {
        Swal.fire('Success', 'Category added successfully', 'success');
        this.addName = '';
        this.addDescription = '';
        this.loadCategories();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  openEditModal(category: Category): void {
    this.editCategoryId = category.id ? category.id : '';
    this.editName = category.name;
    this.editDescription = category.description;
  }

  updateCategory(): void {
    if (!this.editName.trim()) {
      Swal.fire('Error', 'Category name is required', 'error');
      return;
    }
    const updatedCategory: Category = {
      name: this.editName.trim(),
      description: this.editDescription.trim()
    };
    this.categoryService.updateCategory(this.editCategoryId, updatedCategory).subscribe({
      next: () => {
        Swal.fire('Success', 'Category updated successfully', 'success');
        this.loadCategories();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  confirmDelete(category: Category): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the category "${category.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed && category.id) {
        this.deleteCategory(category.id);
      }
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        this.loadCategories();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // Pagination control
  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.paginateCategories();
  }
}
