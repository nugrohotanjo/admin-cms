import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAboutComponent } from './cms-about.component';

describe('CmsAboutComponent', () => {
  let component: CmsAboutComponent;
  let fixture: ComponentFixture<CmsAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
