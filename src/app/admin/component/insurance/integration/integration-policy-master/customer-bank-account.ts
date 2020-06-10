import { Customer } from '../../customer/customer-management/customer';
import { Currency } from '../../master/currency/currency';

export class CustomerBankAccount {
    constructor(
        public id                       : String,
        public bank_name                : String,
        public created_at               : String,
        public customer_core_code_id    : String,
        public expired_token_id         : String,
        public full_name                : String,
        public masked_card              : String,
        public payment_type             : String,
        public token_id                 : String,
        public update_by                : String,
        public currency_id              : Currency,
        public customer_id              : Customer,
        public issued_card              : String,
        public card_type                : String
    ) {}
}