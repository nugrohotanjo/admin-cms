// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { ReportMemberGetMember }                  from './member-get-member';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberGetMemberReportService {

  constructor(private apiService        : ApiService) { }

  getMemberGetMemberReportById(id): Observable<ReportMemberGetMember> {
    return this.apiService.get("/member-get-member-submit/detail/" + id)
                        .pipe(map(data => data));
  }

  getMemberGetMemberReportDownload(start_date, end_date) {
    return this.apiService.get("/member-get-member-submit/download-report/" + start_date + "/" + end_date)
                        .pipe(map(data => data));
  }
  
}
