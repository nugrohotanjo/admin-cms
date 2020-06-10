import { Injectable } from '@angular/core';

// Model
import { Campaign }                     from './campaign';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get("/promo")
                          .pipe(map(data => data));
  }

  saveCampaign(data,date): Observable<Campaign>{
    
    let start_date  = moment(date[0]).format('YYYY-MM-DD')
    let end_date    = moment(date[2]).format('YYYY-MM-DD')

    let campaign = {
      "id"          : data.id,
      "promo_name"  : data.promo_name,
      "promo_code"  : data.promo_code,
      "promo_type"  : data.type,
      "promo_value" : data.value,
      "start_date"  : start_date,
      "end_date"    : end_date,
    }
    
    if(campaign.id){
      return this.apiService.put("/promo/" + campaign.id , campaign)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/promo", campaign)
                    .pipe(map(data => data));
    }
    
  }

  getCampaignById(id: string): Observable<Campaign>{
    return this.apiService.get("/promo/" + id)
                .pipe(map(data => data));
  }

  destroyCampaign(id: string): Observable<Campaign>{
    return this.apiService.delete("/promo/" + id)
                .pipe(map(data => data));
  }

}
