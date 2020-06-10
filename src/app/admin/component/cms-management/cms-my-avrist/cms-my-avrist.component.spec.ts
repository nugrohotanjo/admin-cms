import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsMyAvristComponent } from './cms-my-avrist.component';

describe('CmsMyAvristComponent', () => {
  let component: CmsMyAvristComponent;
  let fixture: ComponentFixture<CmsMyAvristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsMyAvristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsMyAvristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
