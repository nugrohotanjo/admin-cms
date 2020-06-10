export class Event {
    constructor(
        public id                : String,
        public title             : String,
        public user_id           : String,
        public cover             : String,
        public content           : String,
        public slug              : String,
        public excerpt           : String,
        public category          : String,
        public status_publish    : Number,
        public meta_description  : String,
        public meta_keyword      : String,
    ){}
}