import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardTopbarComponent } from '../../shared/dashboard-topbar/dashboard-topbar.component';
import { DashboardSidebarComponent } from '../../shared/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardFooterComponent } from '../../shared/dashboard-footer/dashboard-footer.component';
import { PreloaderComponent } from '../../../front-office/shared/preloader/preloader.component';

@Component({
  standalone: true,
  selector: 'dashboard-layout',
  imports: [
    RouterOutlet,
    DashboardTopbarComponent,
    DashboardSidebarComponent,
    DashboardFooterComponent,
    PreloaderComponent
  ],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Load CSS assets specific to the dashboard pages
    const styleUrls: string[] = [
      'assets/css/app.min.css',
      'assets/css/icons.min.css'
    ];

    styleUrls.forEach(url => {
      const linkEl = this.renderer.createElement('link');
      this.renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this.renderer.setAttribute(linkEl, 'href', url);
      // If this is app.min.css, set an id so that app.min.js can reference it if needed
      if (url.indexOf('app.min.css') !== -1) {
        this.renderer.setAttribute(linkEl, 'id', 'app-style');
      }
      this.renderer.appendChild(this.document.head, linkEl);
    });

    // Array of JS assets specific to the dashboard pages
    const scriptUrls: string[] = [
      'assets/js/config.js',
      'assets/js/vendor.min.js',
      'assets/js/app.min.js'
    ];

    // Load scripts sequentially to ensure proper order
    this.loadScriptsSequentially(scriptUrls);
  }

  private loadScriptsSequentially(urls: string[], index: number = 0): void {
    if (index >= urls.length) {
      // All scripts have loaded; hide the preloader.
      this.isLoading = false;
      return;
    }
    const scriptEl = this.renderer.createElement('script');
    this.renderer.setAttribute(scriptEl, 'src', urls[index]);
    scriptEl.onload = () => {
      // Proceed to load the next script after the current one has finished loading
      this.loadScriptsSequentially(urls, index + 1);
    };
    scriptEl.onerror = () => {
      console.error('Error loading script: ' + urls[index]);
      // Even if an error occurs, continue with loading the next script
      this.loadScriptsSequentially(urls, index + 1);
    };
    this.renderer.appendChild(this.document.body, scriptEl);
  }
}
