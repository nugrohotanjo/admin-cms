// Core
import { Injectable }               from '@angular/core';

// Model
import { UnderwritingQuestionnaire }from './underwriting-questionnaire';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnderwritingQuestionnaireService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/under_writing_questoinare')
                .pipe(map(data => data));
  }

  saveUnderwritingQuestionnaire(data): Observable<UnderwritingQuestionnaire>{

    let underwriting_questionnaire = {
      "id"                      : data.id,
      "underwriting_code"       : data.underwriting_code,
      "underwriting_questions"  : data.underwriting_questions,
      "answer"                  : data.answer,
    }
    
    if(underwriting_questionnaire.id){
      return this.apiService.put("/under_writing_questoinare/" + underwriting_questionnaire.id , underwriting_questionnaire)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/under_writing_questoinare", underwriting_questionnaire)
                    .pipe(map(data => data));
    }
  }

  processAnswer(id, answer) {
    return this.apiService.get("/underwriting-questionnaire/answer/" + id + "/" + answer)
  }

  getUnderwritingQuestionnaireById(id: string): Observable<UnderwritingQuestionnaire>{
    return this.apiService.get("/under_writing_questoinare/" + id)
                .pipe(map(data => data));
  }

  destroyUnderwritingQuestionnaire(id: string): Observable<UnderwritingQuestionnaire>{
    return this.apiService.delete("/under_writing_questoinare/" + id)
                .pipe(map(data => data));
  }
}
