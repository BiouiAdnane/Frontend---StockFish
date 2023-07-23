import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {Article} from "../model/article";
import {ArticleService} from "../services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{
  searchArticleFormGroup!:FormGroup;
  article!: Observable<Array<Article>>;
  errMessage!:String;


  ngOnInit(): void {
    this.searchArticleFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchArticle()
  }


  constructor(private articleService :ArticleService, private fb : FormBuilder, private router:Router) {
  }

  handelSearchArticle() {
    let kw=this.searchArticleFormGroup?.value.keyword;
    this.article=this.articleService.searchArticle(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteArticle(a: Article) {
    let conf=confirm("Voulez vous supprimer cet article ?")
    if (!conf) return;
    this.articleService.deleteArticle(a.code_Article).subscribe({
      next:(data)=>{
        this.article=this.article.pipe(
          map(data=>{
            let index=data.indexOf(a);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })

  }

  handelUpdateArticle(a: Article) {
    this.router.navigateByUrl("/updateArticle/"+a.code_Article)
  }
}
