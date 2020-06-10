import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'Summernote',      src: `${environment.assets_url}assets/modules/summernote/summernote-bs4.js` },
  { name: 'ViewPortChecker',      src: `${environment.assets_url}assets/front/dist/js/modules/viewportchecker/jquery.viewportchecker.min.js` },
  { name: 'Parallax',             src: `${environment.assets_url}assets/front/dist/js/modules/parallax.js-1.5.0/parallax.min.js` },
  { name: 'Mains',                src: `${environment.assets_url}assets/front/dist/js/mains.js` },
  { name: 'OwlCarousel',          src: `${environment.assets_url}assets/front/dist/js/modules/OwlCarousel2-2.3.4/dist/owl.carousel.min.js` },
  { name: 'Popper',               src: `${environment.assets_url}assets/modules/popper.js` },
  { name: 'Tooltip',              src: `${environment.assets_url}assets/modules/tooltip.js` },
  { name: 'Bootstrap',            src: `${environment.assets_url}assets/modules/bootstrap/js/bootstrap.min.js` },
  { name: 'Nicescroll',           src: `${environment.assets_url}assets/modules/nicescroll/jquery.nicescroll.min.js` },
  { name: 'Moment',               src: `${environment.assets_url}assets/modules/moment.min.js` },
  { name: 'Stisla',               src: `${environment.assets_url}assets/js/stisla.js` },
  { name: 'Scripts',              src: `${environment.assets_url}assets/js/scripts.js` },
  { name: 'Select2',              src: `${environment.assets_url}assets/modules/select2/dist/js/select2.full.min.js` },
  { name: 'DataTablesJpa',        src: `${environment.assets_url}assets/modules/datatables/datatables.jquery.js` },
  { name: 'DataTables',           src: `${environment.assets_url}assets/modules/datatables/datatables.min.js` },
  { name: 'DateRangePicker',      src: `${environment.assets_url}assets/modules/bootstrap-daterangepicker/daterangepicker.js` }
];

declare var document: any;

@Injectable()

export class DynamicScriptLoaderService {

  private scripts: any = {};

  constructor() {

    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });

   }

   load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  
}
