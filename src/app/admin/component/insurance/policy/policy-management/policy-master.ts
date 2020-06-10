import { Currency } from '../../master/currency/currency';
import { Agent } from '../../master/agent/agent';

export class PolicyMaster {
    constructor(
        public id                   : String,
        public bmi                  : String,
        public inforce_date         : String,
        public issued_date          : String,
        public policy_number        : String,
        public policy_status_date   : String,
        public submission_date      : String,
        public total_premi          : String,
        public update_by            : String,
        public agent_id             : Agent,
        public currency_id          : Currency,
        public createdAt            : String
    ) {}
}