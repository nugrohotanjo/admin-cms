import { ProductManagementCategory } from '../../product/product-management/product-category/productManagementCategory';

export class PolicyProduct {
    constructor(
        public id                   : String,
        public extra_premium        : String,
        public original_premium     : String,
        public payment_frequency    : String,
        public product_type         : String,
        public total_premium        : String,
        public value_promo          : String,
        public policy_id            : String,
        public product_id           : ProductManagementCategory,
        public promo_id             : String,
        public sum_assured          : String,
        public promo_sales_id       : String
    ) {}
}