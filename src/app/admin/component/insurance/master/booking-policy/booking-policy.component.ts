import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';



// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import * as XLSX from 'xlsx';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { BookingPolicyService } from './booking-policy.service'

@Component({
  selector: 'app-booking-policy',
  templateUrl: './booking-policy.component.html',
  styleUrls: ['./booking-policy.component.css']
})
export class BookingPolicyComponent implements OnInit {

  bookingPolicyForm : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  data              = [];
  templateData      = [ ["core_booking_policy_number","core_booking_policy_status","agent_code"], [] ]
	wopts             : XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName          : string = 'booking_epolicy.xlsx';

  constructor(  private router              : Router,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone,
                private fb                  : FormBuilder,
                private bookingPolicyService : BookingPolicyService) { }

  ngOnInit() {
    this.loadScripts();
    this.createForm()
  }

  private createForm(){
    this.bookingPolicyForm = this.fb.group({
      file                      : ['', [Validators.required]]
    });
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#bookingDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/booking-policy',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'core_booking_policy_number'
              }, {
                data : 'core_booking_policy_status'
              }, {
                data : 'agent_code'
              }, {
                data : 'createdAt'
              }, {
                data : 'inserted_by'
              }, {
                data : 'updatedAt'
              }, {
                data : 'updated_by'
              }]
      });

    });
  }

  public downloadTemplate(): void {
      /* generate worksheet */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateData);
  
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables();
   }).catch(error => console.log(error));
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
    }
    reader.readAsBinaryString(target.files[0]);
    
  }
  
  public uploadBookingPolicy() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Booking E-policy Can't Deleted!",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Upload it!'
    }).then((result) => {
      if (result.value) {

        const booking_policy = this.convertToJSON(this.data)
        let policy = this.bookingPolicyService.saveBookingPolicy(booking_policy).toPromise()

        policy.then(() => {
          this.resetForm() //reset formnya kalau sudah kesimpen
          $('#bookingDatatables').DataTable().ajax.reload();
        })
        
      }
    })

    
  }

  public export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateData);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, this.fileName);
  }
  
  private convertToJSON(array) {
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        objArray[i - 1][key] = array[i][k]
      }
    }
  
    return objArray;
  }

  public resetForm() {
    this.file.reset()
    this.data = []
  }

  get file() {
    return this.bookingPolicyForm.get('file')
  }

}
