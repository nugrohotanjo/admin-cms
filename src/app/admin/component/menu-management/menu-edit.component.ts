// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute }               from "@angular/router";

// Environtment
import { environment }                          from 'src/environments/environment';

// Service
import { MenuService }                          from './menu.service';

// SharedService
import { SweetalertService }                    from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './pages/menu-edit.component.html',
  styleUrls: ['./pages/menu-edit.component.css'],
  providers: [MenuService, SweetalertService]
})
export class MenuEditComponent implements OnInit {

  editMenu              : FormGroup;
  prefix                : String = environment.prefix

  constructor(  private fb                : FormBuilder, 
                private menuService       : MenuService, 
                private route             : ActivatedRoute,
                private router            : Router,
                private sweetalertService : SweetalertService, ) 
  
  {
    this.createForm()
    this.initValue()
  }

  ngOnInit() {
  }

  public updateMenu(){
    this.route.params.subscribe(params => {
      return this.menuService.updateMenu(params['id'], this.editMenu.value)
                    .subscribe(() => {
                        this.sweetalertService.yourWorkHasBeenSaved('Menu Has Been Updated')
                        this.router.navigate([this.prefix + '/menu'])
                      });
    });
  }

  private initValue(){
    this.route.params.subscribe(params => {
      return this.menuService.getMenuById(params['id'])
                  .subscribe((data) => {
                    this.editMenu.setValue({
                        name: data.name,
                        link: data.link,
                        type: data.type,
                      });
                  })
    })
  }

  private createForm(){
    this.editMenu = this.fb.group({
      name                      : ['', [Validators.required]],
      link                      : ['',[Validators.required]],
      type                      : ['',[Validators.required]],
    });
  }

  get name(){
    return this.editMenu.get('name')
  }

  get type(){
    return this.editMenu.get('type')
  }

  get link(){
    return this.editMenu.get('link')
  }

}
