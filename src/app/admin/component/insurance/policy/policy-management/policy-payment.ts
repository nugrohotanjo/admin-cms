import { CustomerBankAccount } from '../../integration/integration-policy-master/customer-bank-account';

export class PolicyPayment {
    constructor(
        public id                       : String,
        public amount                   : String,
        public bill_date                : String,
        public payment_group_type       : String,
        public payment_status           : String,
        public payment_type             : String,
        public currency_id              : String,
        public customer_bank_account_id : CustomerBankAccount,
        public policy_id                : String,
    ) {}
}