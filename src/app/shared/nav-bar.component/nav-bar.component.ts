import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'navbar ',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './nav-bar.component.css',
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  private translate = inject(TranslateService);

  selectedLanguage = 'es';

  languages = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  ngOnInit() {
    //this.translate.use(this.selectedLanguage);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLanguageChange(newLang: string) {
    this.translate.use(newLang);
  }
}
