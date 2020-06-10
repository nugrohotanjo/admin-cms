import { Component, OnInit, NgZone } from '@angular/core';
import { Router }                                                 from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../../shared/service/dynamic-script.service';

// service
import { VisitorService } from './visitor.service'

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  constructor(private visitorService      : VisitorService,  
              private router              : Router,
              private dynamicScriptLoader : DynamicScriptLoaderService,
              private zone                : NgZone) { }

  ngOnInit() {
    this.loadScripts();

    let self = this;
    $(document).on('click', '#viewDetail', function(){
      let id = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/reports/visitor/detail/' + id]))
    });

  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#visitorDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/visitor',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'ip_address'
              }, {
                data : 'browser'
              },{
                data : 'createdAt'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="viewDetail"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="fas fa-eye"></i> View</button> 
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
