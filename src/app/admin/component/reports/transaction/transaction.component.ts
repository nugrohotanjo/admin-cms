import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef }          from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';
import { Router }                                                from '@angular/router';
import { DatePipe } from '@angular/common';

//Service
import { DynamicScriptLoaderService }                             from '../../../shared/service/dynamic-script.service';
import { TransactionService }                             from './transaction.service'

// Library
declare var $: any;
import * as moment from 'moment';
import * as XLSX from 'xlsx';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(  private dynamicScriptLoader         : DynamicScriptLoaderService,
                private router                      : Router,
                private zone                        : NgZone,
                private transactionService          : TransactionService ) { }

  ngOnInit( ) {
    this.loadScripts()

    let self = this;

    $(document).on('click', '#viewTransaction', function(){
    let id              = $(this).data('id');
    let policy_number   = $(this).data('policy_number');
    
    self.zone.run(() => self.router.navigate([ self.prefix +'/reports-transaction/detail/' + id + "/" + policy_number]))
    });
  }

  /** VALUE START */
  @ViewChild('tanggal') tanggal: ElementRef;

  dataUrl               : String    = environment.api_url
  prefix                : String    = environment.prefix

  bsRangeValue          : Date[];
  maxDate               : Date = new Date()
  start_date            : String = null;
  end_date              : String = null;

  today                 : Date = new Date()
  templateData                      = [["Policy Number","Name","Email","Phone","Reporter Name","Reporter Email","Reward","Maximum Person","Active Date","End Date"]]
  fileName              : string = 'mgm.xlsx';
  /** VALUE END */

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#transactionDatatables').DataTable({
        ajax: {
              'type'	      : 'GET',
              'url'	        : self.dataUrl +  '/list/policy-master',
              'contentType' : 'application/json',
            },
        'serverSide' : true,
        'responsive': true,
        columns : [{
              data : 'id'
            }, {
              data : 'policy_number'
            }, {
              data : "issued_date"
            },{
              data: null, 
              searchable: false,
              orderable: false,
              render: function (data, type, row) {
              return `
                  <button id="viewTransaction"
                          class="btn btn-icon icon-left btn-primary"
                          data-id="${data.id}" data-policy_number="${data.policy_number}"><i class="fas fa-eye"></i> View</button>
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

    $("#transactionDatatables").DataTable().ajax.url(self.dataUrl +  '/list/member-get-member-submit?daterange='+tgl).load();
  }

  public resetFilterDate() {
    let self = this;
    this.tanggal.nativeElement.value = null
    $("#transactionDatatables").DataTable().ajax.url(self.dataUrl +  '/list/member-get-member-submit').load();
  }

  public downloadExcel(): void {

  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
      // Script Loaded Successfully
      this.initDataTables()
      }).catch(error => console.log(error));
    }
  }
