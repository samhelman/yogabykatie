import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoWidgetComponent } from './account-info-widget.component';

describe('AccountInfoWidgetComponent', () => {
  let component: AccountInfoWidgetComponent;
  let fixture: ComponentFixture<AccountInfoWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInfoWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
