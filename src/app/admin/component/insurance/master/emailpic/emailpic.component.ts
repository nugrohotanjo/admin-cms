import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { EmailpicService }   from './emailpic.service'

import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';
@Component({
  selector: 'app-emailpic',
  templateUrl: './emailpic.component.html',
  styleUrls: ['./emailpic.component.css']
})
export class EmailpicComponent implements OnInit {

  emailpicForm      : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                  : FormBuilder,
                private emailpicService        : EmailpicService,
                private cd                  : ChangeDetectorRef,
                private getCurrentUserService : GetCurrentUserService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,
                private logService          : LogService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editEmail', function(){
      let id = $(this).data('id');
      return self.emailpicService.getEmailById(id)
                        .subscribe((data) => {
                          self.emailpicForm.patchValue({
                            id              : data.id,
                            email           : data.email,
                            name            : data.name,
                            category        : data.category,
                            description     : data.description,
                            update_by       : data.updateBy,
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteEmail', function(){
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
          return   self.emailpicService.destroyEmail(id)
                    .subscribe(() => {
                      // Reset Form after Save Email PIC
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#emailpicDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createEmail(){
    let user = this.getCurrentUserService.getUserData()

    this.emailpicForm.patchValue({
      update_by : user.name
    })

    return this.emailpicService.saveEmail(this.emailpicForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Email " + this.email.value
                    else 
                      message   = "User " + user.name + " Add new Email"

                    let category  = "Email PIC"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Email PIC Has Been Save')

                      // Refresh Datatables after Save Email PIC
                      $('#emailpicDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Email PIC
                      this.resetForm();
                    })
                  })
  }

  private createForm(){
    this.emailpicForm = this.fb.group({
      id                        : [''],
      email                     : ['',[Validators.required]],
      name                      : ['',[Validators.required]],
      category                  : ['',[Validators.required]],
      description               : [''],
      update_by                 : ['']
    });
  }

  public resetForm(){
    this.id.reset()
    this.email.reset()
    this.name.reset()
    this.category.reset()
    this.description.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.emailpicForm.get('id');
  }
  get email(){
    return this.emailpicForm.get('email');
  }
  get category(){
    return this.emailpicForm.get('category');
  }
  get name(){
    return this.emailpicForm.get('name');
  }
  get description(){
    return this.emailpicForm.get('description');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#emailpicDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/emails-pic',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'email'
              }, {
                data : 'name'
              }, {
                data : 'category'
              },{
                data : 'updateBy'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editEmail"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteEmail"
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
