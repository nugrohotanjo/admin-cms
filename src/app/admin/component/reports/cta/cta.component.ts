import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild } from '@angular/core';
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
import { ChartDataSets, ChartOptions }                            from 'chart.js';
import { Color, Label }                                           from 'ng2-charts';


@Component({
  selector: 'app-cta',
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css']
})
export class CtaComponent implements OnInit {

  relationshipForm      : FormGroup
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  edited            : Boolean   = false

  today       : Date = new Date()

  constructor(private dynamicScriptLoader         : DynamicScriptLoaderService,
              private router                      : Router,
              private zone                        : NgZone,
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
      $('#ctaDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/quotation/list',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'user_name'
              }, {
                data : 'email'
              }, {
                data : 'createdAt'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="viewCta"
                            class="btn btn-icon icon-left btn-primary"
                            data-id="${data.id}"><i class="fas fa-eye"></i> View</button>
                `;
            }
          }],
          initComplete: function() {
            var da = this.api();

            // filter by date range
            $('#filter_date').on('change', function() {
                var val = $(this).val();
                
                da.column(3).search(val).draw()
            });

          },
          order: [[ 0, "desc" ]]
          

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


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Call to Action' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: '#6777ef',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  public onChangeFilter(e) {
    console.log(e)
  }



}
