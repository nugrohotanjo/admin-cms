import { Campaign } from '../../../../campaign-management/campaign'
import { ProductManagementCategory } from '../product-category/productManagementCategory'

export class ProductPromo {
    constructor(
        public id           : String,
        public product      : ProductManagementCategory,
        public promo        : Campaign
    ) {}
}