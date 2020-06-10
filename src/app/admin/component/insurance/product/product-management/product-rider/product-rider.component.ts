import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }                               from "@angular/router";
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';

// Environtment
import { environment }   from 'src/environments/environment';

// Model
import { ProductRider } from './product-rider'

// Service
import { ProductRiderService } from './product-rider.service'

@Component({
  selector: 'app-product-rider',
  templateUrl: './product-rider.component.html',
  styleUrls: ['./product-rider.component.css']
})
export class ProductRiderComponent implements OnInit {

  addRiderForm            : FormGroup;
  ListRiderData           : ProductRider[]
  prefix                  : String = environment.prefix
  tempRider               : any = []
  rider_data              : any = []

  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category_id  : String = this.route.snapshot.paramMap.get('category');
  // get product name from parameters
  Id      : String = this.route.snapshot.paramMap.get("product_id")

  constructor(  private productRiderService     : ProductRiderService,
                private router                  : Router,
                private fb                      : FormBuilder,
                private route                   : ActivatedRoute,) { }

  ngOnInit() {
    this.createForm()

    // Init data
    this.initData()
  }

  private createForm() {
    this.addRiderForm = this.fb.group({
          riders : ['']
    })
  }

  public saveRider() {
    this.productRiderService.destroyAllRiderByProductId(this.Id)
                .subscribe(() => {
                  this.productRiderService.saveProductRider(this.addRiderForm.value,this.Id)
                }) // End Delete
                
    // Navigate to Five step
    this.router.navigate([
      this.prefix + '/product/add/parameterize/' + 
      this.Type + '/' + 
      this.Category_id + '/' + 
      this.Id])
  }

  private initData() {
    this.productRiderService.getAllProductRider()
                .subscribe(data => this.ListRiderData = data)

    // Init Paramater
    const rider = this.productRiderService.getRiderByProductId(this.Id).toPromise()

    rider.then((data) => {
      this.tempRider = data

      this.tempRider.map((x) => {
        this.rider_data.push(x.rider_id)
      })
    })

    rider.then(() => {
      this.addRiderForm.patchValue({
        riders : this.rider_data
      })
    })
  }

}
