import { SessionPart } from '../../../core/types/session-part.type';
import { SessionPartState } from '../../../core/types/session-part-state.type';
import { SessionPartModeState } from '../../../core/types/session-part-mode-state.type';

export function extendSessionPart(session: SessionPart): SessionPartState {
  return {
    ...session,
    isActive: false,
    mode: SessionPartModeState.Idle,
    passedTime: 0,
  };
}
