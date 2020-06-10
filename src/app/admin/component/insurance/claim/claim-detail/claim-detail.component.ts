// Core
import { Component, OnInit }                                      from '@angular/core';
import { Router, ActivatedRoute }                                 from "@angular/router";
import { FormBuilder, FormGroup, Validators }                     from '@angular/forms';

// Environtment
import { environment }                                             from 'src/environments/environment';

// Model
import { Claim } from '../claim-management/claim';

// service
import { ClaimService } from '../claim-management/claim.service'

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {

  constructor(private claimService  : ClaimService,
              private route         : ActivatedRoute,
              private fb            : FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.loadData();
  }

  //--------------------- VARIABLE START ---------------------//

  dataUrl                                 : String  = environment.api_url
  prefix                                  : String  = environment.prefix
  evident_file                            : String  = environment.files

  ClaimDetail                             : Claim   = null
  Evident_Files                                     = []
  claimForm                               : FormGroup
  id_claim                                : String = this.route.snapshot.paramMap.get("id")
  //--------------------- VARIABLE END   ---------------------//

  public loadData() {
    this.route.params.subscribe(params => {
      return this.claimService.getClaimById(params['id'])
                    .subscribe((data) => {
                      this.ClaimDetail = data
                      
                      this.Evident_Files = this.ClaimDetail.evident_file.split(",")
                      console.log(this.Evident_Files)
                    })
    })

    
  }

  private createForm() {
    this.claimForm = this.fb.group({
      id                        : [''],
      decision                  : ['',[Validators.required]],
      reason                    : ['',[Validators.required]]
    });
  }

  public createDecision() {
    return this.claimService.sendDecisionClaim(this.id_claim, this.claimForm.value)
                .subscribe((data) => {
                  console.log(data)
                })
  }

  get id(){
    return this.claimForm.get('id');
  }
  get decision(){
    return this.claimForm.get('decision');
  }
  get reason(){
    return this.claimForm.get('reason');
  }

}
