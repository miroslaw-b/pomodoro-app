import { FormControl, FormGroup } from '@angular/forms';
import { SessionPartKind } from '../../../../../core/types/session-part-kind.type';

export type UIPartForm = FormGroup<{
  uid: FormControl<string>;
  label: FormControl<string>;
  order: FormControl<number>;
  totalTime: FormControl<number>;
  kind: FormControl<SessionPartKind>;
}>;
