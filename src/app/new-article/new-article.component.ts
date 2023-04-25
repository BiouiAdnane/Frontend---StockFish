import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../services/article.service";
import {Article} from "../model/article";
import {Famille} from "../model/famille";
import {FamilleService} from "../services/famille.service";

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  newArticleFormGroup!: FormGroup;
  ingredients: Famille[] = [];
  marques: Famille[] = [];
  natures: Famille[] = [];
  qualites: Famille[] = [];

  constructor(private fb: FormBuilder, private articleService: ArticleService, private familleService: FamilleService) {
  }

  ngOnInit(): void {
    this.newArticleFormGroup = this.fb.group({
      designiation: ['', Validators.required],
      ingredient: ['', Validators.required],
      marque: ['', Validators.required],
      nature: ['', Validators.required],
      qualite: ['', Validators.required]
    });
    this.loadIngredients();
    this.loadMarques();
    this.loadQualites();
    this.loadNatures()
  }

    handleSaveArticle(): void {
      if (this.newArticleFormGroup.invalid) {
        alert("Veuillez remplir correctement tous les champs du formulaire.");
        return;
      }

      let data: Article = this.newArticleFormGroup.value;
      this.articleService.saveArticle(data).subscribe({
        next: (data) => {
          alert("L'enregistrement est fait avec succès");
          this.newArticleFormGroup.reset();
        },
        error: (err) => {
          console.log(err)
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
