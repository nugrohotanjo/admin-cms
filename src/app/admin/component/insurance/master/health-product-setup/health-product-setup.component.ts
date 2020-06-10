// Core
import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { HealthProductSetupService }                              from './health-product-setup.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-health-product-setup',
  templateUrl: './health-product-setup.component.html',
  styleUrls: ['./health-product-setup.component.css']
})
export class HealthProductSetupComponent implements OnInit {

  healthProductSetup          : FormGroup
  selectedType                : String = null;
  dataUrl                     : String = environment.api_url
  prefix                      : String = environment.prefix
  edited                      : Boolean   = false

  constructor(  private fb                                : FormBuilder,
                private healthProductSetupService         : HealthProductSetupService,
                private cd                                : ChangeDetectorRef,
                private dynamicScriptLoader               : DynamicScriptLoaderService,
                private sweetalertService                 : SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editHealthSetup', function(){
      let id = $(this).data('id');
      return self.healthProductSetupService.getHealthSetupById(id)
                        .subscribe((data) => {
                          
                          self.changeParameterType(data.parameter_type)
                          self.healthProductSetup.setValue({
                            id              : data.id,
                            name            : data.parameter_name,
                            type            : data.parameter_type,
                            data            : data.data
                          })

                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteHealthSetup', function(){
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
              'Your file has been deleted.',
              'success'
            )
          return   self.healthProductSetupService.destroyHealthSetup(id)
                    .subscribe(() => {
                      // Reset Form after Save Health Product
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#healthSetupRateDatatables').DataTable().ajax.reload();
                    });
          }
      })
    });
  }

  public createHealthProductSetup(){
    return this.healthProductSetupService.saveHealthSetup(this.healthProductSetup.value)
                    .subscribe(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Health Product Rate Has Been Save')

                       // Refresh Datatables after Save Health
                      $('#healthSetupRateDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Health
                      this.resetForm();
                    })
  }

  private createForm(){
    this.healthProductSetup = this.fb.group({
      id                : [''],
      name              : ['',[Validators.required]],
      type              : ['',[Validators.required]],
      data              : ['']
    });
  }

  changeParameterType(t){
    this.data.reset();
    this.selectedType = t;
  }

  public resetForm(){
    this.id.reset()
    this.name.reset()
    this.type.reset()
    this.data.reset()

    this.type.setValue('')

    this.selectedType = null

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.healthProductSetup.get('id');
  }
  get name(){
    return this.healthProductSetup.get('name');
  }
  get type(){
    return this.healthProductSetup.get('type');
  }
  get data(){
    return this.healthProductSetup.get('data');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#healthSetupRateDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/health-setup',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'parameter_name'
              }, {
                data : 'parameter_type'
              },{
                data : 'data'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editHealthSetup"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteHealthSetup"
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

}
