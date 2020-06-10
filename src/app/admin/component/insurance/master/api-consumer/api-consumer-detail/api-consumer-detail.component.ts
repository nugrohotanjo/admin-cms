import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute }                   from "@angular/router";

// service
import { ApiConsumerService } from '../api-consumer.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

// Model
import { ApiConsumer } from '../api-consumer';

@Component({
  selector: 'app-api-consumer-detail',
  templateUrl: './api-consumer-detail.component.html',
  styleUrls: ['./api-consumer-detail.component.css']
})
export class ApiConsumerDetailComponent implements OnInit {

  constructor(private apiConsumerService : ApiConsumerService,
              private route                 : ActivatedRoute,) { }

  ngOnInit() {
    this.loadData();
  }

    //--------------------- VARIABLE START ---------------------//

    @ViewChild('jwt') jwt: ElementRef;

    dataUrl                                 : String  = environment.api_url
    prefix                                  : String  = environment.prefix

    buttonText                      = "Copy Token"
  
    ApiConsumerDetail : ApiConsumer = null
    IntervalCopy
    //--------------------- VARIABLE END   ---------------------//

  private loadData() {
    this.route.params.subscribe(params => {
        this.apiConsumerService.getApiConsumerById(params['id']).subscribe((data) => {
          this.ApiConsumerDetail = data
        })
    })
  }

  public copyJwt(){
    this.jwt.nativeElement.select();
    document.execCommand('copy');
    this.jwt.nativeElement.setSelectionRange(0, 0);
    this.buttonText = "Copied"

    this.IntervalCopy = setInterval(() => {
      this.buttonText = "Copy Token"
      clearInterval(this.IntervalCopy);
    }, 2500);

    
  }

}
