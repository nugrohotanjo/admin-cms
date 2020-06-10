import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsClaimComponent } from './cms-claim.component';

describe('CmsClaimComponent', () => {
  let component: CmsClaimComponent;
  let fixture: ComponentFixture<CmsClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
