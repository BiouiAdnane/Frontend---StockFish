import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Famille} from "../model/famille";

@Injectable({
  providedIn: 'root'
})
export class FamilleService {
  backendHost :String="http://localhost:8085/familles"

  constructor(private http: HttpClient) { }

  getIngredients(): Observable<Famille[]> {
    return this.http.get<Famille[]>(this.backendHost+"/ingredients");
  }
  getMarques(): Observable<Famille[]> {
    return this.http.get<Famille[]>(this.backendHost+"/marques");
  }
  getNatures(): Observable<Famille[]> {
    return this.http.get<Famille[]>(this.backendHost+"/natures");
  }
  getQualites(): Observable<Famille[]> {
    return this.http.get<Famille[]>(this.backendHost+"/qualites");
  }

  countFamille(): Observable<number>{
    return this.http.get<number>(this.backendHost+"/count")
  }
}
