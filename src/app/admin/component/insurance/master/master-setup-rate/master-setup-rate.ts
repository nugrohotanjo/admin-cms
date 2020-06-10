import { ProductCategory } from '../../product/product-category/product-category'

export class MasterSetupRate {
    constructor(
        public id               : String,
        public category_id      : ProductCategory,
        public parameter_name   : String,
        public parameter_type   : String,
        public value            : String
    )
    {}
}