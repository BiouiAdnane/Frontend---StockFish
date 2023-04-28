import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Utilisateur} from "../model/Utilisateur.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilisateurService} from "../services/utilisateur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})

export class UtilisateurComponent implements OnInit{
  personne!:Observable<Array<Utilisateur>>;
  errMessage!:String;
  searchFormGroup:FormGroup|undefined;

  constructor(private utilisateurService:UtilisateurService, private fb : FormBuilder, private router:Router) {
  }

  ngOnInit(): void {

    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchPersonne()
  }

  handelSearchPersonne() {
    let kw=this.searchFormGroup?.value.keyword;
    this.personne=this.utilisateurService.searchPersonne(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeletePersonne(p: Utilisateur) {
    let conf=confirm("Voulez vous supprimer ce personnel ?")
    if (!conf) return;
    this.utilisateurService.deletePersonne(p.matriculation).subscribe({
      next:(data)=>{
        this.personne=this.personne.pipe(
          map(data=>{
            let index=data.indexOf(p);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })

  }

  handelUpdatePersonne(p: Utilisateur) {
    this.router.navigateByUrl("/updateUser/"+p.matriculation)

  }

  handelPersonneOperations(p: Utilisateur) {
    this.router.navigateByUrl("/userOperations/"+p.matriculation)
  }
}
