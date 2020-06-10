// Core
import { Injectable }               from '@angular/core';

// Model
import { Setting }                     from './setting';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private apiService        : ApiService) { }

  saveSetting(data): Observable<Setting>{
    
    let data_json =  {
        "site_name"               : data.site_name,
        "site_description"        : data.site_description,
        "logo"                    : data.logo,
        "logo_transparent"        : data.logo_transparent,
        "favicon"                 : data.favicon,
        "google_analytic"         : data.google_analytic,
        "copmany_name"            : data.copmany_name,
        "company_phone"           : data.company_phone,
        "company_fax"             : data.company_fax,
        "company_email"           : data.company_email,
        "company_whatsapp"        : data.company_whatsapp,
        "company_address"         : data.company_address,
        "company_description"     : data.company_description,
        "facebook_url"            : data.facebook_url,
        "twitter_url"             : data.twitter_url,
        "youtube_url"             : data.youtube_url,
        "instagram_url"           : data.instagram_url,
        "meta_description"        : data.meta_description,
        "meta_keyword"            : data.meta_keyword,
    }
    
    let setting = {
      "elementId"            : 0,
      "value"                 : JSON.stringify(data_json)
    }

    return this.apiService.put("/setting/0", setting)
                    .pipe(map(data => data));
  }

  getSettingById(id: string): Observable<Setting>{
    return this.apiService.get("/setting/" + id)
                .pipe(map(data => data));
  }
}
