import { Component, computed, inject } from '@angular/core';
import { SessionFormComponent } from '../../components/session-form/session-form.component';
import { SettingsStateService } from '../../../../core/state/settings-state.service';
import { Session } from '../../../../core/types/session.type';

@Component({
  selector: 'pom-session-page',
  standalone: true,
  imports: [SessionFormComponent],
  templateUrl: './session-page.component.html',
  styleUrl: './session-page.component.scss',
})
export class SessionPageComponent {
  private readonly settingsState = inject(SettingsStateService);

  session = computed(() => {
    const sessionSettings = this.settingsState.select('session');
    const session = sessionSettings();
    const parts = session.parts
      .sort((a, b) => a.order - b.order)
      .map((part) => ({
        ...part,
        totalTime: part.totalTime / 60 / 1000,
      }));

    return { ...session, parts: parts };
  });

  handleSaveSession(session: Omit<Session, 'uid'>): void {
    const parts = session.parts.map((part) => ({
      ...part,
      totalTime: part.totalTime * 60 * 1000,
    }));

    this.settingsState.set('session', {
      ...session,
      parts,
      uid: this.session().uid,
    });
  }
}
