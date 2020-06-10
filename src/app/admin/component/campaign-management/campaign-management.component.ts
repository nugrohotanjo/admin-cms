// Core
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }                      from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';
import { CampaignService }                                        from './campaign.service';
import { GetCurrentUserService }                                  from '../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../component/log-management/log.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';

// Shared Service
import { SweetalertService }                                      from '../../shared/service/sweetalert.service';

// Model
import { Campaign }                                                from './campaign';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.css']
})
export class CampaignManagementComponent implements OnInit {

  @ViewChild('date_campaign') date_campaign: ElementRef;

  minDate       : Date = new Date()
  bsRangeValue  : Date[];
  en: any;
  campaign                                  : Campaign[];
  formCampaign                              : FormGroup;
  today             =  new Date;
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix
  edited            : Boolean   = false
  table = null
  default_data : Campaign = null

  constructor
  (  
    private fb                  : FormBuilder,
    private cd : ChangeDetectorRef,
    private campaignService     : CampaignService,
    private dynamicScriptLoader : DynamicScriptLoaderService,
    private sweetalertService   : SweetalertService,
    private getCurrentUserService : GetCurrentUserService,
    private logService          : LogService,
  ) 
  { }

  ngOnInit() {
    this.loadScripts();
    this.createForm();
    let self = this;

    $(document).on('click', '#editCampaign', function(){
      let id = $(this).data('id');
      self.campaignService.getCampaignById(id)
            .subscribe((data) => {
              let start_date  = moment(data.start_date).format('DD-MM-YYYY')
              let end_date    = moment(data.end_date).format('DD-MM-YYYY')
              
              self.formCampaign.setValue({
                id            : data.id,
                promo_name    : data.promo_name,
                promo_code    : data.promo_code,
                type          : data.promo_type,
                value         : data.promo_value,
                campaign_date : [start_date, end_date]
              })

              self.edited = true
              self.cd.detectChanges();     
              
              // for log
              self.default_data = data
            })
    });

    $(document).on('click', '#deleteCampaign', function(){
      let id = $(this).data('id');
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your Campaign has been deleted.',
              'success'
            )
          return   self.campaignService.destroyCampaign(id)
                    .subscribe((data) => {

                      let message = null // siapin variable message
                      let user = self.getCurrentUserService.getUserData()

                      message   = "User " + user.name + " Delete Promotion with promo code : " + data.promo_code

                      let category  = "Promotion"
                      
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {
                        $('#campaignDatatables').DataTable().ajax.reload();
                      })
                      
                    });
          }
        })
    });   
    
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
      monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: new Date(Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())),
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };
  }

  ngOnDestroy() {
    this.table.draw()
  }

  public createCampaign(){
    let date      = this.date_campaign.nativeElement.value.split(" ")

    let old_data  = this.default_data

    this.campaignService.saveCampaign(this.formCampaign.value, date)
                          .subscribe((data) => {
                            //save log
                            let user = this.getCurrentUserService.getUserData()
              
                            let message = null // siapin variable message

                            if(this.id.value)
                              message   = "User " + user.name + " Update Promotion " + this.promo_code.value
                            else 
                              message   = "User " + user.name + " Add new Promotion with promo code : " + data.promo_code

                            let category  = "Promotion"
                      
                            const log = this.logService.storeLog(user, category, message, old_data, data).toPromise()

                            log.then(() => {
                              this.sweetalertService.yourWorkHasBeenSaved('Campaign Has Been Save')

                              // Refresh Datatables after Save Campaign
                              $('#campaignDatatables').DataTable().ajax.reload();
                                      
                              // Reset Form after Save Campaign
                              this.resetForm();
                            })
                            
                          }, () => {
                              Swal.fire({ 
                                type: 'error', 
                                title: 'Oops...', 
                                text: 'Failed to save Campaign!', 
                              }) // Swal
                            } // Error Message
                          ) // Subscribe
  }

  public createForm(){
    this.formCampaign = this.fb.group({
      id                        : [''],
      promo_name                : ['',[Validators.required]],
      promo_code                : ['',[Validators.required]],
      type                      : ['',[Validators.required]],
      value                     : ['',[Validators.required]],
      campaign_date             : ['']
    });
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      self.table = $('#campaignDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/promo/list',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                render: function (data, type, row, meta) {
                  return meta.row + meta.settings._iDisplayStart + 1;
                }
              }, {
                data : 'promo_name'
              }, {
                data : 'promo_code'
              }, {
                data : 'promo_type'
              }, {
                data : 'promo_value'
              }, {
                data : 'start_date'
              }, {
                data : 'end_date'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editCampaign"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteCampaign"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
            }
          }]
      });

    });
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables()
   }).catch(error => console.log(error));
  }

 public resetForm(){


  this.id.reset()
  this.promo_name.reset()
  this.promo_code.reset()
  this.value.reset()
  this.type.setValue('', {onlySelf: true});
  this.campaign_date.reset()
  
 }

  get id(){
    return this.formCampaign.get('id');
  }

  get promo_code(){
    return this.formCampaign.get('promo_code');
  }

  get promo_name(){
    return this.formCampaign.get('promo_name');
  }

  get type(){
    return this.formCampaign.get('type');
  }

  get value(){
    return this.formCampaign.get('value');
  }

  get campaign_date(){
    return this.formCampaign.get('campaign_date');
  }

}
