export class Campaign {
    constructor(
        public id            : Number,
        public promo_name    : String,
        public promo_code    : String,
        public promo_type    : String,
        public promo_value   : String,
        public campaign_date : String,
        public start_date    : Date,
        public end_date      : Date
    ){}
}