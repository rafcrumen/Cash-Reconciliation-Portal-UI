import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'nav-home-button',
  imports: [TranslatePipe, MatButtonModule],
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
