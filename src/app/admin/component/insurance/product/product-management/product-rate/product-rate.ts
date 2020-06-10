import { MasterFormula } from '../../../master/master-formula/master-formula'

export class ProductManagementRate {
    constructor(
        public id               : String,
        public formula          : MasterFormula,
        public fields           : String
    )
    {}
}