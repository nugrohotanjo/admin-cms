import {ProductCategory} from "../../product/product-category/product-category";

export class MasterFormula {
    constructor(
            public id               : Number,
            public age_basis        : String,
            public formula          : String,
            public category_id      : ProductCategory,
            public value            : String
    )
    {}
}