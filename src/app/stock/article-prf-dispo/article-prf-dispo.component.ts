import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";
import {DispoArticle} from "../../model/DispoArticle";
import {OperationsService} from "../../services/operations.service";

@Component({
  selector: 'app-article-prf-dispo',
  templateUrl: './article-prf-dispo.component.html',
  styleUrls: ['./article-prf-dispo.component.css']
})
export class ArticlePrfDispoComponent  implements OnInit {
  ProdFiniDispoFormGroup!: FormGroup;
  dispoArticle!: Observable<Array<DispoArticle>>;
  errMessage!: String;

  ngOnInit(): void {
    this.handelGetPrfDispo();
  }
  constructor(private operationService: OperationsService) {
  }
  handelGetPrfDispo() {
    this.dispoArticle = this.operationService.getArticleDipoPrdFini().pipe(
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
