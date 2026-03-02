import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchAmbulanceComponent } from './dispatch-ambulance.component';

describe('DispatchAmbulanceComponent', () => {
  let component: DispatchAmbulanceComponent;
  let fixture: ComponentFixture<DispatchAmbulanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchAmbulanceComponent]
    });
    fixture = TestBed.createComponent(DispatchAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
