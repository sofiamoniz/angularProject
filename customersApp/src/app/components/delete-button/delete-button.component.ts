import { ChangeDetectionStrategy, Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-delete-button',
  styleUrl: 'delete-button.component.scss',
  templateUrl: 'delete-button.component.html',
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DeleteButtonComponent {
  @Output() delete = new EventEmitter<void>();
  
  readonly dialog = inject(MatDialog);

  openDialog(
    event: MouseEvent,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    event.stopPropagation(); // prevents the event from propagating to the parent
    this.dialog.open(DialogContent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { onDelete: () => this.delete.emit() },
    });
  }
}

@Component({
  selector: 'dialog-content',
  template: `
    <h2 mat-dialog-title>Delete user</h2>
    <mat-dialog-content>
      Would you like to delete the user? This action cannot be undone.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button (click)="handleDelete()" cdkFocusInitial>Delete</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContent {
  constructor(
    private dialogRef: MatDialogRef<DialogContent>,
    @Inject(MAT_DIALOG_DATA) public data: { onDelete: () => void }
  ) {}
  handleDelete() {
    if (this.data?.onDelete) {
      this.data.onDelete(); 
    }
    this.dialogRef.close();
  }
}
