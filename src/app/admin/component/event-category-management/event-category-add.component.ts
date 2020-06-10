// Core
import { Component, OnInit }                  from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router }                               from "@angular/router";

// Service
import { EventCategoryService }               from './event-category.service'

// SharedService
import { SweetalertService }                  from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-event-category-add',
  templateUrl: './pages/event-category-add.component.html',
  styleUrls: ['./pages/event-category-add.component.css'],
  providers: [EventCategoryService]
})
export class EventCategoryAddComponent implements OnInit {

  addCategoryEvent : FormGroup;

  constructor(  private fb                    : FormBuilder,
                private eventCategoryService  : EventCategoryService,
                private router                : Router,
                private sweetalertService     : SweetalertService,) 
  { 
    this.createForm()
  }

  ngOnInit() {
  }


  public createCategoryEvent(){
    return this.eventCategoryService.saveCategoryEvent(this.addCategoryEvent.value)
                                        .subscribe(() => {
                                          this.sweetalertService.yourWorkHasBeenSaved('Category Event Has Been Save')
                                          this.router.navigate(['/management/event/category'])
                                        });
  }

  private createForm(){
    this.addCategoryEvent = this.fb.group({
      name                      : ['', [Validators.required, Validators.minLength(4)]],
      description               : ['',[Validators.required]]
    });
  }

  get name(){
    return this.addCategoryEvent.get('name')
  }

  get description(){
    return this.addCategoryEvent.get('description')
  }

}
