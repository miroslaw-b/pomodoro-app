import { SessionPartKind } from './session-part-kind.type';

export interface SessionPart {
  uid: string;
  order: number;
  label: string;
  kind: SessionPartKind;
  totalTime: number;
}
