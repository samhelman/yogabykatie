import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassWidgetComponent } from './admin-class-widget.component';

describe('AdminClassWidgetComponent', () => {
  let component: AdminClassWidgetComponent;
  let fixture: ComponentFixture<AdminClassWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminClassWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
