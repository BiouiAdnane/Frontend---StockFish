import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Famille} from "../../model/famille";
import {ActivatedRoute, Router} from "@angular/router";
import {MarqueService} from "../../services/marque.service";
import {IngredientService} from "../../services/ingredient.service";

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit{
  searchIngredientFormGroup!:FormGroup;
  newIngredientFormGroup!:FormGroup;
  ingredient!: Observable<Array<Famille>>;
  errMessage!:String;

  constructor(private route:ActivatedRoute ,private fb:FormBuilder, private ingredientService:IngredientService, private router:Router) {

  }

  ngOnInit(): void {
    this.searchIngredientFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchIngredient();

    this.newIngredientFormGroup=this.fb.group({
      nom: ['', Validators.required],
    })

  }

  handelSearchIngredient() {
    let kw=this.searchIngredientFormGroup?.value.keyword;
    this.ingredient=this.ingredientService.searchIngredient(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteIngredient(i: Famille) {
    let conf=confirm("Voulez vous supprimer cet ingredient ?")
    if (!conf) return;
    this.ingredientService.deleteIngredient(i.id_Famille).subscribe({
      next:(data)=>{
        this.ingredient=this.ingredient.pipe(
          map(data=>{
            let index=data.indexOf(i);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })
  }

  handleAddIngredient() {
    if (this.newIngredientFormGroup.invalid) {
      alert("Veuillez remplir correctement le champs du formulaire.");
      return;
    }

    let data: Famille=this.newIngredientFormGroup.value;
    this.ingredientService.saveIngredient(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait avec succès");
        this.newIngredientFormGroup.reset();
        this.handelSearchIngredient();
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  handelUpdateIngredient(i: Famille) {
    this.router.navigateByUrl("/update-ingredient/"+i.id_Famille)
  }
}
