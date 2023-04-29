import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NewUtilisateurComponent } from './new-utilisateur/new-utilisateur.component';
import { DepotComponent } from './depot/depot.component';
import { UpdateUtilisateurComponent } from './update-utilisateur/update-utilisateur.component';
import { LoginComponent } from './login/login.component';
import { UpdateDepotComponent } from './update-depot/update-depot.component';
import { NewDepotComponent } from './new-depot/new-depot.component';
import { MarqueComponent } from './familles/marque/marque.component';
import { IngredientComponent } from './familles/ingredient/ingredient.component';
import { NatureComponent } from './familles/nature/nature.component';
import { QualiteComponent } from './familles/qualite/qualite.component';
import { UpdateMarqueComponent } from './familles/update-marque/update-marque.component';
import { UpdateIngredientComponent } from './familles/update-ingredient/update-ingredient.component';
import { UpdateNatureComponent } from './familles/update-nature/update-nature.component';
import { UpdateQualiteComponent } from './familles/update-qualite/update-qualite.component';
import { ArticleComponent } from './article/article.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { UserOperationsComponent } from './user-operations/user-operations.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { EmballageEntreComponent } from './stock/emballage-entre/emballage-entre.component';
import { EmballageSortieComponent } from './stock/emballage-sortie/emballage-sortie.component';
import { PrdFinEntreComponent } from './stock/prd-fin-entre/prd-fin-entre.component';
import { PrdFinSortieComponent } from './stock/prd-fin-sortie/prd-fin-sortie.component';
import { NewEmballageEntreComponent } from './stock/new-emballage-entre/new-emballage-entre.component';
import { NewProdFiniEntreComponent } from './stock/new-prod-fini-entre/new-prod-fini-entre.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    NavBarComponent,
    UtilisateurComponent,
    NewUtilisateurComponent,
    DepotComponent,
    UpdateUtilisateurComponent,
    LoginComponent,
    UpdateDepotComponent,
    NewDepotComponent,
    MarqueComponent,
    IngredientComponent,
    NatureComponent,
    QualiteComponent,
    UpdateMarqueComponent,
    UpdateIngredientComponent,
    UpdateNatureComponent,
    UpdateQualiteComponent,
    ArticleComponent,
    NewArticleComponent,
    UpdateArticleComponent,
    UserOperationsComponent,
    UpdateOperationComponent,
    EmballageEntreComponent,
    EmballageSortieComponent,
    PrdFinEntreComponent,
    PrdFinSortieComponent,
    NewEmballageEntreComponent,
    NewProdFiniEntreComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
