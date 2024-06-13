import { Component, input, output } from '@angular/core';
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SessionPartState } from '../../../../core/types/session-part-state.type';

@Component({
  selector: 'pom-navigation',
  standalone: true,
  imports: [MatButton, MatIcon, MatIconButton, MatMiniFabButton],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  mode = input.required<SessionPartState['mode']>();
  action = output<'start' | 'pause' | 'stop'>();
}
