import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
declare var $: any;
import { AgentService } from './agent.service'

import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  agentForm         : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                  : FormBuilder,
                private agentService        : AgentService,
                private cd                  : ChangeDetectorRef,
                private getCurrentUserService : GetCurrentUserService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,
                private logService          : LogService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editAgent', function(){
      let id = $(this).data('id');
      return self.agentService.getAgentById(id)
                        .subscribe((data) => {
                          self.agentForm.setValue({
                            id              : data.id,
                            agent_code      : data.agent_code,
                            agent_name      : data.agent_name,
                            agent_status    : data.agent_status === "1" ? true : false,
                            update_by       : data.updateBy,
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteAgent', function(){
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
          return   self.agentService.destroyAgent(id)
                    .subscribe(() => {
                      // Reset Form after Save Agent
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#agentDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createAgent(){
    let user = this.getCurrentUserService.getUserData()

    this.agentForm.patchValue({
      update_by : user.name
    })

    return this.agentService.saveAgent(this.agentForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Agent " + this.agent_name.value
                    else 
                      message   = "User " + user.name + " Add new Agent"

                    let category  = "Agent"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Agent Has Been Save')

                      // Refresh Datatables after Save Agent
                      $('#agentDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Agent
                      this.resetForm();
                    })
                  })
  }

  private createForm(){
    this.agentForm = this.fb.group({
      id                        : [''],
      agent_code                : ['',[Validators.required]],
      agent_name                : ['',[Validators.required]],
      agent_status              : ['',[Validators.required]],
      update_by                 : ['']
    });
  }

  public resetForm(){
    this.id.reset()
    this.agent_code.reset()
    this.agent_name.reset()
    this.agent_status.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id() {
    return this.agentForm.get('id');
  }
  get agent_code(){
    return this.agentForm.get('agent_code');
  }
  get agent_name(){
    return this.agentForm.get('agent_name');
  }
  get agent_status(){
    return this.agentForm.get('agent_status');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#agentDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/agents',
                'contentType' : 'application/json',
              },
        serverSide : true,
        responsive: true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'agent_code'
              }, {
                data : 'agent_name'
              },{
                data : 'agent_status',
                render: function (data, type, row) {
                  if(data === "1")
                    return 'Active'
                  else
                    return 'Non Active'
                }
              },{
                data : 'updateBy'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editAgent"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteAgent"
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
