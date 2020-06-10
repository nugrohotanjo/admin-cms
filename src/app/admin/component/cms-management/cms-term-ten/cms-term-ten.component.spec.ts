import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTermTenComponent } from './cms-term-ten.component';

describe('CmsTermTenComponent', () => {
  let component: CmsTermTenComponent;
  let fixture: ComponentFixture<CmsTermTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsTermTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsTermTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
