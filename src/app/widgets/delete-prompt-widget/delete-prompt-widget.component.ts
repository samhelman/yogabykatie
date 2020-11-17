import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-prompt-widget',
  templateUrl: './delete-prompt-widget.component.html',
  styleUrls: ['./delete-prompt-widget.component.css']
})
export class DeletePromptWidgetComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() deleteClassEvent = new EventEmitter<boolean>();

  public deleteUid: string;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit(true)
  }

  deleteClass() {
    this.deleteClassEvent.emit(true);
  }

}
