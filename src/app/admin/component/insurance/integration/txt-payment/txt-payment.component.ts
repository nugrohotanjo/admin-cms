import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Environtment
import { environment }                        from 'src/environments/environment';

// library
import { saveAs } from 'file-saver';
import * as moment from 'moment';

// Service
import { TxtPaymentService } from './txt-payment.service'

@Component({
  selector: 'app-txt-payment',
  templateUrl: './txt-payment.component.html',
  styleUrls: ['./txt-payment.component.css']
})
export class TxtPaymentComponent implements OnInit {

  constructor(private txtPaymentService : TxtPaymentService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
  }

  @ViewChild('filter_date') filter_date: ElementRef;

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  maxDate           : Date;
  data              = null;

  // variable penampung
  BillingList      = []

  async getAllData(date) {
    await this.loadDataBillingPayment(date) 
  }

  private loadDataBillingPayment(param : String) {
    this.txtPaymentService.getTxtPayment(param)
                                        .subscribe((data) => {
                                          this.BillingList = data;
                                          console.log(this.BillingList)
                                        })
  }

  public filterDate(value: Date): void {
    this.data = moment(value).format('YYYY-MM-DD');

    this.getAllData(this.data);
  }

  public downloadFile() {

    // buat dummy
    // this.BillingList = [
    //   { currency : "IDR    ",  policy_number : "2098123123", transaction_collection_date : "20191006    ", amount : "120000.00", createdAt : "2019-12-15"},
    //   { currency : "IDR    ",  policy_number : "2098123123", transaction_collection_date : "20191006    ", amount : "120000.00", createdAt : "2019-12-15"},
    //   { currency : "IDR    ",  policy_number : "2098123123", transaction_collection_date : "20191006    ", amount : "120000.00", createdAt : "2019-12-15"},
    //   { currency : "IDR    ",  policy_number : "2098123123", transaction_collection_date : "20191006    ", amount : "120000.00", createdAt : "2019-12-15"},
    //   { currency : "IDR    ",  policy_number : "2098123123", transaction_collection_date : "20191006    ", amount : "120000.00", createdAt : "2019-12-15"},
    // ]
  
    let filter_datanya = this.filter_date.nativeElement.value;
    if(filter_datanya == null || filter_datanya == undefined || filter_datanya == "" || filter_datanya == " ") {
      alert("Please Choose Selected Date first before Download TXT File")
      return false;
    }

    if(this.BillingList[0] != undefined) {
      this.downloadTxtPayment()
    } else {
      alert('No Transaction with selected Date');
    }
  }

  public downloadTxtPayment() {
    let datax       = ""
    let txt         = []
    let lengthData  = this.BillingList.length - 1
    let date_file   = moment(this.BillingList[0].createdAt).format('YYYY-MM-DD')

    this.BillingList.map((j,i) => {

      // Currency
      if(j.currency) {
        let length_currency = 3
        if(j.currency.length < length_currency) {
          datax += j.currency
          datax += this.space(j.currency.length, length_currency)
        } else {
          datax += j.currency.substring(0,3)
        }
      }

      // Policy Number
      if(j.policy_number) {
        let length_policy_number = 10
        if(j.policy_number.length < length_policy_number) {
          datax += j.policy_number
          datax += this.space(j.policy_number.length, length_policy_number)
        } else {
          datax += j.policy_number.substring(0,10)
        }
      }

      // Transaction Date
      if(j.transaction_collection_date) {
        let length_transaction_collection_date = 8
        if(j.transaction_collection_date.length < length_transaction_collection_date) {
          datax += j.transaction_collection_date
          datax += this.space(j.transaction_collection_date.length, length_transaction_collection_date)
        } else {
          datax += j.transaction_collection_date.substring(0,8)
        }
      }

      // Amount
      if(j.amount) {
        let length_amount = 15
        let length_temp = length_amount - j.amount.length 

        for (let index = 0; index < length_amount; index++) {
          if(index < length_temp) {
            datax += " "
          }
        }
        datax += j.amount
        
      }

      if(i < lengthData) {
        datax += "\n"
      }

      txt.push(datax)
      datax = ""
      
    }) // end mapping billing

    let file = new Blob(txt, { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'ECOMMERCE_CollectionRN_' + date_file + '.txt')

    // set to null
    date_file = null

  }

  private space(start, end) {
    let space = ""

    for (let o = start; o < end; o++) {
      space += " "
    }

    return space;
  }

  

}
