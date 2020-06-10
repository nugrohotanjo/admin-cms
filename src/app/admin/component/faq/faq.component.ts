import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { FaqService }                         from './faq.service'

declare var $: any;
import Swal                                   from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                  from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }         from '../../shared/service/dynamic-script.service';
import { GetCurrentUserService }              from '../../shared/service/getCurrentUser.service'
import { LogService }                         from '../../component/log-management/log.service'

// Environtment
import { environment }                        from 'src/environments/environment';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqForm           : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                    : FormBuilder,
                private faqService            : FaqService,
                private cd                    : ChangeDetectorRef,
                private getCurrentUserService : GetCurrentUserService,
                private dynamicScriptLoader   : DynamicScriptLoaderService,
                private sweetalertService     : SweetalertService,
                private logService            : LogService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editFAQ', function(){
      let id = $(this).data('id');
      return self.faqService.getFaqById(id)
                        .subscribe((data) => {
                          self.faqForm.setValue({
                            id              : data.id,
                            question        : data.question,
                            answer          : data.answer,
                            category        : data.category
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteFAQ', function(){
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
          return   self.faqService.destroyFaq(id)
                    .subscribe(() => {
                      // save log
                      let user = self.getCurrentUserService.getUserData()
        
                      let message = "User " + user.name + " Delete FAQ " + self.id.value

                      let category  = "FAQ"
                
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {
                        self.sweetalertService.yourWorkHasBeenSaved('FAQ Has Been Delete')

                        // Refresh Datatables after Save FAQ
                        $('#faqDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Save FAQ
                        self.resetForm();
                      })
                    });
            }
          })
    });
  }

public createFaq(){
  let user = this.getCurrentUserService.getUserData()

  this.faqForm.patchValue({
    update_by : user.name
  })

  return this.faqService.saveFaq(this.faqForm.value)
                .subscribe(() => {
                  // save log
                  let user = this.getCurrentUserService.getUserData()
    
                  let message = null // siapin variable message

                  if(this.id.value)
                    message   = "User " + user.name + " Update FAQ " + this.question.value
                  else 
                    message   = "User " + user.name + " Add new FAQ"

                  let category  = "FAQ"
            
                  const log = this.logService.storeLog(user, category, message).toPromise()

                  log.then(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('FAQ Has Been Save')

                    // Refresh Datatables after Save FAQ
                    $('#faqDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save FAQ
                    this.resetForm();
                  })
                })
}

private createForm(){
  this.faqForm = this.fb.group({
    id                        : [''],
    category                  : ['',[Validators.required]],
    question                  : ['',[Validators.required]],
    answer                    : ['',[Validators.required]]
  });
}

public resetForm(){
  this.id.reset()
  this.category.reset()
  this.question.reset()
  this.answer.reset()

  // back to normal button
  if(this.edited){
    this.edited = false
  }
}

  get id(){
    return this.faqForm.get('id');
  }
  get category(){
    return this.faqForm.get('category');
  }
  get question(){
    return this.faqForm.get('question');
  }
  get answer(){
    return this.faqForm.get('answer');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#faqDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/faq',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id',
                width: '10%'
              }, {
                data : 'question',
                width: '5%'
              }, {
                data : 'answer',
                width: '30%'
              },{
                data : 'category',
                width: '20%'
              },{
                data: null,
                width: '20%', 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editFAQ"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteFAQ"
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
