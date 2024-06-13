import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import {
  MatListItem,
  MatListItemIcon,
  MatNavList,
} from '@angular/material/list';

@Component({
  selector: 'pom-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContent,
    MatSidenavContainer,
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    MatIcon,
    MatAnchor,
    MatIconAnchor,
    MatSidenav,
    MatListItem,
    MatNavList,
    MatListItemIcon,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
