import { Component, computed, input } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'pom-part',
  standalone: true,
  imports: [MatProgressBar, MatTooltip],
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss',
})
export class PartComponent {
  kind = input.required<string>();
  passedTime = input.required<number>();
  totalTime = input.required<number>();
  isActive = input.required<boolean>();
  label = input.required<string>();
  progress = computed(() => (this.passedTime() / this.totalTime()) * 100);
}
