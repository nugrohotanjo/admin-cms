import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHomepageOurProductComponent } from './cms-homepage-our-product.component';

describe('CmsHomepageOurProductComponent', () => {
  let component: CmsHomepageOurProductComponent;
  let fixture: ComponentFixture<CmsHomepageOurProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsHomepageOurProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsHomepageOurProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
