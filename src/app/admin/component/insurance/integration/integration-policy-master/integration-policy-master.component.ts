import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

// Environtment
import { environment }                        from 'src/environments/environment';

import { saveAs } from 'file-saver';

// Model
// import { PolicyProduct }  from '../../policy/policy-management/policy-product';
// import { PolicyHolder }   from '../../policy/policy-management/policy-holder';
// import { City }           from '../../master/city/city';
// import { PolicyPayment }  from '../../policy/policy-management/policy-payment';
// import { Bank } from '../../master/bank/bank';
// import { PolicyInsured } from '../../policy/policy-management/policy-insured';

// Service
import { IntegrationPolicyMasterService } from './integration-policy-master.service'
// import { IntegrationPolicyMaster }        from './integration-policy-master';
// import { PolicyService }                  from '../../policy/policy-management/policy.service'
// import { CityService }                    from '../../master/city/city.service'
// import { BankService }                    from '../../master/bank/bank.service'
// import { XRequestMapService }             from 'src/app/admin/shared/service/xrequestmap.service';


// Library
import * as moment from 'moment';
// import { PolicyBeneficiary } from '../../policy/policy-management/policy-beneficiary';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { BsDatepickerModule }                 from 'ngx-bootstrap/datepicker'

@Component({
  selector: 'app-integration-policy-master',
  templateUrl: './integration-policy-master.component.html',
  styleUrls: ['./integration-policy-master.component.css']
})
export class IntegrationPolicyMasterComponent implements OnInit {

  @ViewChild('filter_date') filter_date: ElementRef;
  @ViewChild('childModal') childModal: ModalDirective;

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  maxDate           : Date;
  data              = null;

  BenefList       = []
  CoverageList    = []
  MasterList      = []

  constructor(private integrationPolicyMasterService  : IntegrationPolicyMasterService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }

  async getAllData(date) {
    await this.loadDataMaster(date) 
    await this.loadDataCoverage(date)
    await this.loadDataBeneficiary(date)
  }

  private loadDataMaster(param : String) {
    this.integrationPolicyMasterService.getTxtMaster(param)
                                        .subscribe((data) => {
                                          this.MasterList = data;
                                        })
  }

  private loadDataCoverage(param : String) {
    this.integrationPolicyMasterService.getTxtCoverage(param)
                                        .subscribe((data) => {
                                          this.CoverageList = data;
                                        })
  }

  private loadDataBeneficiary(param : String) {
    this.integrationPolicyMasterService.getTxtBeneficiary(param)
                                        .subscribe((data) => {
                                          this.BenefList = data;
                                        })
  }
  
  private downloadBenef() {
    let datax       = ""
    let txt         = []
    let lengthData  = this.BenefList.length - 1
    let date_file   = moment(this.BenefList[0].createdAt).format('YYYY-MM-DD')

    this.BenefList.map((b,i) => {
      if(b.currency) {
        let length_currency = 3
        datax += b.currency
        
        if(b.currency.length < length_currency) {
            datax += this.space(b.currency.length, length_currency)
        }
      }

      if(b.policy_number) {
        let length_policy_number = 10
        datax += b.policy_number
        
        if(b.policy_number.length < length_policy_number) {
            datax += this.space(b.policy_number.length, length_policy_number)
        }
      }

      if(b.sequence_no) {
        let length_sequence_no = 2
        datax += b.sequence_no
        
        if(b.sequence_no.length < length_sequence_no) {
            datax += this.space(b.sequence_no.length, length_sequence_no)
        }
      }

      if(b.beneficiary_name) {
        let length_beneficiary_name = 100
        if(b.beneficiary_name.length < length_beneficiary_name) {
          datax += b.beneficiary_name
          datax += this.space(b.beneficiary_name.length, length_beneficiary_name)
        } else {
          datax += b.beneficiary_name.substring(0,100)
        }
      }

      if(b.beneficiary_gender) {
        let length_beneficiary_gender = 1
        datax += b.beneficiary_gender
        
        if(b.beneficiary_gender.length < length_beneficiary_gender) {
            datax += this.space(b.beneficiary_gender.length, length_beneficiary_gender)
        }
      }

      if(b.beneficiary_dob) {
        let length_beneficiary_dob = 10
        datax += b.beneficiary_dob
        
        if(b.beneficiary_dob.length < length_beneficiary_dob) {
            datax += this.space(b.beneficiary_dob.length, length_beneficiary_dob)
        }
      }

      if(b.beneficiary_relation) {
        let length_beneficiary_relation = 2
        datax += b.beneficiary_relation
        
        if(b.beneficiary_relation.length < length_beneficiary_relation) {
            datax += this.space(b.beneficiary_relation.length, length_beneficiary_relation)
        }
      }

      if(b.beneficiary_address_line_1) {
        let length_beneficiary_address_line_1 = 30
        datax += b.beneficiary_address_line_1
        
        if(b.beneficiary_address_line_1.length < length_beneficiary_address_line_1) {
            datax += this.space(b.beneficiary_address_line_1.length, length_beneficiary_address_line_1)
        }
      } else {
        datax += "                              "
      }

      if(b.beneficiary_address_line_2) {
        let length_beneficiary_address_line_2 = 30
        datax += b.beneficiary_address_line_2
        
        if(b.beneficiary_address_line_2.length < length_beneficiary_address_line_2) {
            datax += this.space(b.beneficiary_address_line_2.length, length_beneficiary_address_line_2)
        }
      } else {
        datax += "                              "
      }

      if(b.beneficiary_city) {
        let length_beneficiary_city = 20
        datax += b.beneficiary_city
        
        if(b.beneficiary_city.length < length_beneficiary_city) {
            datax += this.space(b.beneficiary_city.length, length_beneficiary_city)
        }
      } else {
        datax += "                    "
      }

      if(b.beneficiary_zip) {
        let length_beneficiary_zip = 6
        datax += b.beneficiary_zip
        
        if(b.beneficiary_zip.length < length_beneficiary_zip) {
            datax += this.space(b.beneficiary_zip.length, length_beneficiary_zip)
        }
      } else {
        datax += "      "
      }

      if(b.beneficiary_telephone) {
        let length_beneficiary_telephone = 20
        datax += b.beneficiary_telephone
        
        if(b.beneficiary_telephone.length < length_beneficiary_telephone) {
            datax += this.space(b.beneficiary_telephone.length, length_beneficiary_telephone)
        }
      } else {
        datax += "                    "
      }

      if(b.beneficiary_mobile_no) {
        let length_beneficiary_mobile_no = 20
        datax += b.beneficiary_mobile_no
        
        if(b.beneficiary_mobile_no.length < length_beneficiary_mobile_no) {
            datax += this.space(b.beneficiary_mobile_no.length, length_beneficiary_mobile_no)
        }
      } else {
        datax += "                    "
      }

      if(b.id_type) {
        let length_id_type = 1
        datax += b.id_type
        
        if(b.id_type.length < length_id_type) {
            datax += this.space(b.id_type.length, length_id_type)
        }
      } else {
        datax += " "
      }

      if(b.beneficiary_owner_id) {
        let length_beneficiary_owner_id = 16
        if(b.beneficiary_owner_id.length < length_beneficiary_owner_id) {
          datax += b.beneficiary_owner_id
          datax += this.space(b.beneficiary_owner_id.length, length_beneficiary_owner_id)
        } else {
          datax += b.beneficiary_owner_id.substring(0,16)
        }

      }

      if(b.beneficiary_email) {
        let length_beneficiary_email = 60
        datax += b.beneficiary_email
        
        if(b.beneficiary_email.length < length_beneficiary_email) {
            datax += this.space(b.beneficiary_email.length, length_beneficiary_email)
        }
      } else {
        datax += "                                                            "
      }

      if(i < lengthData) {
        datax += "\n"
      }
      
      txt.push(datax)
      datax = ""
    })
    
    let file = new Blob(txt, { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'EXPORT PRODUCTION_1st_' + date_file + '_' + date_file + '_Ben.txt')

    // clear data date file
    date_file = null
  }

  private downloadCoverage() {
    let datax       = ""
    let txt         = []
    let lengthData  = this.CoverageList.length - 1
    let date_file   = moment(this.CoverageList[0].createdAt).format('YYYY-MM-DD')
    
    this.CoverageList.map((c,i) => {
      if(c.policy_number) {
        let length_policy_number = 10
        if(c.policy_number.length < length_policy_number) {
          datax += c.policy_number
          datax += this.space(c.policy_number.length, length_policy_number)
        } else {
          datax += c.policy_number.substring(0,10)
        }
      }

      if(c.rider_number) {
        let length_rider_number = 2
        if(c.rider_number.length < length_rider_number) {
          datax += c.rider_number
          datax += this.space(c.rider_number.length, length_rider_number)
        } else {
          datax += c.rider_number.substring(0,2)
        }
      }

      if(c.plan_code_rider) {
        let length_plan_code_rider = 10
        if(c.plan_code_rider.length < length_plan_code_rider) {
          datax += c.plan_code_rider
          datax += this.space(c.plan_code_rider.length, length_plan_code_rider)
        } else {
          datax += c.plan_code_rider.substring(0,10)
        }
      }

      if(c.insured_relation) {
        let length_insured_relation = 2
        if(c.insured_relation.length < length_insured_relation) {
          datax += c.insured_relation
          datax += this.space(c.insured_relation.length, length_insured_relation)
        } else {
          datax += c.insured_relation.substring(0,2)
        }
      }

      if(c.insured_name_rider) {
        let length_insured_name_rider = 100
        if(c.insured_name_rider.length < length_insured_name_rider) {
          datax += c.insured_name_rider
          datax += this.space(c.insured_name_rider.length, length_insured_name_rider)
        } else {
          datax += c.insured_name_rider.substring(0,100)
        }
      }

      if(c.id_type_rider) {
        let length_id_type_rider = 1
        if(c.id_type_rider.length < length_id_type_rider) {
          datax += c.id_type_rider
          datax += this.space(c.id_type_rider.length, length_id_type_rider)
        } else {
          datax += c.id_type_rider.substring(0,1)
        }
      }

      if(c.id_no_rider) {
        let length_id_no_rider = 16
        if(c.id_no_rider.length < length_id_no_rider) {
          datax += c.id_no_rider
          datax += this.space(c.id_no_rider.length, length_id_no_rider)
        } else {
          datax += c.id_no_rider.substring(0,16)
        }
      }

      if(c.premium_rider) {
        let length_premium_rider = 12
        let length_temp = length_premium_rider - c.premium_rider.length 

        for (let index = 0; index < length_premium_rider; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += c.premium_rider
      }

      if(c.sum_assured_rider) {
        let length_sum_assured_rider = 15
        let length_temp = length_sum_assured_rider - c.sum_assured_rider.length 

        for (let index = 0; index < length_sum_assured_rider; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += c.sum_assured_rider
      }

      if(c.dob_rider) {
        let length_dob_rider = 10
        if(c.dob_rider.length < length_dob_rider) {
          datax += c.dob_rider
          datax += this.space(c.dob_rider.length, length_dob_rider)
        } else {
          datax += c.dob_rider.substring(0,10)
        }
      }

      if(c.gender_rider) {
        let length_gender_rider = 1
        if(c.gender_rider.length < length_gender_rider) {
          datax += c.gender_rider
          datax += this.space(c.gender_rider.length, length_gender_rider)
        } else {
          datax += c.gender_rider.substring(0,1)
        }
      }

      if(c.occupation_code_1_rider) {
        let length_occupation_code_1_rider = 3
        if(c.occupation_code_1_rider.length < length_occupation_code_1_rider) {
          datax += c.occupation_code_1_rider
          datax += this.space(c.occupation_code_1_rider.length, length_occupation_code_1_rider)
        } else {
          datax += c.occupation_code_1_rider.substring(0,3)
        }
      }

      if(c.occupation_code_2_rider) {
        let length_occupation_code_2_rider = 2
        if(c.occupation_code_2_rider.length < length_occupation_code_2_rider) {
          datax += c.occupation_code_2_rider
          datax += this.space(c.occupation_code_2_rider.length, length_occupation_code_2_rider)
        } else {
          datax += c.occupation_code_2_rider.substring(0,2)
        }
      }

      if(c.la_nationality) {
        let length_la_nationality = 1
        if(c.la_nationality.length < length_la_nationality) {
          datax += c.la_nationality
          datax += this.space(c.la_nationality.length, length_la_nationality)
        } else {
          datax += c.la_nationality.substring(0,1)
        }
      }

      if(c.la_income) {
        let length_la_income = 10
        if(c.la_income.length < length_la_income) {
          datax += c.la_income
          datax += this.space(c.la_income.length, length_la_income)
        } else {
          datax += c.la_income.substring(0,10)
        }
      }

      if(c.premium_term) {
        let length_premium_term = 2
        if(c.premium_term.length < length_premium_term) {
          datax += c.premium_term
          datax += this.space(c.premium_term.length, length_premium_term)
        } else {
          datax += c.premium_term.substring(0,2)
        }
      }

      if(c.coverage_term) {
        let length_coverage_term = 2
        if(c.coverage_term.length < length_coverage_term) {
          datax += c.coverage_term
          datax += this.space(c.coverage_term.length, length_coverage_term)
        } else {
          datax += c.coverage_term.substring(0,2)
        }
      }

      if(c.premium_type) {
        let length_premium_type = 1
        if(c.premium_type.length < length_premium_type) {
          datax += c.premium_type
          datax += this.space(c.premium_type.length, length_premium_type)
        } else {
          datax += c.premium_type.substring(0,1)
        }
      }

      if(c.coverage_type) {
        let length_coverage_type = 1
        if(c.coverage_type.length < length_coverage_type) {
          datax += c.coverage_type
          datax += this.space(c.coverage_type.length, length_coverage_type)
        } else {
          datax += c.coverage_type.substring(0,1)
        }
      }

      if(c.pay_mode) {
        let length_pay_mode = 1
        if(c.pay_mode.length < length_pay_mode) {
          datax += c.pay_mode
          datax += this.space(c.pay_mode.length, length_pay_mode)
        } else {
          datax += c.pay_mode.substring(0,1)
        }
      }

      if(c.weight) {
        let length_weight = 3
        let length_temp = length_weight - c.weight.length 

        for (let index = 0; index < length_weight; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += c.weight + ".00"
      }

      if(c.height) {
        let length_height = 4
        if(c.height.length < length_height) {
          datax += c.height
          datax += this.space(c.height.length, length_height)
        } else {
          datax += c.height.substring(0,4)
        }
      }

      if(c.email) {
        let length_email = 60
        if(c.email.length < length_email) {
          datax += c.email
          datax += this.space(c.email.length, length_email)
        } else {
          datax += c.email.substring(0,60)
        }
      }

      if(i < lengthData) {
        datax += "\n"
      }
      
      txt.push(datax)
      datax = ""
    })
    let file = new Blob(txt, { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'EXPORT PRODUCTION_1st_' + date_file + '_' + date_file + '_Cov.txt')

    // clear data date file
    date_file = null
  }

  private downloadMaster() {
    let datax       = ""
    let txt         = []
    let lengthData  = this.MasterList.length - 1
    let date_file   = moment(this.MasterList[0].createdAt).format('YYYY-MM-DD')
    
    this.MasterList.map((j,i) => {
      
      if(j.currency) {
        let length_currency = 3
        if(j.currency.length < length_currency) {
          datax += j.currency
          datax += this.space(j.currency.length, length_currency)
        } else {
          datax += j.currency.substring(0,3)
        }
      }

      if(j.policy_number) {
        let length_policy_number = 10
        if(j.policy_number.length < length_policy_number) {
          datax += j.policy_number
          datax += this.space(j.policy_number.length, length_policy_number)
        } else {
          datax += j.policy_number.substring(0,10)
        }
      }

      if(j.agent_code) {
        let length_agent_code = 9
        if(j.agent_code.length < length_agent_code) {
          datax += j.agent_code
          datax += this.space(j.agent_code.length, length_agent_code)
        } else {
          datax += j.agent_code.substring(0,9)
        }
      }

      if(j.plan_code) {
        let length_plan_code = 10
        if(j.plan_code.length < length_plan_code) {
          datax += j.plan_code
          datax += this.space(j.plan_code.length, length_plan_code)
        } else {
          datax += j.plan_code.substring(0,10)
        }
      }

      if(j.owner_name) {
        let length_owner_name = 100
        if(j.owner_name.length < length_owner_name) {
          datax += j.owner_name
          datax += this.space(j.owner_name.length, length_owner_name)
        } else {
          datax += j.owner_name.substring(0,100)
        }
      }

      if(j.owner_gender) {
        let length_owner_gender = 1
        if(j.owner_gender.length < length_owner_gender) {
          datax += j.owner_gender
          datax += this.space(j.owner_gender.length, length_owner_gender)
        } else {
          datax += j.owner_gender.substring(0,1)
        }
      }

      if(j.marital_status) {
        let length_marital_status = 1
        if(j.marital_status.length < length_marital_status) {
          datax += j.marital_status
          datax += this.space(j.marital_status.length, length_marital_status)
        } else {
          datax += j.marital_status.substring(0,1)
        }
      }

      if(j.owner_id_type) {
        let length_owner_id_type = 1
        if(j.owner_id_type.length < length_owner_id_type) {
          datax += j.owner_id_type
          datax += this.space(j.owner_id_type.length, length_owner_id_type)
        } else {
          datax += j.owner_id_type.substring(0,1)
        }
      }

      if(j.owner_id_no) {
        let length_owner_id_no = 16
        if(j.owner_id_no.length < length_owner_id_no) {
          datax += j.owner_id_no
          datax += this.space(j.owner_id_no.length, length_owner_id_no)
        } else {
          datax += j.owner_id_no.substring(0,16)
        }
      }

      if(j.owner_dob) {
        let length_owner_dob = 10
        if(j.owner_dob.length < length_owner_dob) {
          datax += j.owner_dob
          datax += this.space(j.owner_dob.length, length_owner_dob)
        } else {
          datax += j.owner_dob.substring(0,10)
        }
      }

      if(j.owner_address_line_1) {
        let length_owner_address_line_1 = 30
        if(j.owner_address_line_1.length < length_owner_address_line_1) {
          datax += j.owner_address_line_1
          datax += this.space(j.owner_address_line_1.length, length_owner_address_line_1)
        } else {
          datax += j.owner_address_line_1.substring(0,30)
        }
      }

      if(j.owner_address_line_2) {
        let length_owner_address_line_2 = 30
        if(j.owner_address_line_2.length < length_owner_address_line_2) {
          datax += j.owner_address_line_2
          datax += this.space(j.owner_address_line_2.length, length_owner_address_line_2)
        } else {
          datax += j.owner_address_line_2.substring(0,30)
        }
      } else {
        datax += "                              "
      }

      if(j.owner_address_line_3) {
        let length_owner_address_line_3 = 30
        if(j.owner_address_line_3.length < length_owner_address_line_3) {
          datax += j.owner_address_line_3
          datax += this.space(j.owner_address_line_3.length, length_owner_address_line_3)
        } else {
          datax += j.owner_address_line_3.substring(0,30)
        }
      } else {
        datax += "                              "
      }

      if(j.owner_city) {
        let length_owner_city = 20
        if(j.owner_city.length < length_owner_city) {
          datax += j.owner_city
          datax += this.space(j.owner_city.length, length_owner_city)
        } else {
          datax += j.owner_city.substring(0,20)
        }
      }

      if(j.owner_zip) {
        let length_owner_zip = 6
        if(j.owner_zip.length < length_owner_zip) {
          datax += j.owner_zip
          datax += this.space(j.owner_zip.length, length_owner_zip)
        } else {
          datax += j.owner_zip.substring(0,6)
        }
      }

      if(j.owner_telephone) {
        let length_owner_telephone = 20
        if(j.owner_telephone.length < length_owner_telephone) {
          datax += j.owner_telephone
          datax += this.space(j.owner_telephone.length, length_owner_telephone)
        } else {
          datax += j.owner_telephone.substring(0,20)
        }
      }

      if(j.owner_mobile_no) {
        let length_owner_mobile_no = 20
        if(j.owner_mobile_no.length < length_owner_mobile_no) {
          datax += j.owner_mobile_no
          datax += this.space(j.owner_mobile_no.length, length_owner_mobile_no)
        } else {
          datax += j.owner_mobile_no.substring(0,20)
        }
      }

      if(j.owner_occupation_code_1) {
        let length_owner_occupation_code_1 = 3
        if(j.owner_occupation_code_1.length < length_owner_occupation_code_1) {
          datax += j.owner_occupation_code_1
          datax += this.space(j.owner_occupation_code_1.length, length_owner_occupation_code_1)
        } else {
          datax += j.owner_occupation_code_1.substring(0,3)
        }
      }

      if(j.owner_occupation_code_2) {
        let length_owner_occupation_code_2 = 2
        if(j.owner_occupation_code_2.length < length_owner_occupation_code_2) {
          datax += j.owner_occupation_code_2
          datax += this.space(j.owner_occupation_code_2.length, length_owner_occupation_code_2)
        } else {
          datax += j.owner_occupation_code_2.substring(0,2)
        }
      }

      if(j.owner_payer_relation) {
        let length_owner_payer_relation = 2
        if(j.owner_payer_relation.length < length_owner_payer_relation) {
          datax += j.owner_payer_relation
          datax += this.space(j.owner_payer_relation.length, length_owner_payer_relation)
        } else {
          datax += j.owner_payer_relation.substring(0,2)
        }
      }

      if(j.payer_name) {
        let length_payer_name = 100
        if(j.payer_name.length < length_payer_name) {
          datax += j.payer_name
          datax += this.space(j.payer_name.length, length_payer_name)
        } else {
          datax += j.payer_name.substring(0,100)
        }
      }

      if(j.payer_id_type) {
        let length_payer_id_type = 1
        if(j.payer_id_type.length < length_payer_id_type) {
          datax += j.payer_id_type
          datax += this.space(j.payer_id_type.length, length_payer_id_type)
        } else {
          datax += j.payer_id_type.substring(0,1)
        }
      }

      if(j.payer_id_no) {
        let length_payer_id_no = 16
        if(j.payer_id_no.length < length_payer_id_no) {
          datax += j.payer_id_no
          datax += this.space(j.payer_id_no.length, length_payer_id_no)
        } else {
          datax += j.payer_id_no.substring(0,16)
        }
      }

      if(j.payer_dob) {
        let length_payer_dob = 10
        if(j.payer_dob.length < length_payer_dob) {
          datax += j.payer_dob
          datax += this.space(j.payer_dob.length, length_payer_dob)
        } else {
          datax += j.payer_dob.substring(0,10)
        }
      }

      if(j.payer_address_line_1) {
        let length_payer_address_line_1 = 30
        if(j.payer_address_line_1.length < length_payer_address_line_1) {
          datax += j.payer_address_line_1
          datax += this.space(j.payer_address_line_1.length, length_payer_address_line_1)
        } else {
          datax += j.payer_address_line_1.substring(0,30)
        }
      } else {
        datax += "                              "
      }

      if(j.payer_address_line_2) {
        let length_payer_address_line_2 = 30
        if(j.payer_address_line_2.length < length_payer_address_line_2) {
          datax += j.payer_address_line_2
          datax += this.space(j.payer_address_line_2.length, length_payer_address_line_2)
        } else {
          datax += j.payer_address_line_2.substring(0,30)
        }
      } else {
        datax += "                              "
      }

      if(j.payer_address_line_3) {
        let length_payer_address_line_3 = 30
        if(j.payer_address_line_3.length < length_payer_address_line_3) {
          datax += j.payer_address_line_3
          datax += this.space(j.payer_address_line_3.length, length_payer_address_line_3)
        } else {
          datax += j.payer_address_line_3.substring(0,30)
        }
        
      } else {
        datax += "                              "
      }

      if(j.payer_city) {
        let length_payer_city = 20
        if(j.payer_city.length < length_payer_city) {
          datax += j.payer_city
          datax += this.space(j.payer_city.length, length_payer_city)
        } else {
          datax += j.payer_city.substring(0,20)
        }
      }

      if(j.payer_zip) {
        let length_payer_zip = 6
        if(j.payer_zip.length < length_payer_zip) {
          datax += j.payer_zip
          datax += this.space(j.payer_zip.length, length_payer_zip)
        } else {
          datax += j.payer_zip.substring(0,6)
        }
      }

      if(j.payer_telephone) {
        let length_payer_telephone = 20        
        if(j.payer_telephone.length < length_payer_telephone) {
          datax += j.payer_telephone
          datax += this.space(j.payer_telephone.length, length_payer_telephone)
        } else {
          datax += j.payer_telephone.substring(0,20)
        }
      }

      if(j.payer_mobile_no) {
        let length_payer_mobile_no = 20
        if(j.payer_mobile_no.length < length_payer_mobile_no) {
          datax += j.payer_mobile_no
          datax += this.space(j.payer_mobile_no.length, length_payer_mobile_no)
        } else {
          datax += j.payer_mobile_no.substring(0,20)
        }
      }

      if(j.payer_annual_income) {
        let length_payer_annual_income = 10
        if(j.payer_annual_income.length < length_payer_annual_income) {
          datax += j.payer_annual_income
          datax += this.space(j.payer_annual_income.length, length_payer_annual_income)
        } else {
          datax += j.payer_annual_income.substring(0,10)
        }
      }

      if(j.payer_address_email) {
        let length_payer_address_email = 60
        if(j.payer_address_email.length < length_payer_address_email) {
          datax += j.payer_address_email
          datax += this.space(j.payer_address_email.length, length_payer_address_email)
        } else {
          datax += j.payer_address_email.substring(0,60)
        }
      }

      if(j.pay_mode) {
        let length_pay_mode = 1
        if(j.pay_mode.length < length_pay_mode) {
          datax += j.pay_mode
          datax += this.space(j.pay_mode.length, length_pay_mode)
        } else {
          datax += j.pay_mode.substring(0,1)
        }
      }

      if(j.transaction_date) {
        let length_transaction_date = 19
        if(j.transaction_date.length < length_transaction_date) {
          datax += j.transaction_date
          datax += this.space(j.transaction_date.length, length_transaction_date)
        } else {
          datax += j.transaction_date.substring(0,19)
        }
      }

      if(j.cc_type) {
        let length_cc_type = 1
        if(j.cc_type.length < length_cc_type) {
          datax += j.cc_type
          datax += this.space(j.cc_type.length, length_cc_type)
        } else {
          datax += j.cc_type.substring(0,1)
        }
      }
      
      if(j.refferal_agent_code) {
        let length_refferal_agent_code = 9
        if(j.refferal_agent_code.length < length_refferal_agent_code) {
          datax += j.refferal_agent_code
          datax += this.space(j.refferal_agent_code.length, length_refferal_agent_code)
        } else {
          datax += j.refferal_agent_code.substring(0,9)
        }
      } else {
        datax += "         "
      }

      if(j.total_premium) {
        let length_total_premium = 12
        let length_temp = length_total_premium - j.total_premium.length 

        for (let index = 0; index < length_total_premium; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += j.total_premium
        
      }

      if(j.total_sum_assured) {
        let length_total_sum_assured = 15
        let length_temp = length_total_sum_assured - j.total_sum_assured.length 

        for (let index = 0; index < length_total_sum_assured; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += j.total_sum_assured
      }
      
      if(j.credit_card_number) {
        let length_credit_card_number = 16
        if(j.credit_card_number.length < length_credit_card_number) {
          datax += j.credit_card_number
          datax += this.space(j.credit_card_number.length, length_credit_card_number)
        } else {
          datax += j.credit_card_number.substring(0,16)
        }
      }

      if(j.account_holder_name) {
        let length_account_holder_name = 100
        if(j.account_holder_name.length < length_account_holder_name) {
          datax += j.account_holder_name
          datax += this.space(j.account_holder_name.length, length_account_holder_name)
        } else {
          datax += j.account_holder_name.substring(0,100)
        }
      }

      if(j.bank_code) {
        let length_bank_code = 7
        if(j.bank_code.length < length_bank_code) {
          datax += j.bank_code
          datax += this.space(j.bank_code.length, length_bank_code)
        } else {
          datax += j.bank_code.substring(0,7)
        }
      }

      if(j.bank_name) {
        let length_bank_name = 30
        if(j.bank_name.length < length_bank_name) {
          datax += j.bank_name
          datax += this.space(j.bank_name.length, length_bank_name)
        } else {
          datax += j.bank_name.substring(0,30)
        }
      }
      
      if(j.card_issue) {
        let length_card_issue = 1
        if(j.card_issue.length < length_card_issue) {
          datax += j.card_issue
          datax += this.space(j.card_issue.length, length_card_issue)
        } else {
          datax += j.card_issue.toString().substring(0,1)
        }
      }

      if(j.valid_from) {
        let length_valid_from = 4
        if(j.valid_from.length < length_valid_from) {
          datax += j.valid_from
          datax += this.space(j.valid_from.length, length_valid_from)
        } else {
          datax += j.valid_from.substring(0,4)
        }
      } else {
        datax += "    "
      }

      if(j.valid_thru) {
        let length_valid_thru = 4
        if(j.valid_thru.length < length_valid_thru) {
          datax += j.valid_thru
          datax += this.space(j.valid_thru.length, length_valid_thru)
        } else {
          datax += j.valid_thru.substring(0,4)
        }
      }

      if(j.group_id) {
        let length_group_id = 10
        if(j.group_id.length < length_group_id) {
          datax += j.group_id
          datax += this.space(j.group_id.length, length_group_id)
        } else {
          datax += j.group_id.substring(0,10)
        }
      }

      if(j.refferal_commision_percentage) {
        let length_refferal_commision_percentage = 6
        let length_temp = length_refferal_commision_percentage - j.refferal_commision_percentage.length 

        for (let index = 0; index < length_refferal_commision_percentage; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += j.refferal_commision_percentage
      }

      if(j.owner_nationality) {
        let length_owner_nationality = 1
        if(j.owner_nationality.length < length_owner_nationality) {
          datax += j.owner_nationality
          datax += this.space(j.owner_nationality.length, length_owner_nationality)
        } else {
          datax += j.owner_nationality.substring(0,1)
        }
      }

      if(j.payer_nationality) {
        let length_payer_nationality = 1
        if(j.payer_nationality.length < length_payer_nationality) {
          datax += j.payer_nationality
          datax += this.space(j.payer_nationality.length, length_payer_nationality)
        } else {
          datax += j.payer_nationality.substring(0,1)
        }
      }

      if(j.owner_annual_income) {
        let length_owner_annual_income = 10
        if(j.owner_annual_income.length < length_owner_annual_income) {
          datax += j.owner_annual_income
          datax += this.space(j.owner_annual_income.length, length_owner_annual_income)
        } else {
          datax += j.owner_annual_income.substring(0,10)
        }
      }

      if(j.owner_address_email) {
        let length_owner_address_email = 60
        if(j.owner_address_email.length < length_owner_address_email) {
          datax += j.owner_address_email
          datax += this.space(j.owner_address_email.length, length_owner_address_email)
        } else {
          datax += j.owner_address_email.substring(0,60)
        }
      }

      if(j.dispatch_type) {
        let length_dispatch_type = 1
        if(j.dispatch_type.length < length_dispatch_type) {
          datax += j.dispatch_type
          datax += this.space(j.dispatch_type.length, length_dispatch_type)
        } else {
          datax += j.dispatch_type.substring(0,1)
        }
      }

      if(j.distribution_channel) {
        let length_distribution_channel = 1
        if(j.distribution_channel.length < length_distribution_channel) {
          datax += j.distribution_channel
          datax += this.space(j.distribution_channel.length, length_distribution_channel)
        } else {
          datax += j.distribution_channel.substring(0,1)
        }
      }

      if(i < lengthData) {
        datax += "\n"
      }
      
      txt.push(datax)
      datax = ""
    })
    
    let file = new Blob(txt, { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'EXPORT PRODUCTION_1st_' + date_file + '_' + date_file + '_Mst.txt')

    // set to null
    date_file = null
  }

  public filterDate(value: Date): void {
    this.data = moment(value).format('YYYY-MM-DD');

    this.getAllData(this.data);
  }

  public downloadFile() {

    if(this.filter_date.nativeElement.value == null || this.filter_date.nativeElement.value == undefined) {
      alert("Please Choose Selected Date first before Download TXT File")
    }

    if(this.MasterList[0] != undefined) {
      this.downloadMaster()
      this.downloadCoverage()
      this.downloadBenef()
    } else {
      alert('No Transaction with selected Date');
    }
  }

  private space(start, end) {
    let space = ""

    for (let o = start; o < end; o++) {
      space += " "
    }

    return space;
  }
 
  public showChildModal(): void {
    this.childModal.show();
  }
 
  public hideChildModal(): void {
    this.childModal.hide();
  }

}
