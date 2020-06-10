import { UnderwritingQuestionnaire } from '../../../master/underwriting-questionnaire-management/underwriting-questionnaire';

export class ProductParameterization {
    constructor(
        public id                       : String,
        public underwriting             : UnderwritingQuestionnaire,
        public min_age                  : String,
        public max_age                  : String,
        public min_age_insured          : String,
        public max_age_insured          : String,
        public min_age_join_insured          : String,
        public max_age_join_insured          : String
    ) {}
}