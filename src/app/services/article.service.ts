import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../model/Utilisateur.model";
import {Article} from "../model/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  backendHost :String="http://localhost:8085"
  constructor(private http:HttpClient) { }

  public searchArticle(keyword : String):Observable<Array<Article>>{
    return this.http.get<Array<Article>>(this.backendHost+"/articles/search?keyword="+keyword)
  }
  public getListArticles():Observable<Array<Article>>{
    return this.http.get<Array<Article>>(this.backendHost+"/articles")
  }
  public countArticles():Observable<number>{
    return this.http.get<number>(this.backendHost+"/articles/count")
  }

  public getArticle(code_Article : number):Observable<Article>{
    return this.http.get<Article>(this.backendHost+"/articles/"+ code_Article)
  }
  public deleteArticle(code_Article : number){
    return this.http.delete(this.backendHost+"/articles/"+code_Article)
  }

  public saveArticle(article : Article){
    return this.http.post(this.backendHost + "/articles" ,article)
  }

  public updateArticle(article :Article){
    return this.http.put(this.backendHost + "/articles/" +article.code_Article, article)
  }
}
