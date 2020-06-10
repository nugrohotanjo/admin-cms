export class Benefit{
    constructor(
        public id                   : String,
        public benefit_code         : String,
        public benefit_name         : String,
        public benefit_type         : String,
        public benefit_group        : String,
        public benefit_description  : String,
        public benefit_group_slug   : String,
    )
    {}
}