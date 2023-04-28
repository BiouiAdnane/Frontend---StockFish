import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Operation} from "../../model/operation";
import {OperationsService} from "../../services/operations.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-emballage-sortie',
  templateUrl: './emballage-sortie.component.html',
  styleUrls: ['./emballage-sortie.component.css']
})
export class EmballageSortieComponent implements OnInit{
  emballageSortieFormGroup!:FormGroup;
  operation!: Observable<Array<Operation>>;
  errMessage!:String;


  ngOnInit(): void {
    this.handelGetOperationsEmbaSort()
  }


  constructor(private operationService :OperationsService, private fb : FormBuilder,
              private route:ActivatedRoute,private router:Router) {
  }

  handelGetOperationsEmbaSort(){
    this.operation=this.operationService.getOperationsEmbSort().pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )
  }


  handledDeleteOperation(o: Operation) {
    let conf=confirm("Voulez vous supprimer cette operation ?")
    if (!conf) return;
    this.operationService.deleteOperation(o.idOperation).subscribe({
      next:(data)=>{
        this.operation=this.operation.pipe(
          map(data=>{
            let index=data.indexOf(o);
            data.slice(index, 1);
            return data;
          })
        )
      }, error:err => {
        console.log(err)       }
    })

  }

  handelUpdateOperation(o: Operation) {
    this.router.navigateByUrl("/updateOperation/"+o.idOperation)
  }
}

