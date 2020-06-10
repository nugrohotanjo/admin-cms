import { Component, OnInit, OnDestroy } from '@angular/core';

// Service
import { VisitorService } from '../visitor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitor-detail',
  templateUrl: './visitor-detail.component.html',
  styleUrls: ['./visitor-detail.component.css']
})
export class VisitorDetailComponent implements OnInit, OnDestroy {

  // get visitor id from parameters
  id     : String  = this.route.snapshot.paramMap.get("id")

  constructor(  private visitorService      : VisitorService,
                private router              : Router,
                private route               : ActivatedRoute,) { }

  ngOnInit() {
    this.initData()
  }

  private initData() {
    
    const visitor = this.visitorService.getVisitorById(this.id).subscribe((data) => {
      console.log(data)
    }).unsubscribe()


  }

  ngOnDestroy() {
    
  }

}
