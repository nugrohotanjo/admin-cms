// Core
import { Component, OnInit }                  from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute  }            from '@angular/router';

// Service
import { EventCategoryService }               from './event-category.service'

// SharedService
import { SweetalertService }                  from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-event-category-edit',
  templateUrl: './pages/event-category-edit.component.html',
  styleUrls: ['./pages/event-category-edit.component.css']
})
export class EventCategoryEditComponent implements OnInit {

  editCategoryEvent : FormGroup;

  constructor(  private fb                    : FormBuilder,
                private route                 : ActivatedRoute,
                private router                : Router,
                private eventCategoryService  : EventCategoryService,
                private sweetalertService     : SweetalertService ) 
  {
    this.createForm()
    this.initValue()
  }
 
  ngOnInit() {
  }

  public updateCategoryEvent(){
    this.route.params.subscribe(params => {
          return this.eventCategoryService.updateCategoryEvent(params['id'], this.editCategoryEvent.value)
                                .subscribe(() => {
                                    this.sweetalertService.yourWorkHasBeenSaved('Category Event Has Been Updated')
                                    this.router.navigate(['/management/event/category'])
                                  });
                  });
  }

  private createForm(){
    this.editCategoryEvent = this.fb.group({
      id                        : ['',[Validators.required]],
      name                      : ['', [Validators.required, Validators.minLength(4)]],
      description               : ['',[Validators.required]]
    });
  }

  private initValue(){
    this.route.params.subscribe(params => {
      return this.eventCategoryService.getCategoryEventById(params['id'])
                  .subscribe((data) => {
                    this.editCategoryEvent.setValue({
                        id: data.id,
                        name: data.name,
                        description: data.description,
                      });
                  })
    })
  }

  get name(){
    return this.editCategoryEvent.get('name')
  }

  get description(){
    return this.editCategoryEvent.get('description')
  }

}
