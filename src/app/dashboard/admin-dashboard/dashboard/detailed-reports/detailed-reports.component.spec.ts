import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReportsComponent } from './detailed-reports.component';

describe('DetailedReportsComponent', () => {
  let component: DetailedReportsComponent;
  let fixture: ComponentFixture<DetailedReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedReportsComponent]
    });
    fixture = TestBed.createComponent(DetailedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
