export class TxtPayment {
    constructor(
        public currency                     : String,
        public policy_number                : String,
        public transaction_collection_date  : String,
        public amount                       : String
    ) {}
}