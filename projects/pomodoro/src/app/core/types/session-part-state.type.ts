import { SessionPart } from './session-part.type';
import { SessionPartModeState } from './session-part-mode-state.type';

export interface SessionPartState extends SessionPart {
  isActive: boolean;
  mode: SessionPartModeState;
  passedTime: number;
}
