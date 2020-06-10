// Core
import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Servic
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { ModalFactorService }                                    from './modal-factor.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-modal-factor-management',
  templateUrl: './modal-factor-management.component.html',
  styleUrls: ['./modal-factor-management.component.css'],
  providers: [ModalFactorService, SweetalertService]
})
export class ModalFactorManagementComponent implements OnInit {

  modalFactorForm               : FormGroup
  dataUrl                       : String = environment.api_url
  prefix                        : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                                : FormBuilder,
                private modalFactorService                : ModalFactorService,
                private cd                                : ChangeDetectorRef,
                private dynamicScriptLoader               : DynamicScriptLoaderService,
                private sweetalertService                 : SweetalertService,) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editModalFactor', function(){
      let id = $(this).data('id');
      return self.modalFactorService.getModalFactorById(id)
                        .subscribe((data) => {
                          console.log(data)
                          self.modalFactorForm.setValue({
                            id            : data.id,
                            frequency     : data.frequency
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteModalFactor', function(){
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
          return   self.modalFactorService.destroyModalFactor(id)
                    .subscribe(() => {
                      // Reset Form after Save Campaign
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#modalFactorDatatables').DataTable().ajax.reload();
                    });
            }
          })
      });
  }

  public createModalFactor(){
    return this.modalFactorService.saveModalFactor(this.modalFactorForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Modal Factor Has Been Save')

                    // Refresh Datatables after Save Underwriting Questionnaire
                    $('#modalFactorDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Underwriting Questionnaire
                    this.resetForm();
                  })
  }

  private createForm(){
    this.modalFactorForm = this.fb.group({
      id                        : [''],
      frequency                 : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.frequency.setValue('');

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.modalFactorForm.get('id');
  }
  get frequency(){
    return this.modalFactorForm.get('frequency');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#modalFactorDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/modal-factor/list',
                'contentType' : 'application/json',
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'frequency'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editModalFactor"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteModalFactor"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
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
     this.initDataTables()
   }).catch(error => console.log(error));
  }

}
