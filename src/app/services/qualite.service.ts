import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Famille} from "../model/famille";

@Injectable({
  providedIn: 'root'
})
export class QualiteService {

  backendHost :String="http://localhost:8085/familles"
  constructor(private http:HttpClient) { }

  public searchQualite(keyword : String):Observable<Array<Famille>>{
    return this.http.get<Array<Famille>>(this.backendHost+"/qualites/search?keyword="+keyword)
  }

  public getQualite(id_Famille : number):Observable<Famille>{
    return this.http.get<Famille>(this.backendHost+"/id/"+ id_Famille)
  }
  public deleteQualite(id_Famille : number){
    return this.http.delete(this.backendHost+"/qualites/"+id_Famille)
  }

  public saveQualite(qualite : Famille){
    return this.http.post(this.backendHost + "/qualites" ,qualite)
  }

  public updateQualite(qualite :Famille){
    return this.http.put(this.backendHost + "/qualites/" +qualite.id_Famille, qualite)
  }
}
