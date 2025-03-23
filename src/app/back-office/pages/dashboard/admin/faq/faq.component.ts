import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import {Faq, FaqService, Page} from '../../../../../core/services/faq.service';
import {Category, CategoryService} from '../../../../../core/services/category.service';
import {AuthService} from '../../../../../core/services/auth.service';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  // FAQ data
  allFaqs: Faq[] = [];
  filteredFaqs: Faq[] = [];
  pagedFaqs: Faq[] = [];

  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';

  // Modal variables for adding FAQ
  addQuestion: string = '';
  addAnswer: string = '';
  addCategoryId: string = '';

  // Modal variables for editing FAQ
  editFaqId: string = '';
  editQuestion: string = '';
  editAnswer: string = '';
  editCategoryId: string = '';
  editCreatedById: string = '';

  // List of categories for drop down
  categories: Category[] = [];

  constructor(
    private faqService: FaqService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFaqs();
    this.loadCategories();
  }

  loadFaqs(): void {
    this.faqService.getFaqs(0, 1000).subscribe({
      next: (data: Page<Faq>) => {
        this.allFaqs = data.content;
        this.filterFaqs();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (cats: Category[]) => {
        this.categories = cats;
      },
      error: (error) => {
        Swal.fire('Error', 'Error loading categories', 'error');
      }
    });
  }

  filterFaqs(): void {
    if (this.searchQuery.trim()) {
      this.filteredFaqs = this.allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredFaqs = [...this.allFaqs];
    }
    this.currentPage = 0;
    this.paginateFaqs();
  }

  paginateFaqs(): void {
    this.totalPages = Math.ceil(this.filteredFaqs.length / this.pageSize);
    this.pagedFaqs = this.filteredFaqs.slice(
      this.currentPage * this.pageSize,
      (this.currentPage + 1) * this.pageSize
    );
  }

  searchFaqs(): void {
    this.filterFaqs();
  }

  addFaq(): void {
    if (!this.addQuestion.trim() || !this.addAnswer.trim() || !this.addCategoryId.trim()) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }
    const userId = this.authService.getUserId();
    if (!userId) {
      Swal.fire('Error', 'User not authenticated', 'error');
      return;
    }
    const newFaq: Faq = {
      question: this.addQuestion.trim(),
      answer: this.addAnswer.trim(),
      createdById: userId,
      categoryId: this.addCategoryId.trim()
    };
    this.faqService.createFaq(newFaq).subscribe({
      next: () => {
        Swal.fire('Success', 'FAQ added successfully', 'success');
        // Clear modal fields
        this.addQuestion = '';
        this.addAnswer = '';
        this.addCategoryId = '';
        this.loadFaqs();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  openEditModal(faq: Faq): void {
    this.editFaqId = faq.id ? faq.id : '';
    this.editQuestion = faq.question;
    this.editAnswer = faq.answer;
    this.editCategoryId = faq.categoryId;
    this.editCreatedById = faq.createdById;
  }

  updateFaq(): void {
    if (!this.editQuestion.trim() || !this.editAnswer.trim() || !this.editCategoryId.trim()) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }
    const updatedFaq: Faq = {
      question: this.editQuestion.trim(),
      answer: this.editAnswer.trim(),
      createdById: this.editCreatedById, // preserve original createdById
      categoryId: this.editCategoryId.trim()
    };
    this.faqService.updateFaq(this.editFaqId, updatedFaq).subscribe({
      next: () => {
        Swal.fire('Success', 'FAQ updated successfully', 'success');
        this.loadFaqs();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  confirmDelete(faq: Faq): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete this FAQ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed && faq.id) {
        this.deleteFaq(faq.id);
      }
    });
  }

  deleteFaq(id: string): void {
    this.faqService.deleteFaq(id).subscribe({
      next: () => {
        Swal.fire('Deleted!', 'FAQ has been deleted.', 'success');
        this.loadFaqs();
      },
      error: (error) => {
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  // Helper method to get category name by ID
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  }

  // Pagination control
  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.paginateFaqs();
  }
}
