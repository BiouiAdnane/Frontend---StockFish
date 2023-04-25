import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Famille} from "../model/famille";

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  backendHost :String="http://localhost:8085/familles"
  constructor(private http:HttpClient) { }

  public searchNature(keyword : String):Observable<Array<Famille>>{
    return this.http.get<Array<Famille>>(this.backendHost+"/natures/search?keyword="+keyword)
  }

  public getNature(id_Famille : number):Observable<Famille>{
    return this.http.get<Famille>(this.backendHost+"/id/"+ id_Famille)
  }
  public deleteNature(id_Famille : number){
    return this.http.delete(this.backendHost+"/natures/"+id_Famille)
  }

  public saveNature(nature : Famille){
    return this.http.post(this.backendHost + "/natures" ,nature)
  }

  public updateNature(nature :Famille){
    return this.http.put(this.backendHost + "/natures/" +nature.id_Famille, nature)
  }
}
