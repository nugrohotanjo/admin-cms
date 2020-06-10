// Core
import { Component, OnInit }                  from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

// Service
import { TransactionService }                 from '../transaction.service'

// Environtment
import { environment }       from 'src/environments/environment'

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  constructor(private transactionService  : TransactionService,
              private route               : ActivatedRoute,
              private router              : Router,) { }

  ngOnInit() {
    this.loadData()
  }

  /** VALUE START */
  dataUrl                 : String  = environment.api_url
  param_policy_number     : String  = this.route.snapshot.paramMap.get("policy_number")

  summaryTransaction                = null
  productInformation                = null
  policyHolder                      = null
  policyInsured                     = null
  policyBeneficiary                 = null
  bankInformation                   = null
  paymentInformation                = null
  /** VALUE END */

  private loadData() {
    this.transactionService.getTransactionByPolicyNumber(this.param_policy_number)
                .subscribe((data) => {
                  this.summaryTransaction = data.summary_transaction
                  this.productInformation = data.product_information
                  this.policyHolder       = data.policy_holder
                  this.policyInsured      = data.policy_insured
                  this.policyBeneficiary  = data.policy_beneficiary
                  this.bankInformation    = data.bank_information
                  this.paymentInformation = data.payment_information
                })
  }



}
