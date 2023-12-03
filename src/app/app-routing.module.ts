import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {UtilisateurComponent} from "./utilisateur/utilisateur.component";
import {NewUtilisateurComponent} from "./new-utilisateur/new-utilisateur.component";
import {DepotComponent} from "./depot/depot.component";
import {UpdateUtilisateurComponent} from "./update-utilisateur/update-utilisateur.component";
import {LoginComponent} from "./login/login.component";
import {UpdateDepotComponent} from "./update-depot/update-depot.component";
import {NewDepotComponent} from "./new-depot/new-depot.component";
import {MarqueComponent} from "./familles/marque/marque.component";
import {NatureComponent} from "./familles/nature/nature.component";
import {IngredientComponent} from "./familles/ingredient/ingredient.component";
import {QualiteComponent} from "./familles/qualite/qualite.component";
import {UpdateMarqueComponent} from "./familles/update-marque/update-marque.component";
import {UpdateNatureComponent} from "./familles/update-nature/update-nature.component";
import {UpdateIngredientComponent} from "./familles/update-ingredient/update-ingredient.component";
import {UpdateQualiteComponent} from "./familles/update-qualite/update-qualite.component";
import {ArticleComponent} from "./article/article.component";
import {NewArticleComponent} from "./new-article/new-article.component";
import {UpdateArticleComponent} from "./update-article/update-article.component";
import {UserOperationsComponent} from "./user-operations/user-operations.component";
import {UpdateOperationComponent} from "./update-operation/update-operation.component";
import {EmballageEntreComponent} from "./stock/emballage-entre/emballage-entre.component";
import {EmballageSortieComponent} from "./stock/emballage-sortie/emballage-sortie.component";
import {PrdFinEntreComponent} from "./stock/prd-fin-entre/prd-fin-entre.component";
import {PrdFinSortieComponent} from "./stock/prd-fin-sortie/prd-fin-sortie.component";
import {NewEmballageEntreComponent} from "./stock/new-emballage-entre/new-emballage-entre.component";
import {NewProdFiniEntreComponent} from "./stock/new-prod-fini-entre/new-prod-fini-entre.component";
import {ArticleEmbDispoComponent} from "./stock/article-emb-dispo/article-emb-dispo.component";
import {ArticlePrfDispoComponent} from "./stock/article-prf-dispo/article-prf-dispo.component";
import {OperationDepotComponent} from "./stock/operation-depot/operation-depot.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path:"n", component: LoginComponent },
  {path:"login", component: LoginComponent },
  {path:"dashboard", component: AdminDashboardComponent},

  {path:"users", component: UtilisateurComponent},
  {path:"new-user", component: NewUtilisateurComponent},
  {path:"updateUser/:matriculation", component: UpdateUtilisateurComponent},
  {path:"userOperations/:matriculation", component: UserOperationsComponent},

  {path:"depot", component: DepotComponent},
  {path:"new-depot", component: NewDepotComponent},
  {path:"updateDepot/:code_Depot", component: UpdateDepotComponent},

  {path:"article", component: ArticleComponent},
  {path:"new-article", component: NewArticleComponent},
  {path:"updateArticle/:code_Article", component: UpdateArticleComponent},

  {path:"marque", component: MarqueComponent},
  {path:"update-marque/:id_Famille", component: UpdateMarqueComponent},

  {path:"nature", component: NatureComponent},
  {path:"update-nature/:id_Famille", component: UpdateNatureComponent},

  {path:"ingredient", component: IngredientComponent},
  {path:"update-ingredient/:id_Famille", component: UpdateIngredientComponent},

  {path:"qualite", component: QualiteComponent},
  {path:"update-qualite/:id_Famille", component: UpdateQualiteComponent},

  {path:"updateOperation/:idOperation", component: UpdateOperationComponent},
  {path:"OpEmbEntr", component: EmballageEntreComponent},
  {path:"NewOpEmbEntr", component: NewEmballageEntreComponent},

  {path:"OpEmbSort", component: EmballageSortieComponent},
  {path:"NewPrdFiniEntr", component: NewProdFiniEntreComponent},

  {path:"OpPfEntr", component: PrdFinEntreComponent},
  {path:"OpPfSort", component: PrdFinSortieComponent},

  {path:"ArtEmbDispo", component: ArticleEmbDispoComponent},
  {path:"ArtPrfDispo", component: ArticlePrfDispoComponent},

  {path:"OperDep/:code_Depot", component:OperationDepotComponent},

  {path:"stat", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
