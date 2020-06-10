import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Joboccupation2Component } from './joboccupation2.component';

describe('Joboccupation2Component', () => {
  let component: Joboccupation2Component;
  let fixture: ComponentFixture<Joboccupation2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Joboccupation2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Joboccupation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
