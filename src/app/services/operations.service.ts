import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Operation} from "../model/operation";
import {DispoArticle} from "../model/DispoArticle";
import {OperationResponse} from "../model/OperationResponse";

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
  public getDepotOperation(code_Depot : number):Observable<Array<Operation>>{
    return this.http.get<Array<Operation>>(this.backendHost+"/operations/depots/"+ code_Depot)
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

  public getArticleDipoEmba(): Observable<Array<Object>> {
    return this.http.get<Array<Object>>(this.backendHost+"/operations/depots/articles/emb");
  }


  public getArticleDipoPrdFini():Observable<Array<DispoArticle>>{
    return this.http.get<Array<DispoArticle>>(this.backendHost+"/operations/depots/articles/prf")
  }

  public getAlleeDispo(code_Depot:number):Observable<Array<number>>{
    return this.http.get<Array<number>>(this.backendHost+"/operations/allees/"+code_Depot)
  }
  public getRangeeDispo(code_Depot:number, allee:number):Observable<Array<number>>{
    return this.http.get<Array<number>>(this.backendHost+"/operations/allees/rangees/"+code_Depot+"/"+allee)
  }
  public getNiveauDispo(code_Depot:number, allee:number, rangee:number):Observable<Array<number>>{
    return this.http.get<Array<number>>(this.backendHost+"/operations/allees/rangees/niveaux/"+code_Depot+"/"+allee+"/"+rangee)
  }

  getOperationsByDepotAndMonthAndYear(codeDepot: number, month: number, year: number): Observable<any> {
    const url = `http://localhost:8085/operations/depots/${codeDepot}/${month}/${year}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const data = response as { [key: string]: any };

        const dates = data['dates'] || []; // Récupérer le tableau des dates
        const entrees = data['entrees'] || []; // Récupérer le tableau des entrées
        const sorties = data['sorties'] || []; // Récupérer le tableau des sorties

        const formattedData = dates.map((date: string, index: number) => ({
          date,
          entries: entrees[index] || 0,
          outputs: sorties[index] || 0
        }));

        return formattedData;
      })
    );
  }

  getArticleOperations(codeDepot: number, month: number, year: number): Observable<OperationResponse> {
    return this.http.get<OperationResponse>(this.backendHost+"/operations/articles/"+codeDepot+"/"+month+"/"+year);
  }

}
