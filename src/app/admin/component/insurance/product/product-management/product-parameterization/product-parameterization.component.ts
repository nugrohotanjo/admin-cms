import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Environtment
import { environment }                          from 'src/environments/environment';


// Service
import { UnderwritingQuestionnaireService } from '../../../master/underwriting-questionnaire-management/underwriting-questionnaire.service'
import { ProductParameterizationService } from './product-parameterization.service'

@Component({
  selector: 'app-product-parameterization',
  templateUrl: './product-parameterization.component.html',
  styleUrls: ['./product-parameterization.component.css']
})
export class ProductParameterizationComponent implements OnInit {

  questionnaireForm       : FormGroup
  prefix                  : String = environment.prefix
  parameter_data                  = {}
  // get the type from parameters
  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category  : String = this.route.snapshot.paramMap.get('category');
  // get product name from parameters
  Id      : String = this.route.snapshot.paramMap.get("product_id")

  ListQuestionnaire = []
  ListMasterBenefit = []

  constructor(  private route             : ActivatedRoute,
                private fb                : FormBuilder,
                private router            : Router,
                private productParameterizationService : ProductParameterizationService,
                private underwritingQuestionnaireService : UnderwritingQuestionnaireService) { }

  ngOnInit() {
    this.createForm()

    // Init Value
    this.initValue()
  }

  private createForm(){
    this.questionnaireForm = this.fb.group({
      id                          : [''],
      underwriting_questionnaire  : [''],
      min_age                     : [''],
      max_age                     : [''],
      insured_min_age             : [''],
      insured_max_age             : [''],
      join_insured_min_age        : [''],
      join_insured_max_age        : ['']
    })
  }

  private initValue() {
    // init Questionnaire
    this.underwritingQuestionnaireService.getAll()
              .subscribe(data => this.ListQuestionnaire = data)

    // Init Paramater
    const parameter = this.productParameterizationService.getProductParameterById(this.Id).toPromise()

    parameter.then((data) => {
      this.parameter_data = data
      
      this.questionnaireForm.patchValue({
        id                          : data.id                     ? data.id : null,
        min_age                     : data.min_age                ? data.min_age : null,
        max_age                     : data.max_age                ? data.max_age : null,
        insured_min_age             : data.min_age_insured        ? data.min_age_insured : null,
        insured_max_age             : data.max_age_insured        ? data.max_age_insured : null,
        join_insured_min_age        : data.min_age_join_insured   ? data.min_age_join_insured : null,
        join_insured_max_age        : data.max_age_join_insured   ? data.max_age_join_insured : null,
        underwriting_questionnaire  : data.underwriting           ? data.underwriting : null
      })
    })
  }


  public addQuestionnaire(){

    const parameter = this.productParameterizationService.saveProductParam(this.questionnaireForm.value, this.Id)
                              .toPromise()

    parameter.then((data) => {
      if(this.Type == 'rider') {
        // Navigate to Brochure Step
        this.router.navigate([
          this.prefix     + '/product/add/summary/' + 
          this.Type       + '/' + 
          this.Category   + '/' + 
          this.Id])
      } else {
      // Navigate to Brochure Step
      this.router.navigate([
        this.prefix     + '/product/add/brochure/' + 
        this.Type       + '/' + 
        this.Category   + '/' + 
        this.Id])
      }
      
    })
    
  }



}
