import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef }          from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';
import { Router }                                                from '@angular/router';
import { DatePipe } from '@angular/common';

//Service
import { DynamicScriptLoaderService }                             from '../../../shared/service/dynamic-script.service';
import { MemberGetMemberReportService }                             from './member-get-member-report.service'

// Library
declare var $: any;
import * as moment from 'moment';
import * as XLSX from 'xlsx';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-member-get-member-report',
  templateUrl: './member-get-member-report.component.html',
  styleUrls: ['./member-get-member-report.component.css'],
  providers: [DatePipe]
})
export class MemberGetMemberReportComponent implements OnInit {

  constructor(
              private dynamicScriptLoader         : DynamicScriptLoaderService,
              private router                      : Router,
              private zone                        : NgZone,
              private memberGetMemberReportService : MemberGetMemberReportService
  ) { }

  ngOnInit( ) {
    this.loadScripts()

    let self = this;

    $(document).on('click', '#viewMgm', function(){
      let id = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/reports-member-get-member/detail/' + id]))
    });
  }

  /** VALUE START */
  @ViewChild('tanggal') tanggal: ElementRef;

  relationshipForm      : FormGroup
  dataUrl               : String    = environment.api_url
  prefix                : String    = environment.prefix
  edited                : Boolean   = false
  bsRangeValue          : Date[];
  maxDate               : Date = new Date()
  start_date            : String = null;
  end_date              : String = null;

  today                 : Date = new Date()
  templateData                      = [["Policy Number","Name","Email","Phone","Reporter Name","Reporter Email","Reward","Maximum Person","Active Date","End Date"]]
  fileName              : string    = 'mgm.xlsx';
  /** VALUE END */

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#mgmDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/member-get-member-submit',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'policy_id', 
                render: function (data, type, row) {
                  return data.policy_number
                }
              }, {
                data : 'name'
              }, {
                data : 'email'
              }, {
                data : 'phone_number', 
                render: function (data, type, row) {
                  return "0" + data
                }
              }, {
                data : 'createdAt'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="viewMgm"
                            class="btn btn-icon icon-left btn-primary"
                            data-id="${data.id}"><i class="fas fa-eye"></i> View</button>
                `;
            }
          }],
          initComplete: function() {
            
          },
          order: [[ 0, "desc" ]]
          

      });

    });
  }

  public filterDate() {
    let self = this;
    let date = this.tanggal.nativeElement.value.split(" ")

    this.start_date = moment(date[0]).format('YYYY-MM-DD')
    this.end_date = moment(date[2]).format('YYYY-MM-DD')

    let tgl = this.start_date + "," + this.end_date

    $("#mgmDatatables").DataTable().ajax.url(self.dataUrl +  '/list/member-get-member-submit?daterange='+tgl).load();
  }

  public resetFilterDate() {
    let self = this;
    this.tanggal.nativeElement.value = null
    $("#mgmDatatables").DataTable().ajax.url(self.dataUrl +  '/list/member-get-member-submit').load();
  }

  public downloadExcel(): void {
    if(this.start_date != null && this.end_date != null) {

      this.memberGetMemberReportService.getMemberGetMemberReportDownload(this.start_date, this.end_date)
        .subscribe((data) => {

          data.map((data) => {
            let mgm = []

            // Push to array
            mgm.push(data.policy_number)
            mgm.push(data.name)
            mgm.push(data.email)
            mgm.push(data.phone)
            mgm.push(data.reporter_name)
            mgm.push(data.reporter_email)
            mgm.push(data.reward)
            mgm.push(data.maxium_person)
            mgm.push(data.active_date)
            mgm.push(data.end_date)

            this.templateData.push(mgm)
          })

          /* generate worksheet */
          const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateData);

          ws['A2'].s = {
            fill: {
            patternType: "none", // none / solid
            fgColor: {rgb: "FF000000"},
            bgColor: {rgb: "FFFFFFFF"}
              },
              font: {
            name: 'Times New Roman',
            sz: 16,
            color: {rgb: "#FF000000"},
            bold: true,
            italic: false,
            underline: false
              },
              border: {
            top: {style: "thin", color: {auto: 1}},
            right: {style: "thin", color: {auto: 1}},
            bottom: {style: "thin", color: {auto: 1}},
            left: {style: "thin", color: {auto: 1}}
              }
          };
      
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

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables()
   }).catch(error => console.log(error));
  }

}
