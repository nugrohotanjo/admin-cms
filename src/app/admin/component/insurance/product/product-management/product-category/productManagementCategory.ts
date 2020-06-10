import { Currency } from '../../../master/currency/currency';
import { ProductCategory } from '../../product-category/product-category';
import { PaymentMethodSetup } from '../../../master/payment-method-management/payment-method-setup';

export class ProductManagementCategory{
    constructor(
        public id                               : String,
        public product_name                     : String,
        public parameter_type                   : String,
        public data                             : String,
        public name				                : String,
        public description				        : String,	
        public general_description				: String,	
        public product_core_code			    : String,
        public product_core_id			        : String,
        public multiple_beneficiary		        : String,
        public multiple_life_assured		    : String,
        public multiple_life_assured_value      : String,
        public paymentBusiness			        : PaymentMethodSetup,
        public paymentRenewal			        : PaymentMethodSetup,
        public slug                             : String,
        public product_status			        : String,
        public start_date			            : String,
        public end_date			                : String,
        public product_type				        : String,
        public currency_product				    : Currency,
        public category_product			        : ProductCategory,
        public product_status_delete            : 0,
        public coverage_period                  : String,
        public renewal_age                      : String,
        public premium_payment_period           : String,
        public beneficiaryValue                 : String,
        public rider_icon                       : String
    )
    {}
}