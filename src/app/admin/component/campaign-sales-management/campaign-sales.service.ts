import { Injectable } from '@angular/core';

// Model
import { CampaignSales }                     from './campaign-sales';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CampaignSalesService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get("/campaign-sales")
                          .pipe(map(data => data));
  }

  saveCampaignSales(data): Observable<CampaignSales>{

    
    let sales = {
      "id"                          : data.id,
      "sales_name"                  : data.sales_name,
      "promo_code"                  : data.promo_code,
      "status"                      : data.status,
      "description"                 : data.description,
      "promotion" : {
          "id" : data.promotion
      }
    }
    
    if(sales.id) {
      return this.apiService.put("/promo-sales/" + sales.id , sales)
                    .pipe(map(data => data));
    } else {
      return this.apiService.post("/promo-sales", sales)
                    .pipe(map(data => data));
    }
  }

  getCampaignSalesById(id: string): Observable<CampaignSales>{
    return this.apiService.get("/promo-sales/" + id)
                .pipe(map(data => data));
  }

  destroyCampaignSales(id: string): Observable<CampaignSales>{
    return this.apiService.delete("/promo-sales/" + id)
                .pipe(map(data => data));
  }

}
