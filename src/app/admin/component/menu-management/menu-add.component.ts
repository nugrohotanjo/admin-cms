// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from "@angular/router";

// Environtment
import { environment }                          from 'src/environments/environment';

// Service
import { MenuService }                          from './menu.service';

// SharedService
import { SweetalertService }                    from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-menu-add',
  templateUrl: './pages/menu-add.component.html',
  styleUrls: ['./pages/menu-add.component.css'],
  providers: [MenuService, SweetalertService]
})
export class MenuAddComponent implements OnInit {

  addMenu             : FormGroup;
  prefix              : String = environment.prefix

  constructor(  private fb                : FormBuilder, 
                private menuService       : MenuService, 
                private router            : Router,
                private sweetalertService : SweetalertService, ) 
  {
    this.createForm()
  }

  ngOnInit() {
  }

  public createMenu(){
    this.menuService.saveMenu(this.addMenu.value)
                      .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Menu Has Been Save')
                          this.router.navigate([this.prefix + '/menu'])
                      });
  }

  private createForm(){
    this.addMenu = this.fb.group({
      name                      : ['', [Validators.required]],
      type                      : ['',[Validators.required]],
      link                      : ['',[Validators.required]],
    });
  }

  get name(){
    return this.addMenu.get('name')
  }

  get type(){
    return this.addMenu.get('type')
  }

  get link(){
    return this.addMenu.get('link')
  }

}
