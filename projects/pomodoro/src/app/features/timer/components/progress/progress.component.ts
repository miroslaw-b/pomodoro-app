import { Component, input, output } from '@angular/core';
import { PartComponent } from '../part/part.component';
import { SessionPartState } from '../../../../core/types/session-part-state.type';

@Component({
  selector: 'pom-progress',
  standalone: true,
  imports: [PartComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  parts = input.required<SessionPartState[]>();
  size = input(300);
  changeStep = output<string>();

  calculatePercentage(stepId: string): number {
    const totalScheduledTime = this.parts().reduce(
      (total, step) => total + step.totalTime,
      0,
    );

    const step = this.parts().find((step) => step.uid === stepId)!;

    return (step.totalTime / totalScheduledTime) * 100;
  }

  handleClickStep(stepId: string): void {
    this.changeStep.emit(stepId);
  }
}
