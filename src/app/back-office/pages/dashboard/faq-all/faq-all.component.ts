import { Component, OnInit } from '@angular/core';
import { Faq, FaqService, Page } from '../../../../core/services/faq.service';
import { Category, CategoryService } from '../../../../core/services/category.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-faq-all',
  templateUrl: './faq-all.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./faq-all.component.css']
})
export class FaqAllComponent implements OnInit {
  // Full list of FAQs loaded from the backend
  allFaqs: Faq[] = [];
  // List of FAQs filtered by search query and category
  filteredFaqs: Faq[] = [];

  // Filter controls
  searchQuery: string = '';
  selectedCategory: string = 'null'; // "null" means no category filter

  // List of categories loaded from the backend
  categories: Category[] = [];

  constructor(
    private faqService: FaqService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadFaqs();
    this.loadCategories();
  }

  loadFaqs(): void {
    // Adjust page and size as needed
    this.faqService.getFaqs(0, 1000).subscribe({
      next: (data: Page<Faq>) => {
        this.allFaqs = data.content;
        // Initially display all FAQs
        this.filteredFaqs = [...this.allFaqs];
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
        Swal.fire('Error', error.message, 'error');
      }
    });
  }

  applyFilters(): void {
    this.filteredFaqs = this.allFaqs.filter(faq => {
      const matchesQuery = this.searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'null' ||
        faq.categoryId === this.selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'null';
    this.filteredFaqs = [...this.allFaqs];
  }
}
