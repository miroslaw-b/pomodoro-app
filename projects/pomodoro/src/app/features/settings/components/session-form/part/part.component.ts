import { Component, input, output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { SessionPartKind } from '../../../../../core/types/session-part-kind.type';
import { UIPartForm } from './part.type';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'pom-part',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss',
})
export class PartComponent {
  readonly SessionPartKind = SessionPartKind;
  delete = output<void>();

  control = input.required<UIPartForm>();

  get orderControl(): FormControl<number> {
    return this.control().controls.order;
  }

  get labelControl(): FormControl<string> {
    return this.control().controls.label;
  }

  get durationControl(): FormControl<number> {
    return this.control().controls.totalTime;
  }

  get kindControl(): FormControl<string> {
    return this.control().controls.kind;
  }

  handleDeletePart(): void {
    this.delete.emit();
  }
}
