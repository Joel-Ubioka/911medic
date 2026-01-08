import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceRequestComponent } from './ambulance-request.component';

describe('AmbulanceRequestComponent', () => {
  let component: AmbulanceRequestComponent;
  let fixture: ComponentFixture<AmbulanceRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceRequestComponent]
    });
    fixture = TestBed.createComponent(AmbulanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
