import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Depot} from "../model/depot";
import {catchError, map, Observable, throwError} from "rxjs";
import {DepotService} from "../services/depot-service";
import {Router} from "@angular/router";
import {Utilisateur} from "../model/Utilisateur.model";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit{
  searchDepotFormGroup!:FormGroup;
  depot!: Observable<Array<Depot>>;
  errMessage!:String;


  ngOnInit(): void {
    this.searchDepotFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handelSearchDepot()
  }


  constructor(private depotService :DepotService, private fb : FormBuilder, private router:Router) {
  }

  handelSearchDepot() {
    let kw=this.searchDepotFormGroup?.value.keyword;
    this.depot=this.depotService.searchDepot(kw).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )

  }

  handledDeleteDepot(d: Depot) {
    let conf=confirm("Voulez vous supprimer ce depot ?")
    if (!conf) return;
    this.depotService.deleteDepot(d.code_Depot).subscribe({
      next:(data)=>{
        this.depot=this.depot.pipe(
          map(data=>{
            let index=data.indexOf(d);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })

  }

  handelUpdateDepot(d: Depot) {
    this.router.navigateByUrl("/updateDepot/"+d.code_Depot)
  }

  handelOperationDepot(d: Depot) {
    this.router.navigateByUrl("/OperDep/"+d.code_Depot)
  }
}
