// Core
import { Injectable }               from '@angular/core';

// Model
import { ProductCategory }                  from './product-category';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// SharedPipe
import { SlugifyPipe }              from '../../../../shared/pipe/slugify.pipe'; 

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private apiService        : ApiService,
              private slugifyPipe       : SlugifyPipe) { }

  getAll(){
    return this.apiService.get("/category")
                  .pipe(map(data => data));
  }

  saveCategory(data): Observable<ProductCategory>{

    let category = {
      "id"              : data.id,
      "category_name"   : data.name,
      "category_slug"   : this.slugifyPipe.transform(data.name),
    }
    
    if(category.id){
      return this.apiService.put("/category/" + category.id , category)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/category", category)
                    .pipe(map(data => data));
    }
    
  }

  getCategoryById(id: string): Observable<ProductCategory>{
    return this.apiService.get("/category/" + id)
                .pipe(map(data => data));
  }

  destroyCategory(id: string): Observable<ProductCategory>{
    return this.apiService.delete("/category/" + id)
                .pipe(map(data => data));
  }
}
