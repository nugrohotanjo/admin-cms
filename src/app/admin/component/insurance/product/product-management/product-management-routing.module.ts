import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ProductManagementComponent }       from './product-management.component'
import { ProductCategoryComponent }         from './product-category/product-category.component'
import { ProductRateComponent }             from './product-rate/product-rate.component'
import { ProductParameterizationComponent } from './product-parameterization/product-parameterization.component'
import { ProductSummaryComponent }          from './product-summary/product-summary.component';
import { ProductBenefitComponent }          from './product-benefit/product-benefit.component'
import { ProductRiderComponent }            from './product-rider/product-rider.component'
import { ProductModalFactorComponent }      from './product-modal-factor/product-modal-factor.component'
import { ProductPromoComponent }            from './product-promo/product-promo.component'
import { ProductBrochureComponent }         from './product-brochure/product-brochure.component'
import { ProductExclusionComponent }        from './product-exclusion/product-exclusion.component'

const routes: Routes = [
    { path: '',             component: ProductManagementComponent},
    { path: 'add',    children : [
            {
                path : 'category',
                component: ProductCategoryComponent
            },
            {
                path : 'category/:type/:category/:product_id',
                component: ProductCategoryComponent
            },
            {
                path : 'rate/:type/:category/:product_id',
                component: ProductRateComponent
            },
            {
                path : 'modalfactor/:type/:category/:product_id',
                component: ProductModalFactorComponent
            },
            {
                path : 'promo/:type/:category/:product_id',
                component: ProductPromoComponent
            },
            {
                path : 'benefit/:type/:category/:product_id',
                component: ProductBenefitComponent
            },
            {
                path : 'rider/:type/:category/:product_id',
                component: ProductRiderComponent
            },
            {
                path : 'parameterize/:type/:category/:product_id',
                component: ProductParameterizationComponent
            },
            {
                path : 'brochure/:type/:category/:product_id',
                component: ProductBrochureComponent
            },
            {
                path : 'exclusion/:type/:category/:product_id',
                component : ProductExclusionComponent
                // loadChildren: "./product-exclusion/product-exclusion.module#ProductExclusionModule"
            },
            {
                path : 'summary/:type/:category/:product_id',
                component: ProductSummaryComponent
            }
        ]      
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ProductManagementRoutingModule { }