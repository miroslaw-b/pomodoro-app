import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { SessionStateService } from '../../state/session-state.service';
import { TimerComponent } from '../../components/timer/timer.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { ProgressComponent } from '../../components/progress/progress.component';

@Component({
  selector: 'pom-timer-page',
  standalone: true,
  imports: [TimerComponent, NavigationComponent, ProgressComponent],
  templateUrl: './timer-page.component.html',
  styleUrl: './timer-page.component.scss',
  providers: [SessionStateService],
})
export class TimerPageComponent implements OnInit {
  sessionService = inject(SessionStateService);
  currentPartSession = computed(() => this.sessionService.currentPart());
  sessionParts = this.sessionService.select('parts');
  partPassedTime = computed(() => this.currentPartSession()?.passedTime || 0);
  partKind = computed(() => this.currentPartSession()?.kind || '');
  partTotalTime = computed(() => this.currentPartSession()?.totalTime || 0);

  size = 300;

  private interval: number | undefined;

  ngOnInit() {
    this.sessionService.initial();
  }

  startTimer(): void {
    this.stopTimer();
    this.interval = setInterval(() => {
      this.tickTimer();
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.interval);
  }

  tickTimer(): void {
    this.sessionService.tick();
  }

  handleActionNavigation(action: 'start' | 'pause' | 'stop') {
    if (action === 'start') {
      this.sessionService.start();
      this.startTimer();
    } else if (action === 'pause') {
      this.sessionService.pause();
      this.stopTimer();
    } else if (action === 'stop') {
      this.sessionService.stop();
      this.stopTimer();
    }
  }

  handleChangeStep(partUID: string): void {
    this.stopTimer();
    this.sessionService.open(partUID);
  }
}
