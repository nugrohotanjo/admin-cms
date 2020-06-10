// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { MemberGetMemberService }                                 from './member-get-member.service';

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';

@Component({
  selector: 'app-member-get-member-management',
  templateUrl: './pages/member-get-member-management.component.html',
  styleUrls: ['./pages/member-get-member-management.component.css']
})
export class MemberGetMemberManagementComponent implements OnInit {

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix
  image_url                   = environment.image_url

  constructor(  private memberGetMemberService      : MemberGetMemberService,  
                private router                      : Router,
                private dynamicScriptLoader         : DynamicScriptLoaderService,
                private zone                        : NgZone) { }

  ngOnInit() 
  {
    this.loadScripts()
    let self = this;

    $(document).on('click', '#editMemberGetMember', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([ self.prefix +'/member-get-member/edit/' + id]))
    });

    $(document).on('click', '#deleteMemberGetMember', function(){
      let id = $(this).data('id');
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          return   self.memberGetMemberService.destroyMemberGetMember(id)
                    .subscribe(() => {
                      $('#memberGetMemberDatatables').DataTable().ajax.reload();
                    });
            }
          })
      });
    }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#memberGetMemberDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/member_get_member',
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
                data : 'maximum_amount'
              }, {
                data : 'image',
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                  return "<img src='" + self.image_url + "" + data + "' class='img-dt' />";
                }
              }, {
                data : 'start_date'
              }, {
                data : 'end_date'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editMemberGetMember"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteMemberGetMember"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
            }
          }]
      });

    });
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa','Moment').then(data => {
     // Script Loaded Successfully
     this.initDataTables();
   }).catch(error => console.log(error));
 }

}
