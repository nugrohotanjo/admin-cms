// Core
import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router }                                                 from '@angular/router';

// Shared Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { ClaimService } from './claim.service'
// Environtment
import { environment }                                            from 'src/environments/environment';

// Library
declare var $: any;
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-claim-management',
  templateUrl: './claim-management.component.html',
  styleUrls: ['./claim-management.component.css']
})
export class ClaimManagementComponent implements OnInit {

  constructor(  private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone,
                private router              : Router,
                private claimService        : ClaimService) { }

  ngOnInit() {
    this.loadScripts();
    let self = this;

    $(document).on('click', '#viewClaim', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([ self.prefix +'/claim/view/' + id]))
    });
  }

  //--------------------- VARIABLE START ---------------------//
  @ViewChild('tanggal') tanggal: ElementRef;
  
  dataUrl                                 : String  = environment.api_url
  prefix                                  : String  = environment.prefix

  maxDate                                 : Date = new Date()
  start_date            : String = null;
  end_date              : String = null;

  today                 : Date = new Date()
  templateData                      = [["Policy Number","Holder NIK","Holder Name","Insured NIK","Insured Name","Claim Submission","Amount","Status"]]
  fileName              : string    = 'report-claim.xlsx';
  claimData = []
//   claimData = [
//     {
//         "holder_nik": "-",
//         "amount": "123456789",
//         "policy_number": "2095797799",
//         "insured_name": "rizky nugroho 1",
//         "claim_submission": "Submitted",
//         "insured_nik": "-",
//         "holder_name": "rizky nugroho 1",
//         "status": "Waiting"
//     },
//     {
//         "holder_nik": "-",
//         "amount": "123456789",
//         "policy_number": "2095797799",
//         "insured_name": "rizky nugroho 1",
//         "claim_submission": "Submitted",
//         "insured_nik": "-",
//         "holder_name": "rizky nugroho 1",
//         "status": "Waiting"
//     },
//     {
//         "holder_nik": "-",
//         "amount": "123456789",
//         "policy_number": "2095797799",
//         "insured_name": "rizky nugroho 1",
//         "claim_submission": "Submitted",
//         "insured_nik": "-",
//         "holder_name": "rizky nugroho 1",
//         "status": "Waiting"
//     }
// ]

  //--------------------- VARIABLE END   ---------------------//

  public filterDate() {
    let self = this;
    let date = this.tanggal.nativeElement.value.split(" ")

    this.start_date = moment(date[0]).format('YYYY-MM-DD')
    this.end_date = moment(date[2]).format('YYYY-MM-DD')

    let tgl = this.start_date + "," + this.end_date

    $("#claimDatatables").DataTable().ajax.url(self.dataUrl +  '/list/claims?daterange='+tgl).load();
  }

  public downloadExcel(): void {
    if(this.start_date != null && this.end_date != null) {

      this.claimService.getClaimReport(this.start_date, this.end_date)
        .subscribe((datas) => {

          this.claimData = datas

          this.claimData.map((data) => {
            let claim = []

            // Push to array
            claim.push(data.policy_number)
            claim.push(data.holder_nik)
            claim.push(data.holder_name)
            claim.push(data.insured_nik)
            claim.push(data.insured_name)
            claim.push(data.claim_submission)
            claim.push(data.amount)
            claim.push(data.status)

            this.templateData.push(claim)
          })

          /* generate worksheet */
          const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateData);
      
          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
          /* save to file */
          XLSX.writeFile(wb, this.fileName);
        })
    } else {
      return alert("Select Date First");
    }
  }

  public resetFilterDate() {
    let self = this;
    this.tanggal.nativeElement.value = null
    $("#claimDatatables").DataTable().ajax.url(self.dataUrl +  '/list/claims').load();
  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#claimDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/claims',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'policy_number'
              }, {
                data : 'claim_id'
              },{
                data : 'customer_id.full_name'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="viewClaim"
                            class="btn btn-icon icon-left btn-primary"
                            data-id="${data.id}"> View</button>
                `;
              }
          }]
      });

    });
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables();
   }).catch(error => console.log(error));
  }

}
