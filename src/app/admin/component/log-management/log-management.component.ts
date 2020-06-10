import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { DynamicScriptLoaderService }                            from '../../shared/service/dynamic-script.service';

// Environtment
import { environment }                                            from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-log-management',
  templateUrl: './log-management.component.html',
  styleUrls: ['./log-management.component.css']
})
export class LogManagementComponent implements OnInit {

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  constructor(  private dynamicScriptLoader : DynamicScriptLoaderService,
                private router                            : Router,
                private zone                              : NgZone
              ) { }

  ngOnInit() {
    this.loadScripts()
    let self = this;

    $(document).on('click', '#viewLog', function(){
      let id        = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/log/detail/' + id]))
    });
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#logDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/log',
                'contentType' : 'application/json',
          		},
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'createdAt'
              }, {
                data : 'name'
              }, {
                data : 'category'
              },{
                data : 'activity'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                  return `
                      <button id="viewLog"
                              class="btn btn-icon icon-left btn-primary btn-sm"
                              data-id="${data.id}"><i class="fas fa-eye"></i> View</button> 
                  `;
                }
              }]
      });
    
    })
  }

  public filter_category(param) {
    let self = this;

    $("#logDatatables").DataTable().ajax.url(self.dataUrl +  '/log?category='+param).load();
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables()
   }).catch(error => console.log(error));
  }

}
