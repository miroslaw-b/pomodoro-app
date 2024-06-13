import { Session } from './types/session.type';
import { randomUID } from './utils/random-uid.utils';
import { SessionPartKind } from './types/session-part-kind.type';

export const INITIAL_SESSION_CONF: Session = {
  uid: randomUID(),
  parts: [
    {
      uid: randomUID(),
      order: 0,
      label: 'Focus',
      kind: SessionPartKind.Pomodoro,
      totalTime: 25 * 60 * 1000,
    },
    {
      uid: randomUID(),
      order: 1,
      label: 'Rest',
      kind: SessionPartKind.Rest,
      totalTime: 5 * 60 * 1000,
    },
  ],
};
