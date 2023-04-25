import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Famille} from "../model/famille";

@Injectable({
  providedIn: 'root'
})
export class MarqueService {


  backendHost :String="http://localhost:8085/familles"
  constructor(private http:HttpClient) { }

  public searchMarque(keyword : String):Observable<Array<Famille>>{
    return this.http.get<Array<Famille>>(this.backendHost+"/marques/search?keyword="+keyword)
  }

  public getMarque(id_Famille : number):Observable<Famille>{
    return this.http.get<Famille>(this.backendHost+"/id/"+ id_Famille)
  }
  public deleteMarque(id_Famille : number){
    return this.http.delete(this.backendHost+"/marques/"+id_Famille)
  }

  public saveMarque(marque : Famille){
    return this.http.post(this.backendHost + "/marques" ,marque)
  }

  public updateMarque(marque :Famille){
    return this.http.put(this.backendHost + "/marques/" +marque.id_Famille, marque)
  }
}
