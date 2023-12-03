import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Famille} from "../../model/famille";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../services/ingredient.service";
import {NatureService} from "../../services/nature.service";

@Component({
  selector: 'app-nature',
  templateUrl: './nature.component.html',
  styleUrls: ['./nature.component.css']
})
export class NatureComponent implements OnInit{
  searchNatureFormGroup!:FormGroup;
  newNatureFormGroup!:FormGroup;
  nature!: Observable<Array<Famille>>;
  errMessage!:String;

  constructor(private route:ActivatedRoute ,private fb:FormBuilder, private natureService:NatureService, private router:Router) {

  }

  ngOnInit(): void {
    this.searchNatureFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchNature();

    this.newNatureFormGroup=this.fb.group({
      nom: ['', Validators.required],
    })

  }

  handelSearchNature() {
    let kw=this.searchNatureFormGroup?.value.keyword;
    this.nature=this.natureService.searchNature(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteNature(n: Famille) {
    let conf=confirm("Voulez vous supprimer cette nature ?")
    if (!conf) return;
    this.natureService.deleteNature(n.id_Famille).subscribe({
      next:(data)=>{
        this.nature=this.nature.pipe(
          map(data=>{
            let index=data.indexOf(n);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })
  }

  handleAddNature() {
    if (this.newNatureFormGroup.invalid) {
      alert("Veuillez remplir correctement tous le champs du formulaire.");
      return;
    }

    let data: Famille=this.newNatureFormGroup.value;
    this.natureService.saveNature(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait avec succès");
        this.newNatureFormGroup.reset();
        this.handelSearchNature();
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  handelUpdateNature(i: Famille) {
    this.router.navigateByUrl("/update-nature/"+i.id_Famille)
  }
}
