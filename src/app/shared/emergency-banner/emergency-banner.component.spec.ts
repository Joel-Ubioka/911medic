import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyBannerComponent } from './emergency-banner.component';

describe('EmergencyBannerComponent', () => {
  let component: EmergencyBannerComponent;
  let fixture: ComponentFixture<EmergencyBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyBannerComponent]
    });
    fixture = TestBed.createComponent(EmergencyBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
