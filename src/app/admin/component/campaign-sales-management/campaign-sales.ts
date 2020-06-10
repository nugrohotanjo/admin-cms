import { Campaign } from '../campaign-management/campaign';

export class CampaignSales {
    constructor(
        public id                   : Number,
        public sales_name           : String,
        public promo_code           : String,
        public description          : String,
        public status               : String,
        public promotion            : Campaign
    ){}
}