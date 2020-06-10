// Core
import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { BenefitService }                                   from './benefit.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-benefit-management',
  templateUrl: './benefit-management.component.html',
  styleUrls: ['./benefit-management.component.css']
})
export class BenefitManagementComponent implements OnInit {

  benefitForm       : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                  : FormBuilder,
                private benefitService      : BenefitService,
                private cd                  : ChangeDetectorRef,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editBenefit', function(){
      let id = $(this).data('id');
      return self.benefitService.getBenefitById(id)
                        .subscribe((data) => {
                          self.benefitForm.setValue({
                            id                    : data.id,
                            benefit_code          : data.benefit_code,
                            benefit_name          : data.benefit_name,
                            benefit_type          : data.benefit_type,
                            benefit_group         : data.benefit_group,
                            benefit_description   : data.benefit_description
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteBenefit', function(){
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
          return   self.benefitService.destroyBenefit(id)
                    .subscribe(() => {
                      // Reset Form after Save Benefit
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#benefitDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createBenefit(){
    return this.benefitService.saveBenefit(this.benefitForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Benefit Has Been Save')

                    // Refresh Datatables after Save Benefit
                    $('#benefitDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Benefit
                    this.resetForm();
                  })
  }

  private createForm(){
    this.benefitForm = this.fb.group({
      id                        : [''],
      benefit_code              : ['',[Validators.required]],
      benefit_name              : ['',[Validators.required]],
      benefit_type              : ['',[Validators.required]],
      benefit_group             : ['',[Validators.required]],
      benefit_description       : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.benefit_code.reset()
    this.benefit_name.reset()
    this.benefit_type.reset()
    this.benefit_group.reset()
    this.benefit_description.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

    get id(){
      return this.benefitForm.get('id');
    }
    get benefit_code(){
      return this.benefitForm.get('benefit_code');
    }
    get benefit_name(){
      return this.benefitForm.get('benefit_name');
    }
    get benefit_type(){
      return this.benefitForm.get('benefit_type');
    }
    get benefit_group(){
      return this.benefitForm.get('benefit_group');
    }
    get benefit_description(){
      return this.benefitForm.get('benefit_description');
    }

    public initDataTables(){
      let self = this;
      $(document).ready(function() {
        $('#benefitDatatables').DataTable({
          ajax: {
                  'type'	      : 'GET',
                  'url'	        : self.dataUrl +  '/list/benefit',
                  'contentType' : 'application/json',
                },
          'serverSide' : true,
          'responsive': true,
          order: [[ 0, "desc" ]],
          columns : [{
                  data : 'id'
                }, {
                  data : 'benefit_code'
                }, {
                  data : 'benefit_name'
                },{
                  data : 'benefit_type'
                },{
                  data: null, 
                  searchable: false,
                  orderable: false,
                  render: function (data, type, row) {
                  return `
                      <button id="editBenefit"
                              class="btn btn-icon icon-left btn-info"
                              data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
        
                      <button id="deleteBenefit"
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
