import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent {
  @Input() isLoading: boolean = false;
}
