// Core
import { Injectable }               from '@angular/core';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Model
import { Visitor } from './visitor'
import { HttpClient, HttpParams }  from '@angular/common/http';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private apiService        : ApiService,
              private _http             : HttpClient) { }

  httpGetClient(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

  getDataClient(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
  }

  
  saveVisitor(data): Observable<Visitor>{
    
    let visitor = {
      "ip_address"	  : data.ip_address,
      "browser"		    : data.browser.browser,
      "device"		    : data.device,
      "os"		        : data.browser.os,
      "other_data"	  : JSON.stringify(data.data)
    }

    return this.apiService.post("/visitor", visitor)
                    .pipe(map(data => data))
  }

  getVisitorById(id): Observable<Visitor> {
    return this.apiService.get("/visitor/", id)
                .pipe(map(data => data))

  }

}
