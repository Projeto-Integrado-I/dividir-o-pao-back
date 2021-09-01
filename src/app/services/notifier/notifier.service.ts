import { Feedback } from './../feedback.interface';
import { NotifierComponent } from './../../shared/notifier/notifier.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(feedback: Omit<Feedback, 'allOk'>): void {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: feedback,
      duration: 4000,
      panelClass: feedback.severity,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
