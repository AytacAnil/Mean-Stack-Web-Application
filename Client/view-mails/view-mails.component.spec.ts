import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMailsComponent } from './view-mails.component';

describe('ViewMailsComponent', () => {
  let component: ViewMailsComponent;
  let fixture: ComponentFixture<ViewMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
