import {Component, OnInit} from '@angular/core';
import {Depot} from "../model/depot";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DepotService} from "../services/depot-service";
import {Article} from "../model/article";
import {ArticleService} from "../services/article.service";
import {FamilleService} from "../services/famille.service";
import {Famille} from "../model/famille";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit{

  code_Article!:number;
  article!:Article;
  updateArticleFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})
  ingredients: Famille[] = [];
  marques: Famille[] = [];
  natures: Famille[] = [];
  qualites: Famille[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public articleService: ArticleService,
    private fb: FormBuilder,
    private familleService: FamilleService
  ) {
    this.article = this.router.getCurrentNavigation()?.extras.state as Article;
    this.updateArticleFormGroup = new FormGroup({
      code_Article: new FormControl(),
      designiation: new FormControl(),
      ingredient: new FormControl(),
      marque: new FormControl(),
      nature: new FormControl(),
      qualite: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.code_Article = this.route.snapshot.params['code_Article'];

    this.updateArticleFormGroup = this.fb.group({
      code_Article: this.fb.control(this.code_Article),
      designiation: this.fb.control(''),
      ingredient: this.fb.control(''),
      marque: this.fb.control(''),
      nature: this.fb.control(''),
      qualite: this.fb.control(''),
    });

    this.articleService.getArticle(this.code_Article).subscribe({
      next: (article) => {
        this.article = article;
        this.updateArticleFormGroup.setValue({
          code_Article: this.article.code_Article,
          designiation: this.article.designiation,
          ingredient: this.article.ingredient.id_Famille,
          marque: this.article.marque.id_Famille,
          nature: this.article.nature.id_Famille,
          qualite: this.article.qualite.id_Famille,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.loadIngredients();
    this.loadMarques();
    this.loadQualites();
    this.loadNatures();
  }


  handleUpdateArticle() {
    let a = this.updateArticleFormGroup.value;
    a.code_Article = this.article.code_Article;

    // Récupérer les id_Famille des ingrédients, de la nature, de la qualité et de la marque sélectionnés
    let ingredientId = this.updateArticleFormGroup.get('ingredient')?.value;
    let natureId = this.updateArticleFormGroup.get('nature')?.value;
    let qualiteId = this.updateArticleFormGroup.get('qualite')?.value;
    let marqueId = this.updateArticleFormGroup.get('marque')?.value;

    // Récupérer les objets Famille correspondant aux id_Famille sélectionnés
    let ingredient = this.ingredients.find(i => i.id_Famille == ingredientId);
    let nature = this.natures.find(n => n.id_Famille == natureId);
    let qualite = this.qualites.find(q => q.id_Famille == qualiteId);
    let marque = this.marques.find(m => m.id_Famille == marqueId);

    // Assigner les objets Famille correspondant aux propriétés d'article correspondantes
    a.ingredient = ingredient;
    a.nature = nature;
    a.qualite = qualite;
    a.marque = marque;

    this.articleService.saveArticle(a).subscribe({
      next: (data) => {
        alert("La modification est faite avec succès");
        this.router.navigateByUrl("/article");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  loadIngredients(): void {
    this.familleService.getIngredients().subscribe({
      next: (data) => {
        this.ingredients = data;
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  loadMarques(): void {
    this.familleService.getMarques().subscribe({
      next: (data) => {
        this.marques = data;
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
  loadNatures(): void {
    this.familleService.getNatures().subscribe({
      next: (data) => {
        this.natures = data;
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
  loadQualites(): void {
    this.familleService.getQualites().subscribe({
      next: (data) => {
        this.qualites = data;
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
}
