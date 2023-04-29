import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Operation} from "../../model/operation";
import {UserOperationsService} from "../../services/user-operations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OperationsService} from "../../services/operations.service";
import {RedirectService} from "../../services/redirect.service";

@Component({
  selector: 'app-emballage-entre',
  templateUrl: './emballage-entre.component.html',
  styleUrls: ['./emballage-entre.component.css']
})
export class EmballageEntreComponent implements OnInit{
  emballageEntreFormGroup!:FormGroup;
  operation!: Observable<Array<Operation>>;
  errMessage!:String;


  ngOnInit(): void {
    this.handelGetOperationsEmbaEntr()
  }


  constructor(private operationService :OperationsService, private fb : FormBuilder,
              private route:ActivatedRoute,private router:Router,private redirectService: RedirectService) {
  }

  handelGetOperationsEmbaEntr(){
    this.operation=this.operationService.getOperationsEmbEnt().pipe(
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
    this.router.navigateByUrl("/updateOperation/"+o.idOperation);
    this.redirectService.setRedirectTo('/OpEmbEntr');
  }
}
