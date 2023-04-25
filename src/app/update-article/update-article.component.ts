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


  constructor(private route:ActivatedRoute,private router:Router, public articleService : ArticleService,
              private fb : FormBuilder , private familleService: FamilleService) {
    this.article=this.router.getCurrentNavigation()?.extras.state as Article;
    this.updateArticleFormGroup=new FormGroup({
      code_Article:new FormControl(),
      designiation:new FormControl(),
      ingredient:new FormControl(),
      marque:new FormControl(),
      nature:new FormControl(),
      qualite:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.code_Article=this.route.snapshot.params['code_Article'];
    this.articleService.getArticle(this.code_Article).subscribe({
      next:(article)=>{
        this.article=article;
        this.updateArticleFormGroup=this.fb.group({
          code_Article:this.fb.control(this.article.code_Article),
          designiation:this.fb.control(this.article.designiation),
          ingredient:this.fb.control(this.article.ingredient),
          marque:this.fb.control(this.article.marque),
          nature:this.fb.control(this.article.nature),
          qualite: this.fb.control(this.article.qualite),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })

    this.loadIngredients();
    this.loadMarques();
    this.loadQualites();
    this.loadNatures()
  }

  handleUpdateArticle() {
    let a= this.updateArticleFormGroup.value;
    a.code_Article=this.article.code_Article;
    this.articleService.saveArticle(a).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/article")
      },
      error:err => {
        console.log(err);
      }
    })
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
