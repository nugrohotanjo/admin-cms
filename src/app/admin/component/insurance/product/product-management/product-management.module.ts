import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ProductManagementRoutingModule }       from "./product-management-routing.module";

// Component
import { ProductManagementComponent }           from "./product-management.component";
import { ProductCategoryComponent }             from './product-category/product-category.component';
import { ProductRateComponent }                 from './product-rate/product-rate.component';
import { ProductParameterizationComponent }     from './product-parameterization/product-parameterization.component';
import { ProductSummaryComponent }              from './product-summary/product-summary.component';
import { ProductBenefitComponent }              from './product-benefit/product-benefit.component';
import { ProductRiderComponent }                from './product-rider/product-rider.component';
import { ProductModalFactorComponent }          from './product-modal-factor/product-modal-factor.component';
import { ProductPromoComponent }                from './product-promo/product-promo.component';
import { ProductBrochureComponent }             from './product-brochure/product-brochure.component';
import { ProductExclusionComponent } from './product-exclusion/product-exclusion.component'
// Library
import { MultiSelectModule }                    from 'primeng/multiselect';
import { NgxEditorModule }                      from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MultiSelectModule,
    NgxEditorModule
  ],
  declarations: [
    ProductManagementComponent,
    ProductCategoryComponent,
    ProductRateComponent,
    ProductParameterizationComponent,
    ProductSummaryComponent,
    ProductBenefitComponent,
    ProductRiderComponent,
    ProductModalFactorComponent,
    ProductPromoComponent,
    ProductBrochureComponent,
    ProductExclusionComponent
  ]
})

export class ProductManagementModule {}