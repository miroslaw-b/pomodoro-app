import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { Session } from '../../../../core/types/session.type';
import {
  FormArray,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { UIPartForm } from './part/part.type';
import { MatButton } from '@angular/material/button';
import { PartComponent } from './part/part.component';
import { SessionPart } from '../../../../core/types/session-part.type';
import { SessionPartKind } from '../../../../core/types/session-part-kind.type';
import { randomUID } from '../../../../core/utils/random-uid.utils';

@Component({
  selector: 'pom-session-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, PartComponent],
  templateUrl: './session-form.component.html',
  styleUrl: './session-form.component.scss',
})
export class SessionFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  value = input.required<Session>();
  save = output<Omit<Session, 'uid'>>();

  form = this.fb.group({
    parts: this.fb.array<UIPartForm>([]),
  });

  afterValueChange = effect(() => {
    this.form.patchValue(this.value());
  });

  get partsControl(): FormArray<UIPartForm> {
    return this.form.controls.parts;
  }

  ngOnInit() {
    this.value().parts.forEach((part) => {
      this.addPart(part);
    });
  }

  handleSubmitForm(): void {
    const formValue = this.form.getRawValue();

    this.save.emit(formValue);
  }

  handleDeletePart(index: number): void {
    this.partsControl.removeAt(index);
  }

  handleAddPart(): void {
    this.addPart();
  }

  private addPart(data?: SessionPart): void {
    const { uid, label, totalTime, kind, order } = data || {};

    this.partsControl.push(
      this.fb.group({
        uid: this.fb.control(uid || randomUID()),
        label: this.fb.control(label || ''),
        order: this.fb.control(order || this.partsControl.length),
        totalTime: this.fb.control(totalTime || 0),
        kind: this.fb.control(kind || SessionPartKind.Pomodoro),
      }),
    );
  }
}
