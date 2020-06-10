import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Service
import { MemberGetMemberReportService } from '../member-get-member-report.service'

// Environtment
import { environment }       from 'src/environments/environment'

@Component({
  selector: 'app-member-get-member-detail',
  templateUrl: './member-get-member-detail.component.html',
  styleUrls: ['./member-get-member-detail.component.css']
})
export class MemberGetMemberDetailComponent implements OnInit {

  constructor(  private route                     : ActivatedRoute,
                private memberGetMemberReportService : MemberGetMemberReportService) { }

  ngOnInit() {
    this.loadData();
  }

  //----------------- Start Value Start ----------------//

  mgmDetail       : any       = null

  prefix                      = environment.prefix
  id              : String    = this.route.snapshot.paramMap.get("id")

  //----------------- Start Value End ----------------//

  private loadData() {
    this.memberGetMemberReportService.getMemberGetMemberReportById(this.id)
            .subscribe((data) => {
              this.mgmDetail = data
              console.log(data)
            })
  }

}
