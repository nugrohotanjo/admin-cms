import { Customer } from '../../customer/customer-management/customer';
import { PolicyMaster } from './policy-master';

export class PolicyHolder {
    constructor(
        public id               : String,
        public customer_id      : Customer,
        public policy_id        : PolicyMaster
    ) 
    {}
}