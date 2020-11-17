import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-account-prompt-widget',
  templateUrl: './delete-account-prompt-widget.component.html',
  styleUrls: ['./delete-account-prompt-widget.component.css']
})
export class DeleteAccountPromptWidgetComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<boolean>();
  @Output() deleteUserEvent = new EventEmitter<boolean>();

  public deleteUid: string;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeEvent.emit(true)
  }

  deleteUser() {
    this.deleteUserEvent.emit(true);
  }

}
