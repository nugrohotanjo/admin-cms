import {Role} from "../role-management/role";

export class User {
    constructor(
        public id           : Number,
        public name         : String,
        public email        : String,
        public password     : String,
        public role_id      : Role )
    
    {
    
    }
}
