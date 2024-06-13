import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { SettingsStateService } from '../../../core/state/settings-state.service';
import { extendSessionPart } from '../utils/extend-session-part';
import { SessionPartModeState } from '../../../core/types/session-part-mode-state.type';
import { SignalStateService } from '../../../core/state/signal-state.service';
import { SessionState } from '../../../core/types/session-state.type';

@Injectable({
  providedIn: 'root',
})
export class SessionStateService extends SignalStateService<SessionState> {
  private readonly settingsService = inject(SettingsStateService);
  private sessionSettings = this.settingsService.select('session');
  private parts = this.select('parts');

  currentPart = computed(() => this.parts().find((part) => part.isActive));

  initial(): void {
    const settings = this.sessionSettings();
    this.set(
      'parts',
      settings.parts.map(extendSessionPart).sort((a, b) => a.order - b.order),
    );
  }

  open(partUID: string): void {
    this.update('parts', (parts) =>
      parts.map((part) => ({
        ...part,
        isActive: part.uid === partUID,
      })),
    );
  }

  next(): void {
    const currentPart = this.currentPart();
    const parts = this.parts();
    if (currentPart === undefined) return;

    const nextSessionOrder = currentPart.order + 1;
    const nextPart = parts.find(({ order }) => order === nextSessionOrder);

    if (nextPart) {
      this.open(nextPart.uid);
    }
  }

  start(): void {
    this.update('parts', (parts) =>
      parts.map((part) => ({
        ...part,
        mode: part.isActive ? SessionPartModeState.Play : part.mode,
      })),
    );
  }

  pause(): void {
    this.update('parts', (parts) =>
      parts.map((part) => ({
        ...part,
        mode: part.isActive ? SessionPartModeState.Pause : part.mode,
      })),
    );
  }

  stop(): void {
    this.update('parts', (parts) =>
      parts.map((part) => ({
        ...part,
        mode: part.isActive ? SessionPartModeState.Idle : part.mode,
        passedTime: 0,
      })),
    );
  }

  tick(): void {
    const currentPart = this.currentPart();
    const incrementValue = 1000;

    if (currentPart === undefined) return;

    const { passedTime, totalTime } = currentPart;
    if (passedTime + incrementValue >= totalTime) {
      this.next();
      return;
    }

    const { mode } = currentPart;
    if (mode !== 'play') return;

    this.update('parts', (parts) =>
      parts.map((part) =>
        part.uid === currentPart.uid
          ? {
              ...part,
              passedTime: part.passedTime + incrementValue,
            }
          : part,
      ),
    );
  }
}
