export class UnderwritingQuestionnaire{
    constructor(
        public id                          : String,
        public underwriting_code           : String,
        public underwriting_questions      : Text,
        public answer                      : String
    )
    {}
}