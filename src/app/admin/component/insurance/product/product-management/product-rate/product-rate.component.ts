import { Component, OnInit, ChangeDetectorRef }                          from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { Router, ActivatedRoute} from '@angular/router';

// Environtment
import { environment }                                from 'src/environments/environment';

import { BenefitLevelService } from '../../../master/benefit-level-management/benefit-level.service'

import * as _ from 'lodash'
import Swal                                          from 'sweetalert2/dist/sweetalert2.js';

// Service
import { ProductRateService }                         from './product-rate.service'
import { MasterFormulaService }                       from '../../../master/master-formula/master-formula.service'
import { CampaignService }                            from '../../../../campaign-management/campaign.service'
import { ModalFactorService }                         from '../../../master/modal-factor-management/modal-factor.service'
import { MasterSetupRateService }                     from '../../../master/master-setup-rate/master-setup-rate.service'

// library
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product-rate',
  templateUrl: './product-rate.component.html',
  styleUrls: ['./product-rate.component.css']
})
export class ProductRateComponent implements OnInit {

  /* Excel Data Start */
  data              = [];
  templateData      = []

  fileName          : string = 'product_rate.xlsx';
  /* Excel Data End */

  // Variable Buat Dynamic Table
  thead   = []
  tcol    = []
  tdata   = []

  loadDynamicForm = null;

  // Variable Tambahan Harus di load
  ListModalFactor         = []
  ListBenefitLevel        = []
  ListFormula             = []
  // ListPromo               = []
  ListMasterRate          = []
  ListRateParam : any     = []

  ProductRate             : FormGroup
  prefix                  : String = environment.prefix
  productRateComponent    = null;

  Product       = null;

  ChooseFormula = null;

  // get the type from parameters
  Type          : String = this.route.snapshot.paramMap.get('type');

  // get the category from parameters
  Category_id   : String = this.route.snapshot.paramMap.get('category');

  // get product id from parameters
  ProductId     : String  = this.route.snapshot.paramMap.get("product_id")
  
  constructor(  private route                   : ActivatedRoute,
                private router                  : Router,
                private fb                      : FormBuilder,
                private productRateService      : ProductRateService,
                private masterFormulaService    : MasterFormulaService,
                private campaignService         : CampaignService,
                private cd                      : ChangeDetectorRef,
                private modalFactorService      : ModalFactorService,
                private masterSetupRateService  : MasterSetupRateService,
                private benefitLevelService     : BenefitLevelService) { }

  ngOnInit() {
    this.createForm()

    // Set Initial Value first
    this.initValue()
  }

  protected createForm(){
    this.ProductRate = this.fb.group({
        id            : [''],
        formula       : [''],
        fields        : this.fb.array([])
    }) // End fb Group
  }

  private initValue () {

    // Init Formula
    this.masterFormulaService.getAll()
            .subscribe(data => this.ListFormula = data )

    // Init Master rate
    const k = this.masterSetupRateService.getMasterRateByCategory(this.Category_id)
                                                  .toPromise()
    k.then((data) => {
        // Set data to List
        this.ListMasterRate = data
    })

    // Init Product Rate
    const product = this.productRateService.getRateById(this.ProductId).toPromise()

    // Binding Rate Data
    product.then((data) => {
      this.Product = data

      if(data[0] != undefined) {
        this.ProductRate.patchValue({
          id              : data[0].id ? data[0].id : null,
          formula         : data[0].formula_id ? data[0].formula_id.id : null
        })
      }
      
    })

    // Get Rate Param Data And Binding
    product.then((data) => {
      
      if(data[0] != undefined) {
        this.productRateService.getRateParamByRateId(data[0].id)
          .subscribe((x) => {
            this.ListRateParam = x
            // Bikin Kerangkanya dahulu & check kalo gak ada datanya buat loadtablerate sekali aja
            if(this.ListRateParam[0] != undefined) {

              this.ListRateParam.map(() => {
                this.loadTableRate()
              })

              // Setelah terbuat kerangkanya, kita isi datanya
              let tempRateValue = null;
              let dataParse     = null;
              this.fieldsForm.controls.map((data, index) => {
                tempRateValue = this.ListRateParam[index] // Take over dlu datanya ke variable baru
                dataParse     = JSON.parse(tempRateValue.param_value) // Parse datanya, karena ini String Json dari DB, di jadiin json lagi
                // console.log(dataParse)
                data.patchValue(dataParse.formula) 
                
                // End Patch Value
              }) // End FieldsForm Mapping

              // Buat Template Excelnya
              this.makeTemplateExcel()

            } else {
              this.loadTableRate()
            }
            
          })
      }
      else {
        this.loadTableRate()
        this.makeTemplateExcel() // Buat Template Excelnya
      } 

    })

    // ------------------------------------------------------------------ //

    // Init Benefit Level
    this.benefitLevelService.getAll()
            .subscribe(data => this.ListBenefitLevel = data)

    // Init Benefit Level
    this.modalFactorService.getAll()
            .subscribe(data => this.ListModalFactor = data)
            
    this.cd.detectChanges();
  }

  public saveRate() {
    const save = this.productRateService.saveProductRate(this.ProductRate.value, this.ProductId).toPromise()

    save.then((data) => {
      if(data.id != undefined || data.id != null) {
        
        // Delete first all of data in table param
        this.productRateService.deleteAllRateParam(data.id)
                .subscribe(() => {
                  const param_service = this.productRateService.saveProductRateParam(this.fields.value,data.id).toPromise()

                  param_service.then(() => {

                      // Navigate to Third step
                      this.router.navigate([
                        this.prefix + '/product/add/modalfactor/' + 
                        this.Type + '/' + 
                        this.Category_id + '/' + 
                        this.ProductId])
                     // end else
                     
                  })
                }) // End Delete
      } // End if validate data.id
    })
  }

  protected loadTableRate() {

    this.tdata          = [];

    let list_data       = null;
    let label_s      : any = [];
    let label_k   : any = [];

    this.thead = null; // Bersihin dahulu sebelum di set nilai defaultnya
    this.thead = [
      {"label" : "Age"},
      {"label" : "Value"},
      {"label" : "Start Date"},
      {"label" : "End Date"}
    ]

    this.tcol = null; // Bersihin dahulu sebelum di set nilai defaultnya
    this.tcol = [
      {"type" : "number", "label" : "age", "label_name" : "age"},
      {"type" : "number", "label" : "value", "label_name" : "value"},
      {"type" : "date", "label" : "start_date", "label_name" : "start_date"},
      {"type" : "date", "label" : "end_date", "label_name" : "end_date"}
    ]

      for (let i = this.ListMasterRate.length - 1; i >= 0 ; i--) {
        list_data = this.ListMasterRate[i]
        
        switch (list_data.parameter_type) {
          case "from_data":
              if(list_data.value === 'benefit_level') {
                label_s        = {"label" : list_data.parameter_name}
                label_k     = {"type"   : "select", "label" : "benefit_level", "label_name" : list_data.parameter_name.replace(/\s+/g, '_').toLowerCase()}
  
                this.thead.splice(1, 0, label_s)
                this.tcol.splice(1, 0, label_k)
              }
  
              if(list_data.value === 'modal_factor') {
                label_s        = {"label" : list_data.parameter_name}
                label_k     = {"type"   : "select", "label" : "modal_factor", "label_name" : list_data.parameter_name.replace(/\s+/g, '_').toLowerCase()}
  
                this.thead.splice(1, 0, label_s)
                this.tcol.splice(1, 0, label_k)
              }
            break;
  
          case "text":
              label_s        = {"label" : list_data.parameter_name}
              label_k     = {"type"   : "text", "label" : "text", "label_name" : list_data.parameter_name.replace(/\s+/g, '_').toLowerCase()}
  
              this.tcol.splice(1, 0, label_k)
              this.thead.splice(1, 0, label_s)
            break;
  
          case "multiple_choice":
              label_s        = {"label" : list_data.parameter_name}
              label_k     = {"type"   : "select", "label" : "multiple_choice", "value" : list_data.value.split(","), "label_name" : list_data.parameter_name.replace(/\s+/g, '_').toLowerCase()}
  
              this.tcol.splice(1, 0, label_k)
              this.thead.splice(1, 0, label_s)
            break;
  
          case "number":
                label_s        = {"label" : list_data.parameter_name}
                label_k     = {"type"   : "number", "label" : "number", "label_name" : list_data.parameter_name.replace(/\s+/g, '_').toLowerCase()}
    
                this.tcol.splice(1, 0, label_k)
                this.thead.splice(1, 0, label_s)
              
            break;
  
          case "yes_or_no":
              label_s        = {"label" : list_data.parameter_name}
              label_k     = {"type"   : "select", "label" : "yes_or_no", "label_name" : list_data.parameter_name.replace(/\s+/g, '_').toLowerCase()}
  
              this.tcol.splice(1, 0, label_k)
              this.thead.splice(1, 0, label_s)
            break;
        
          default:
            break;
        }
      }
    

    let z = [];
    this.tcol.map((d,i)=> {
      z[d.label_name] = ['']
    })
    
    // Push 1 Row
    this.fieldsForm.push(this.fb.group( z ) );

    // Push binding data
    this.tdata.push(this.tcol)
  }

  public tambahRow() {
    this.loadTableRate()
  }

  public removeRow() {
    let i = this.t.length
    this.fieldsForm.removeAt(i - 1);
  }

  get formula(){
    return this.ProductRate.get('formula')
  }

  private makeTemplateExcel() {
    let title     = []
    this.tdata[0].map((x) => {
      title.push(x.label_name)
    })
    this.templateData.push(title)
  }

  // ala verga
  get f() { return this.ProductRate.controls; }
  get t() { return this.f.fields as FormArray; }
  get fields() { return this.ProductRate.get('fields') }
  get fieldsForm() { return this.ProductRate.get('fields') as FormArray }

  public export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateData);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
  }

  public onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.loadData(this.data)
    }
    reader.readAsBinaryString(target.files[0]);
  }

  private loadData(data) {
    // Reset dlu rownya kalau dia pertama kali untuk di timpah datanya dari excel
    if(this.fieldsForm.length === 0) {
      this.fieldsForm.removeAt(0) // remove row indexnya 0 kalau step ini belum ada datanya dari database / table ratenya masih fresh
    }

    // set nilai awal banyak row ratenya ada berapa sebelum ditambah excel
    let nilai_awal = this.fieldsForm.length
    
    // Mapping dlu data dari excelnya
    let raw_data  = [] // siapin variable array untuk di taro apa aja datanya yang dari excel
    let head      = [] // siapin variable untuk heading data dari excelnya

    data.map((x,i) => {
      if(i >= 1) {
        var jsonObj = {}; // sediain kerangka jsonnya

        for (var ku = 0; ku < x.length; ku++) {
          jsonObj[head[0][ku]] = x[ku] != undefined ? (Number.isInteger(x[ku])) ? x[ku] : x[ku].toLowerCase() : 'unrelated'; // Validasi kalau dari excel datanya gak ada, jadiin unrelated
        }
        
        raw_data.push(jsonObj) // mapping data dari excel ke variable raw_data
        this.tambahRow() // tambah 1 row di form control untuk variable raw_data
      } else {
        head.push(x) // Ini untuk push heading data dari excelnya
      }
    })
    // End Mapping Data

    // Tempel datanya ke formnya
    let tempRateValue   = null // sediain variable penampung tiap json yang akan di compare lalu di binding ke form control 
    let status          = false // sediain variable untuk kalau ada data json yang sama
    this.fieldsForm.controls.map((data, index) => {
      
      if(index >= nilai_awal) {
        tempRateValue = raw_data[index - nilai_awal] // Dimulai dari nilai index form control yang udah ada

        let a       = this.ProductRate.value.fields // taruh di variable dulu datanya
        
        a.some(x => {
          let json_awal = JSON.stringify(x) // Jadiin string dulu data yang udah ada per row
          let json_baru = JSON.stringify(tempRateValue) // jadiin string dulu data yang dari excel per row

          if(_.isEqual(json_awal, json_baru)) { // makek lodash untuk compare json yang kembar

            let o = "" // buat variable untuk html li

            // Buat html untuk di notification swal nya
            for (var key in tempRateValue) {
                var value = tempRateValue[key];
                o += "<li><span>" + key + "</span> - <span> " + value + " </span></li>"
            }

            for (let index = this.fieldsForm.length; index > nilai_awal; index--) {
              // balikin lagi rownya yang udah di tambahin dari script mapping data diatas
              this.fieldsForm.removeAt(nilai_awal) 
              status = true
            }
            
            // Kasih notif kalau datanya dari excel udah ada di table
            if(status) {
              Swal.fire({
                type: 'error',
                title: 'This data already Exist in Table!',
                html: o 
              })
            }
            
          } else {
            data.patchValue(tempRateValue) // Setup data yang dynamic
          }
        }) // end check data yang kembar
      } // End set mulai index
      
    }) // End Tempel Data formnya
      
  }
}
