import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Famille} from "../../model/famille";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../services/ingredient.service";
import {QualiteService} from "../../services/qualite.service";

@Component({
  selector: 'app-qualite',
  templateUrl: './qualite.component.html',
  styleUrls: ['./qualite.component.css']
})
export class QualiteComponent implements OnInit{
  searchQualiteFormGroup!:FormGroup;
  newQauliteFormGroup!:FormGroup;
  qualite!: Observable<Array<Famille>>;
  errMessage!:String;

  constructor(private route:ActivatedRoute ,private fb:FormBuilder, private qualiteService:QualiteService, private router:Router) {

  }

  ngOnInit(): void {
    this.searchQualiteFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchQualite();

    this.newQauliteFormGroup=this.fb.group({
      nom: ['', Validators.required],
    })

  }

  handelSearchQualite() {
    let kw=this.searchQualiteFormGroup?.value.keyword;
    this.qualite=this.qualiteService.searchQualite(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteQualite(q: Famille) {
    let conf=confirm("Voulez vous supprimer cette qualité ?")
    if (!conf) return;
    this.qualiteService.deleteQualite(q.id_Famille).subscribe({
      next:(data)=>{
        this.qualite=this.qualite.pipe(
          map(data=>{
            let index=data.indexOf(q);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })
  }

  handleAddQualite() {
    if (this.newQauliteFormGroup.invalid) {
      alert("Veuillez remplir correctement tous le champs du formulaire.");
      return;
    }

    let data: Famille=this.newQauliteFormGroup.value;
    this.qualiteService.saveQualite(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait avec succès");
        this.newQauliteFormGroup.reset();
        this.handelSearchQualite();
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  handelUpdateQualite(q: Famille) {
    this.router.navigateByUrl("/update-qualite/"+q.id_Famille)
  }
}
