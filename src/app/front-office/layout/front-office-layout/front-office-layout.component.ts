import { Component, OnInit, Renderer2, Inject, NgZone } from '@angular/core';
import { DOCUMENT, NgIf } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PreloaderComponent } from '../../shared/preloader/preloader.component';
import { filter } from 'rxjs';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'front-office-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, PreloaderComponent, NgIf],
  templateUrl: './front-office-layout.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Set initial state for entering route
        query(':enter', style({ opacity: 0 }), { optional: true }),
        group([
          // Fade out the leaving view
          query(':leave', [
            animate('300ms ease-out', style({ opacity: 0 }))
          ], { optional: true }),
          // Fade in the entering view
          query(':enter', [
            animate('300ms ease-out', style({ opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class FrontOfficeLayoutComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private ngZone: NgZone
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
          setTimeout(() => {
            this.isLoading = false;
          }, 400); // Delay for a smoother transition
        }
      });
    });

    // Hide the preloader after window load as fallback
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    });

    // Fallback timeout
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // This method is used by the router outlet to trigger animations
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
