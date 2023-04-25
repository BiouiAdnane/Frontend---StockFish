import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Depot} from "../model/depot";

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  backendHost :String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public searchDepot(keyword : String):Observable<Array<Depot>>{
    return this.http.get<Array<Depot>>(this.backendHost+"/depots/search?keyword="+keyword)
  }

  public deleteDepot(id : number){
    return this.http.delete(this.backendHost+"/depots/"+id)
  }

  public updateDepot(depot :Depot){
    return this.http.put(this.backendHost + "/depots/" +depot.code_Depot, depot)
  }

  public getDepot(code_Depot : number):Observable<Depot>{
    return this.http.get<Depot>(this.backendHost+"/depots/"+ code_Depot)
  }

  public saveDepot(depot : Depot){
    return this.http.post(this.backendHost + "/depots" ,depot)
  }
}
