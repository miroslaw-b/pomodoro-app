import { SessionPart } from './session-part.type';

export interface Session {
  uid: string;
  parts: SessionPart[];
}
