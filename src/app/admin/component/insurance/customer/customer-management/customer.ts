import { MaritalStatus } from '../../master/marital-status/marital-status';
import { Identity } from '../../master/identity/identity';
import { JobOccupation2 } from '../../master/joboccupation2/joboccupation2';
import { JobOccupation } from '../../master/joboccupation/joboccupation';
import { City } from '../../master/city/city';
import { Province } from '../../master/province/province';

export class Customer {
    constructor(
        public id                               : String,
        public customer_id                      : String,
        public customer_core_id                 : String,
        public customer_status                  : String,
        public full_name                        : String,
        public email                            : String,
        public dob                              : String,
        public phone_number                     : String,
        public gender                           : String,
        public customer_marital_status_id       : MaritalStatus,
        public customer_id_type_id              : Identity,
        public id_number                        : String,
        public address_line_1                   : String,
        public address_line_2                   : String,
        public address_line_3                   : String,
        public city                             : City,
        public city_work                        : City,
        public postal_code                      : String,
        public occupation_1_id                  : JobOccupation,
        public occupation_2_id                  : JobOccupation2,
        public work_address_1                   : String,
        public work_address_2                   : String,
        public work_address_3                   : String,
        public province                         : Province,
        public province_work                    : Province,
        public work_postal_code                 : String,
        public mailing_addresss                 : String,
        public height                           : String,
        public weight                           : String,
        public Insert_timestamp                 : String,
        public Update_timestamp                 : String,
        public Updated_By                       : String,
        public trx                              : String,
    ) {}
}