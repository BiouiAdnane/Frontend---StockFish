import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operation} from "../model/operation";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  backendHost :String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public getOperationsEmbEnt():Observable<Array<Operation>>{
    return this.http.get<Array<Operation>>(this.backendHost+"/operations/emballage/entree")
  }

  public getOperationsEmbSort():Observable<Array<Operation>>{
    return this.http.get<Array<Operation>>(this.backendHost+"/operations/emballage/sortie")
  }

  public getOperationsPfEnt():Observable<Array<Operation>>{
    return this.http.get<Array<Operation>>(this.backendHost+"/operations/prfini/entree")
  }

  public getOperationsPfSort():Observable<Array<Operation>>{
    return this.http.get<Array<Operation>>(this.backendHost+"/operations/prfini/sortie")
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
