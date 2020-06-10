import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

// Library
import * as moment from 'moment';

// Service
import { BookingPolicyService }   from '../insurance/master/booking-policy/booking-policy.service'
import { DashboardService }       from './dashboard.service'

// Helper
import { Rupiah } from '../../shared/helper/rupiah'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BookingPolicyService, DashboardService]
})
export class DashboardComponent implements OnInit {

  constructor(private bookingPolicyService : BookingPolicyService,
              private dashboardService : DashboardService) { }

  ngOnInit() {
    this.initData()
  }

  /** START VALUE */

  date = moment(new Date()).format('YYYY-MM-DD');

  AmountBookingEpolicy  : number                                            = 0
  EpolicyDelivery       : { Failed : String, Success : String }             = null;
  Cta                   : { total : String }                                = null;
  MemberGetMember       : { total : String }                                = null;
  Transaction           : { total : String }                                = null;
  Amount                                                                    = null;
  /** END VALUE */

  public initData() {
    // this.loadVisitor()

    // Daily Report Daily Epolicy Delivery
    this.dashboardService.getEpolicyDeliveryStatusToday(this.date).subscribe((data) => {
      this.EpolicyDelivery = data[0]
    })

    // Daily Report Cta
    this.dashboardService.getCtaStatusToday(this.date).subscribe((data) => {
      this.Cta = data
    })

    // Daily Member get Member
    this.dashboardService.getMgmCountToday().subscribe((data) => {
      this.MemberGetMember = data
    })

    // Daily Transaction
    this.dashboardService.getTransactionToday().subscribe((data) => {
      this.Transaction = data
    })

    // Daily Amount Today
    this.dashboardService.getAmountToday(this.date).subscribe((data) => {
      this.Amount = Rupiah(data.amount)
    })

    // amount booking policy
    const booking = this.bookingPolicyService.amountBookingEpolicy().toPromise()
    booking.then((data) => {
      this.AmountBookingEpolicy = data.count
    })

  }

  public loadVisitor() {

  }



}
