import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBenefitComponent } from './cms-benefit.component';

describe('CmsBenefitComponent', () => {
  let component: CmsBenefitComponent;
  let fixture: ComponentFixture<CmsBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
