import { ModalFactor } from '../../../master/modal-factor-management/modal-factor'
import { ProductManagementCategory } from '../product-category/productManagementCategory'

export class ProductModalFactor {
    constructor(public id                   : String,
                public payment_term_status  : String,
                public value                : String,
                public modal_factor         : ModalFactor,
                public product              : ProductManagementCategory) {}
}