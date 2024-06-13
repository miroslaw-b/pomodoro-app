import { computed, Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalStateService<TState> {
  protected readonly state = signal<TState>({} as TState);

  select<TKey extends keyof TState>(key: TKey): Signal<TState[TKey]> {
    return computed(() => this.state()[key]);
  }

  set<TKey extends keyof TState>(key: TKey, data: TState[TKey]): void {
    this.state.update((currentState: TState) => ({
      ...currentState,
      [key]: data,
    }));
  }

  update<TKey extends keyof TState>(
    key: TKey,
    fn: (currentState: TState[TKey]) => TState[TKey],
  ): void {
    this.state.update((state) => ({
      ...state,
      [key]: fn(state[key]),
    }));
  }

  setState(state: TState): void {
    this.state.set(state);
  }
}
