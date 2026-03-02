import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistApplicationsComponent } from './specialist-applications.component';

describe('SpecialistApplicationsComponent', () => {
  let component: SpecialistApplicationsComponent;
  let fixture: ComponentFixture<SpecialistApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialistApplicationsComponent]
    });
    fixture = TestBed.createComponent(SpecialistApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
