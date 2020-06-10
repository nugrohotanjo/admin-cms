import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';
import { Router }                                                from '@angular/router';

// // Service
import { DynamicScriptLoaderService }                             from '../../../shared/service/dynamic-script.service';
// import { CtaService }                                          from './cta.service'
import { GetCurrentUserService }                                  from '../../../shared/service/getCurrentUser.service'
import { LogService }                                             from '../../../component/log-management/log.service'

// // Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';

// // Shared Service
import { SweetalertService }                                      from '../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-epolicy-delivery',
  templateUrl: './epolicy-delivery.component.html',
  styleUrls: ['./epolicy-delivery.component.css']
})
export class EpolicyDeliveryComponent implements OnInit {

  relationshipForm      : FormGroup
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  edited            : Boolean   = false

  today       : Date = new Date()

  constructor(private dynamicScriptLoader         : DynamicScriptLoaderService,
              private cd                          : ChangeDetectorRef,
              private router                      : Router,
              private logService                  : LogService,
              private zone                        : NgZone,
              private getCurrentUserService       : GetCurrentUserService,
              private sweetalertService           : SweetalertService,
  ) { }

  ngOnInit( ) {
    // this.loadForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#viewCta', function(){
      let id = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/reports-cta/detail/' + id]))
    });

  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#reportEpolicyDelivery').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/report-epolicy-delivery',
                'contentType' : 'application/json',
              },
        serverSide : true,
        responsive: true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'policy_number'
              }, {
                data : 'date_delivery'
              }, {
                data : 'status_delivery', render: function (data, type, row) {
                  if(data === "1") {
                    return "Success"
                  }

                  if(data === "2") {
                    return "Failed"
                  }
                }
              }]
          

      });

    });
  }

  public onValueChange(data) {
    let start = null
    let end = null
    data.map((x,i) => {
      if(i > 0) {
        end = moment(x).format('YYYY-MM-DD')
      } else {
        start = moment(x).format('YYYY-MM-DD')
      }
    })

    $("#ctaDatatables").DataTable().ajax.url(this.dataUrl +  '/quotation/' + start + '/' + end).load();
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables()
   }).catch(error => console.log(error));
  }

}
