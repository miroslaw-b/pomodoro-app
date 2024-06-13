import { effect, Injectable, signal } from '@angular/core';
import { Session } from '../types/session.type';
import { INITIAL_SESSION_CONF } from '../constants';
import { SignalStateService } from './signal-state.service';
import { Settings } from '../types/settings.type';

@Injectable({
  providedIn: 'root',
})
export class SettingsStateService extends SignalStateService<Settings> {
  private session = this.select('session');

  afterUpdateSession = effect(() => {
    localStorage.setItem('settings.session', JSON.stringify(this.session()));
  });

  constructor() {
    super();
    this.set('session', this.getSession());
  }

  private getSession(): Session {
    const session = localStorage.getItem('settings.session');

    return session ? JSON.parse(session) : INITIAL_SESSION_CONF;
  }
}
