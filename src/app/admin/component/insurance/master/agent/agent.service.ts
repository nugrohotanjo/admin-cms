// Core
import { Injectable }               from '@angular/core';

// Model
import { Agent }                    from './agent';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/agents")
                  .pipe(map(data => data));
  }

  saveAgent(data): Observable<Agent>{

    let agent = {
        id                  : data.id,
        agent_code          : data.agent_code,
        agent_name          : data.agent_name,
        agent_status        : data.agent_status ? 1 : 0,
        updateBy            : data.update_by
    }

    if(agent.id){
      return this.apiService.put("/agent/" + agent.id , agent)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/agent", agent)
                    .pipe(map(data => data));
    }
    
  }

  getAgentById(id: string): Observable<Agent>{
    return this.apiService.get("/agent/" + id)
                .pipe(map(data => data));
  }

  destroyAgent(id: string): Observable<Agent>{
    return this.apiService.delete("/agent/" + id)
                .pipe(map(data => data));
  }
}
