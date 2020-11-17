import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWidgetComponent } from './register-widget.component';

describe('RegisterWidgetComponent', () => {
  let component: RegisterWidgetComponent;
  let fixture: ComponentFixture<RegisterWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
