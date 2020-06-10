// Core
import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { BenefitLevelService }                                   from './benefit-level.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-benefit-level-management',
  templateUrl: './benefit-level-management.component.html',
  styleUrls: ['./benefit-level-management.component.css']
})
export class BenefitLevelManagementComponent implements OnInit {

  benefitLevelForm : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                  : FormBuilder,
                private benefitLevelService : BenefitLevelService,
                private cd                  : ChangeDetectorRef,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editBenefitLevel', function(){
      let id = $(this).data('id');
      return self.benefitLevelService.getBenefitLevelById(id)
                        .subscribe((data) => {
                          self.benefitLevelForm.setValue({
                            id              : data.id,
                            benefit_level   : data.benefit_level,
                            benefit_amount  : data.benefit_amount
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteBenefitLevel', function(){
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
          return   self.benefitLevelService.destroyBenefitLevel(id)
                    .subscribe(() => {
                      // Reset Form after Save Campaign
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#benefitLevelDatatables').DataTable().ajax.reload();
                    });
            }
          })
      });
  }

  public createBenefitLevel(){
    return this.benefitLevelService.saveBenefitLevel(this.benefitLevelForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Benefit Level Has Been Save')

                    // Refresh Datatables after Save Benefit Level
                    $('#benefitLevelDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Benefit Level
                    this.resetForm();
                  })
  }

  private createForm(){
    this.benefitLevelForm = this.fb.group({
      id                        : [''],
      benefit_level             : ['',[Validators.required]],
      benefit_amount            : ['',[Validators.required]]
    });
  }

  get id(){
    return this.benefitLevelForm.get('id');
  }
  get benefit_level(){
    return this.benefitLevelForm.get('benefit_level');
  }
  get benefit_amount(){
    return this.benefitLevelForm.get('benefit_amount');
  }

  public resetForm(){
    this.id.reset()
    this.benefit_level.reset()
    this.benefit_amount.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#benefitLevelDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/benefit-level',
                'contentType' : 'application/json',
          		},
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'benefit_level'
              }, {
                data : 'benefit_amount'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editBenefitLevel"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteBenefitLevel"
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
