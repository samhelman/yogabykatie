import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromptWidgetComponent } from './delete-prompt-widget.component';

describe('DeletePromptWidgetComponent', () => {
  let component: DeletePromptWidgetComponent;
  let fixture: ComponentFixture<DeletePromptWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePromptWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePromptWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
