import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {Operation} from "../../model/operation";
import {OperationsService} from "../../services/operations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectService} from "../../services/redirect.service";
import {DispoArticle} from "../../model/DispoArticle";

@Component({
  selector: 'app-article-emb-dispo',
  templateUrl: './article-emb-dispo.component.html',
  styleUrls: ['./article-emb-dispo.component.css']
})
export class ArticleEmbDispoComponent implements OnInit {
  emballageDispoFormGroup!: FormGroup;
  dispoArticle!: Observable<Array<DispoArticle>>;
  errMessage!: String;

  ngOnInit(): void {
    this.handelGetEmbDispo();
  }
  constructor(private operationService: OperationsService) {
  }
  handelGetEmbDispo() {
    this.dispoArticle = this.operationService.getArticleDipoEmba().pipe(
      map((data: Array<any>) => {
        return data.map((item: any) => {
          return {
            code_Article: item[0],
            designiation: item[1],
            n_Lot: item[2],
            quantite_Article: item[3],
          } as DispoArticle;
        });
      })
    );
  }
}

