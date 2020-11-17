import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessagesWidgetComponent } from './flash-messages-widget.component';

describe('FlashMessagesWidgetComponent', () => {
  let component: FlashMessagesWidgetComponent;
  let fixture: ComponentFixture<FlashMessagesWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashMessagesWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashMessagesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
