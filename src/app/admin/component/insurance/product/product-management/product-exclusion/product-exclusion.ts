import { ProductCategory } from '../../product-category/product-category';

export class Exclusion {
    constructor(
        public id               : String,
        public product_id       : ProductCategory,
        public text             : String
    ) {}
}