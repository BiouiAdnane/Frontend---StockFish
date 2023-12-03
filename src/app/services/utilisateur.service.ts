import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {typeEmploye, Utilisateur} from "../model/Utilisateur.model";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  backendHost :String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public searchPersonne(keyword : String):Observable<Array<Utilisateur>>{
    return this.http.get<Array<Utilisateur>>(this.backendHost+"/personnes/search?keyword="+keyword)
  }

  public getPersonne(matriculation : number):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.backendHost+"/personnes/"+ matriculation)
  }
  public deletePersonne(id : number){
    return this.http.delete(this.backendHost+"/personnes/"+id)
  }

  public savePersonne(personne : Utilisateur){
    return this.http.post(this.backendHost + "/personnes" ,personne)
  }

  public countPersonne(){
    return this.http.get <number>(this.backendHost + "/personnes/count")
  }

  public updatePersonne(personne :Utilisateur){
    return this.http.put(this.backendHost + "/personnes/" +personne.matriculation, personne)
  }

}

