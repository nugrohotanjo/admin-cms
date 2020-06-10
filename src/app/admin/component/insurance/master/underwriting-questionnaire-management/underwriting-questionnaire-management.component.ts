// Core
import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { UnderwritingQuestionnaireService }                      from './underwriting-questionnaire.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-underwriting-questionnaire-management',
  templateUrl: './underwriting-questionnaire-management.component.html',
  styleUrls: ['./underwriting-questionnaire-management.component.css']
})
export class UnderwritingQuestionnaireManagementComponent implements OnInit {

  underwritingQuestionnaireForm : FormGroup
  dataUrl                       : String = environment.api_url
  prefix                        : String = environment.prefix

  edited    : Boolean   = false

  // For Permission
  objPermission   = null;
  listPermission  = null;
  perm            = []

  constructor(  private fb                                : FormBuilder,
                private underwritingQuestionnaireService  : UnderwritingQuestionnaireService,
                private cd                                : ChangeDetectorRef,
                private dynamicScriptLoader               : DynamicScriptLoaderService,
                private sweetalertService                 : SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editUnderwritingQuestionnaire', function(){
      let id = $(this).data('id');
      return self.underwritingQuestionnaireService.getUnderwritingQuestionnaireById(id)
                        .subscribe((data) => {
                          self.underwritingQuestionnaireForm.setValue({
                            id                      : data.id,
                            underwriting_code       : data.underwriting_code,
                            underwriting_questions  : data.underwriting_questions,
                            answer                  : data.answer,
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteUnderwritingQuestionnaire', function(){
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
          return   self.underwritingQuestionnaireService.destroyUnderwritingQuestionnaire(id)
                    .subscribe(() => {
                      // Reset Form after Save Campaign
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#underwritingQuestionnaireDatatables').DataTable().ajax.reload();
                    });
            }
          })
      });
  }

  public createUnderwritingQuestionnaire(){
    return this.underwritingQuestionnaireService.saveUnderwritingQuestionnaire(this.underwritingQuestionnaireForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Underwriting Questionnaire Has Been Save')

                    // Refresh Datatables after Save Underwriting Questionnaire
                    $('#underwritingQuestionnaireDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Underwriting Questionnaire
                    this.resetForm();
                  })
  }

  private createForm(){
    this.underwritingQuestionnaireForm = this.fb.group({
      id                        : [''],
      underwriting_code         : ['',[Validators.required]],
      underwriting_questions    : ['',[Validators.required]],
      answer                    : ['',[Validators.required]],
    });
  }

  public resetForm(){
    this.id.reset()
    this.underwriting_code.reset()
    this.underwriting_questions.reset()

    this.answer.setValue('', {onlySelf: true});

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.underwritingQuestionnaireForm.get('id');
  }
  get underwriting_code(){
    return this.underwritingQuestionnaireForm.get('underwriting_code');
  }
  get underwriting_questions(){
    return this.underwritingQuestionnaireForm.get('underwriting_questions');
  }
  get answer(){
    return this.underwritingQuestionnaireForm.get('answer');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#underwritingQuestionnaireDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/under_writing_questoinare',
                'contentType' : 'application/json',
          		},
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'underwriting_code'
              }, {
                data : 'underwriting_questions'
              }, {
                data : 'answer'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editUnderwritingQuestionnaire"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteUnderwritingQuestionnaire"
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
