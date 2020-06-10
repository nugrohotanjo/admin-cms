import { Province } from '../province/province';

export class City {
    constructor(
        public id : String,
        public name : String,
        public province_id : Province
    ) {}
}