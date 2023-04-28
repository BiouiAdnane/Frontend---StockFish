import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../model/article";
import {Operation} from "../model/operation";

@Injectable({
  providedIn: 'root'
})
export class UserOperationsService {

  backendHost :String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public getUserOperations(matriculation:number):Observable<Array<Operation>>{
    return this.http.get<Array<Operation>>(this.backendHost+"/operations/user/"+matriculation)
  }

  public getOperation(idOperation : number):Observable<Operation>{
    return this.http.get<Operation>(this.backendHost+"/operations/"+ idOperation)
  }
  public deleteOperation(idOperation : number){
    return this.http.delete(this.backendHost+"/operations/"+idOperation)
  }

  public saveOperation(operation : Operation){
    return this.http.post(this.backendHost + "/operations" ,operation)
  }

  public updateOperation(operation : Operation){
    return this.http.put(this.backendHost + "/operations/" +operation.idOperation, operation)
  }
}
