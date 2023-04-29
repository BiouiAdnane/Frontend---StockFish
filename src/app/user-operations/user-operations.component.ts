import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {catchError, map, Observable, throwError} from "rxjs";
import {Article} from "../model/article";
import {ArticleService} from "../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Operation} from "../model/operation";
import {UserOperationsService} from "../services/user-operations.service";
import {Utilisateur} from "../model/Utilisateur.model";
import {RedirectService} from "../services/redirect.service";

@Component({
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.css']
})
export class UserOperationsComponent implements OnInit{
  userOperationsFormGroup!:FormGroup;
  operation!: Observable<Array<Operation>>;
  errMessage!:String;
  matriculation!:number;


  ngOnInit(): void {
    this.handelGetUserOperations()
  }


  constructor(private userOperationService :UserOperationsService, private fb : FormBuilder,
              private route:ActivatedRoute,private router:Router,private redirectService: RedirectService) {
  }

  handelGetUserOperations(){
    this.matriculation=this.route.snapshot.params['matriculation'];
    this.operation=this.userOperationService.getUserOperations(this.matriculation).pipe(
      catchError(err=>{
        this.errMessage=err.message;
        return throwError(err);

      })
    )
  }


  handledDeleteOperation(o: Operation) {
    let conf=confirm("Voulez vous supprimer cette operation ?")
    if (!conf) return;
    this.userOperationService.deleteOperation(o.idOperation).subscribe({
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
    this.redirectService.setRedirectTo('/users');
  }
}

