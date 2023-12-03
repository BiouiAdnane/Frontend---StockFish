import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Famille} from "../../model/famille";
import {MarqueService} from "../../services/marque.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Depot} from "../../model/depot";

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit{
  searchMarqueFormGroup!:FormGroup;
  newMarqueFormGroup!:FormGroup;
  marque!: Observable<Array<Famille>>;
  errMessage!:String;

  constructor(private route:ActivatedRoute ,private fb:FormBuilder, private marqueService:MarqueService, private router:Router) {

  }

  ngOnInit(): void {
    this.searchMarqueFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchMarque();

    this.newMarqueFormGroup=this.fb.group({
      nom: ['', Validators.required],
    })

  }

  handelSearchMarque() {
    let kw=this.searchMarqueFormGroup?.value.keyword;
    this.marque=this.marqueService.searchMarque(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteMarque(m: Famille) {
    let conf=confirm("Voulez vous supprimer cette marque ?")
    if (!conf) return;
    this.marqueService.deleteMarque(m.id_Famille).subscribe({
      next:(data)=>{
        this.marque=this.marque.pipe(
          map(data=>{
            let index=data.indexOf(m);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })
  }

  handleAddMarque() {
    if (this.newMarqueFormGroup.invalid) {
      alert("Veuillez remplir correctement tous le champs du formulaire.");
      return;
    }

    let data: Famille=this.newMarqueFormGroup.value;
    this.marqueService.saveMarque(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait avec succès");
        this.newMarqueFormGroup.reset();
        this.handelSearchMarque();
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  handelUpdateMarque(m: Famille) {
    this.router.navigateByUrl("/update-marque/"+m.id_Famille)
  }
}
