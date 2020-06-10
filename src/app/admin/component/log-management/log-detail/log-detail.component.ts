import { Component, OnInit } from '@angular/core';

// Service
import { LogService } from '../log.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css']
})
export class LogDetailComponent implements OnInit {

  log_data  = {
    name          : null,
    id            : null,
    category      : null,
    activity      : null,
    origin        : null,
    update_data   : null,
    createdAt     : null
  }

  origin_data = null
  update_data = null

  // Get log id
  log_id      : String = this.route.snapshot.paramMap.get("id")

  constructor(private logService : LogService,
              private route      : ActivatedRoute,) { }

  ngOnInit() {
    this.initData()
  }

  private initData() {
    this.logService.getLogById(this.log_id).subscribe((data) => {
      this.log_data = {
        name          : data.name,
        id            : data.id,
        category      : data.category,
        activity      : data.activity,
        origin        : data.origin_data,
        update_data   : data.new_update,
        createdAt     : data.createdAt
      }

      this.parsingJson(this.log_data) // parsing ke json dlu datanya, karena dari DB dia bentuknya string
    })
  }

  private parsingJson(data) {
    let origin = JSON.parse(data.origin)
    let update = JSON.parse(data.update_data)

    /** data origin jadiin html */
    let d_o = "<ul class='remove-bullet'>" // set variable untuk di buat html
    for(let o in origin) {
      let value = origin[o]
      d_o += "<li>" + o + " - " + value + "</li>"
    }
    d_o += "</ul>"
    /** data origin jadiin html end */


    /** data update jadiin html  */
    let d_u = "<ul class='remove-bullet'>" // set variable untuk di buat html
    for(let u in update) {
      let value = update[u]
      d_u += "<li>" + u + " - " + value + "</li>"
    }
    d_u += "</ul>"
    /** data update jadiin html End  */

    this.origin_data = d_o
    this.update_data = d_u
  }

}
