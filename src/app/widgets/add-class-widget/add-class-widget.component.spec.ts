import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClassWidgetComponent } from './add-class-widget.component';

describe('AddClassWidgetComponent', () => {
  let component: AddClassWidgetComponent;
  let fixture: ComponentFixture<AddClassWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClassWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
