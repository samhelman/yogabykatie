import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClassWidgetComponent } from './public-class-widget.component';

describe('PublicClassWidgetComponent', () => {
  let component: PublicClassWidgetComponent;
  let fixture: ComponentFixture<PublicClassWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicClassWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicClassWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
