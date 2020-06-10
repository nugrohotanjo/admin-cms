// Core
import { Injectable }               from '@angular/core';

// Model
import { MemberGetMember }                     from './member-get-member';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MemberGetMemberService {

  constructor(private apiService        : ApiService) { }

  saveMemberGetMember(data): Observable<MemberGetMember>{
    let start_date  = moment(data.date[0]).format('YYYY-MM-DD')
    let end_date    = moment(data.date[2]).format('YYYY-MM-DD')

    let member_get_member = {
      "maximum_amount"      : data.maximum_amount,
      "reward"              : data.reward,
      "image"               : data.image,
      "start_date"          : start_date,
      "end_date"            : end_date,
    }

    return this.apiService.post("/member_get_member", member_get_member)
                    .pipe(map(data => data))
  }

  getMemberByMemberById(id): Observable<MemberGetMember>{
    return this.apiService.get("/member_get_member/" + id)
                    .pipe(map(data => data))
  }

  updateMemberGetMember(id, data): Observable<MemberGetMember>{
    let start_date  = moment(data.date[0]).format('YYYY-MM-DD')
    let end_date    = moment(data.date[2]).format('YYYY-MM-DD')

    let member_get_member = {
      "maximum_amount"      : data.maximum_amount,
      "reward"              : data.reward,
      "image"               : data.image,
      "start_date"          : start_date,
      "end_date"            : end_date,
    }
    
    return this.apiService.put("/member_get_member/" + id, member_get_member)
                    .pipe(map(data => data))
  }

  destroyMemberGetMember(id): Observable<MemberGetMember>{
    return this.apiService.delete("/member_get_member/" + id)
                    .pipe(map(data => data))
  }

}
