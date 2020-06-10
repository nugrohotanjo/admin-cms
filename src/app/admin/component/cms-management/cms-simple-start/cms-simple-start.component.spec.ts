import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSimpleStartComponent } from './cms-simple-start.component';

describe('CmsSimpleStartComponent', () => {
  let component: CmsSimpleStartComponent;
  let fixture: ComponentFixture<CmsSimpleStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsSimpleStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSimpleStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
