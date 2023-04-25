import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Famille} from "../model/famille";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  backendHost :String="http://localhost:8085/familles"
  constructor(private http:HttpClient) { }

  public searchIngredient(keyword : String):Observable<Array<Famille>>{
    return this.http.get<Array<Famille>>(this.backendHost+"/ingredients/search?keyword="+keyword)
  }

  public getIngredient(id_Famille : number):Observable<Famille>{
    return this.http.get<Famille>(this.backendHost+"/id/"+ id_Famille)
  }
  public deleteIngredient(id_Famille : number){
    return this.http.delete(this.backendHost+"/ingredients/"+id_Famille)
  }

  public saveIngredient(ingredient : Famille){
    return this.http.post(this.backendHost + "/ingredients" ,ingredient)
  }

  public updateMarque(ingredient :Famille){
    return this.http.put(this.backendHost + "/ingredients/" +ingredient.id_Famille, ingredient)
  }

  getIngredientById_Famille(id_Famille: number): Observable<Famille> {
    return this.http.get<Famille>(this.backendHost + "/ingredients/" +id_Famille);
  }
}
