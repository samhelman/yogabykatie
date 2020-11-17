import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountPromptWidgetComponent } from './delete-account-prompt-widget.component';

describe('DeleteAccountPromptComponent', () => {
  let component: DeleteAccountPromptWidgetComponent;
  let fixture: ComponentFixture<DeleteAccountPromptWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccountPromptWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountPromptWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
