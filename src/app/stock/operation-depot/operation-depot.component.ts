import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Operation} from "../../model/operation";
import {OperationsService} from "../../services/operations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RedirectService} from "../../services/redirect.service";
import {DepotService} from "../../services/depot-service";
import {Depot} from "../../model/depot";

@Component({
  selector: 'app-operation-depot',
  templateUrl: './operation-depot.component.html',
  styleUrls: ['./operation-depot.component.css']
})
export class OperationDepotComponent implements OnInit{
  OperationDepotFormGroup!:FormGroup;
  operation!: Observable<Array<Operation>>;
  errMessage!:String;
  code_Depot!:number;

  ngOnInit(): void {
    this.code_Depot=this.route.snapshot.params['code_Depot'];
    this.handelGetOperationsDepot();
  }


  constructor(private operationService :OperationsService, private fb : FormBuilder,
              private route:ActivatedRoute,private router:Router,private depotService: DepotService) {
  }

  handelGetOperationsDepot(){
    this.operation=this.operationService.getDepotOperation(this.code_Depot).pipe(
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

  addOpEmb(){
    this.router.navigateByUrl("/NewOpEmbEntr")
  }
  addOpPrF(){
    this.router.navigateByUrl("/NewPrdFiniEntr")
  }
}
