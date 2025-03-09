import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'dashboard-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Array of CSS assets specific to the auth pages
    const styleUrls: string[] = [
      'assets/js/config.js',
      'assets/css/app.min.css',
      'assets/css/icons.min.css'  // Custom styles for auth pages
    ];

    styleUrls.forEach(url => {
      const linkEl = this.renderer.createElement('link');
      this.renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this.renderer.setAttribute(linkEl, 'href', url);
      this.renderer.appendChild(this.document.head, linkEl);
    });

    // Array of JS assets specific to the auth pages
    const scriptUrls: string[] = [
      'assets/js/app.min.js'  // Custom JS for auth pages
    ];

    scriptUrls.forEach(url => {
      const scriptEl = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptEl, 'src', url);
      // Optionally set async or defer attributes here
      this.renderer.appendChild(this.document.body, scriptEl);
    });
  }
}
