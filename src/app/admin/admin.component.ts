import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService }                             from './shared/service/dynamic-script.service';

// import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // url = environment.assets_url

  constructor(private dynamicScriptLoader           : DynamicScriptLoaderService,) { }

  ngOnInit() {
    this.loadScripts();
  }

  private loadScripts(){
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('Popper','Tooltip','Bootstrap','Nicescroll','Stisla','Scripts').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

}