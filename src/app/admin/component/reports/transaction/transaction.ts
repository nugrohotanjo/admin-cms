export class Transaction {
    constructor(
        public id                   : String,
        public policy_number        : String,
        public bmi                  : String,
        public total_premi          : String,
        public policy_status        : String,
        public agent_id             : String,
        public currency_id          : String,
        public policy_status_date   : String,
        public inforce_date         : String,
        public issued_date          : String,
        public submission_date      : String
    ) {

    }
}