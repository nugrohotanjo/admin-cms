import { Customer } from '../../customer/customer-management/customer';
import { PolicyMaster } from './policy-master';
import { Relationship } from '../../master/relationship/relationship';

export class PolicyBeneficiary {
    constructor(
        public id                       : String,
        public beneficiary_percentage   : String,
        public customer_id              : Customer,
        public policy_id                : PolicyMaster,
        public relation_policy_holder   : Relationship
    ) {}
}