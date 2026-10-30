import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-home-button',
  imports: [],
  templateUrl: './nav-home-button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nav-home-button.component.css',
})
export class NavHomeButtonComponent {
  private router = inject(Router);
  back() {
    this.router.navigate(['/']);
  }
}
