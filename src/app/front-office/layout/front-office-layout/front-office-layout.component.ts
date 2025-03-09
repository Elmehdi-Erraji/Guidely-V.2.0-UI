import { Component, OnInit, Renderer2, Inject, NgZone } from '@angular/core';
import { DOCUMENT, NgIf } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PreloaderComponent } from '../../shared/preloader/preloader.component';
import {filter} from 'rxjs';

@Component({
  standalone: true,
  selector: 'front-office-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, PreloaderComponent],
  templateUrl: './front-office-layout.component.html'
})
export class FrontOfficeLayoutComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private ngZone: NgZone // Inject NgZone here, no need to import it in the decorator.
  ) {}

  ngOnInit(): void {
    // Load front office CSS assets
    this.isLoading = true;


    const styleUrls: string[] = [
      'assets_guest/css/bootstrap.min.css',
      'assets_guest/css/font-awesome.min.css',
      'assets_guest/css/themify-icons.css',
      'assets_guest/css/elegant-icons.css',
      'assets_guest/css/flaticon-set.css',
      'assets_guest/css/magnific-popup.css',
      'assets_guest/css/owl.carousel.min.css',
      'assets_guest/css/owl.theme.default.min.css',
      'assets_guest/css/animate.css',
      'assets_guest/css/validnavs.css',
      'assets_guest/css/helper.css',
      'assets_guest/css/shop.css',
      'assets_guest/css/style.css',
      'assets_guest/css/responsive.css'
    ];

    styleUrls.forEach(url => {
      const linkEl = this.renderer.createElement('link');
      this.renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this.renderer.setAttribute(linkEl, 'href', url);
      this.renderer.appendChild(this.document.head, linkEl);
    });

    // Load front office JS assets
    const scriptUrls: string[] = [
      'assets_guest/js/jquery-3.6.0.min.js',
      'assets_guest/js/popper.min.js',
      'assets_guest/js/bootstrap.bundle.min.js',
      'assets_guest/js/jquery.appear.js',
      'assets_guest/js/jquery.easing.min.js',
      'assets_guest/js/jquery.magnific-popup.min.js',
      'assets_guest/js/modernizr.custom.13711.js',
      'assets_guest/js/owl.carousel.min.js',
      'assets_guest/js/wow.min.js',
      'assets_guest/js/progress-bar.min.js',
      'assets_guest/js/isotope.pkgd.min.js',
      'assets_guest/js/imagesloaded.pkgd.min.js',
      'assets_guest/js/count-to.js',
      'assets_guest/js/YTPlayer.min.js',
      'assets_guest/js/validnavs.js',
      'assets_guest/js/main.js'
    ];

    scriptUrls.forEach(url => {
      const scriptEl = this.renderer.createElement('script');
      this.renderer.setAttribute(scriptEl, 'src', url);
      // Optionally, set async or defer if needed:
      // this.renderer.setAttribute(scriptEl, 'async', 'true');
      this.renderer.appendChild(this.document.body, scriptEl);
    });

    // Listen for router events to manage the preloader state
    this.router.events.pipe(
      filter(event =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    ).subscribe(event => {
      this.ngZone.run(() => {
        if (event instanceof NavigationStart) {
          console.log('NavigationStart detected');
          this.isLoading = true;
        } else {
          console.log('Navigation finished or canceled');
          // Add a slight delay to make the preloader visible for at least a short time
          setTimeout(() => {
            this.isLoading = false;
          }, 300); // 300ms delay for better visual effect
        }
      });
    });
    // Add an initial timeout to hide the preloader after assets are loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    });

    // Fallback timeout in case the load event doesn't fire
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);


  }
}
