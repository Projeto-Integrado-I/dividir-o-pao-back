import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Feedback } from 'src/app/services/feedback.interface';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  public isSuccess = false;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Feedback) { }

  ngOnInit(): void {
    this.isSuccess = this.data.severity === 'success';
  }

}
