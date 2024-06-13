import { Component, computed, input } from '@angular/core';
import { toTimer } from '../../utils/to-timer';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { toTime } from '../../utils/to-time';

@Component({
  selector: 'pom-timer',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  size = input(300);
  scheduledTime = input(0);
  passedTime = input(0);
  kind = input('');
  timeLeft = computed(() => toTimer(this.scheduledTime() - this.passedTime()));

  progress = computed(
    () => (this.passedTime() / this.scheduledTime()) * 100 || 100,
  );

  endsAt = computed(() => {
    const timeLeft = this.scheduledTime() - this.passedTime();
    const endsAt = new Date().getTime() + timeLeft;

    return toTime(endsAt);
  });
}
