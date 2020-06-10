import { JobClass } from '../job-class/job-class';
import { ProductManagementCategory } from '../../product/product-management/product-category/productManagementCategory';

export class JobClassMapping {
    constructor(
        public id                   : String,
        public product_id           : ProductManagementCategory,
        public job_id               : JobClass,
        public job_class_mapping    : String
    ) {}
}