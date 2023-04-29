import {Component, OnInit} from '@angular/core';
import {Article} from "../model/article";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Famille} from "../model/famille";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {FamilleService} from "../services/famille.service";
import {Operation, TypeOp} from "../model/operation";
import {UserOperationsService} from "../services/user-operations.service";

@Component({
  selector: 'app-update-operation',
  templateUrl: './update-operation.component.html',
  styleUrls: ['./update-operation.component.css']
})
export class UpdateOperationComponent implements OnInit{

  idOperation!:number;
  operation!:Operation;
  updateOperationFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})


  constructor(private route:ActivatedRoute,private router:Router, public operationService : UserOperationsService,
              private fb : FormBuilder) {
    this.operation=this.router.getCurrentNavigation()?.extras.state as Operation;
    this.updateOperationFormGroup=new FormGroup({
      idOperation:new FormControl(),
      typeOpr:new FormControl(),
      quantite:new FormControl(),
      n_Lot:new FormControl(),
      allee:new FormControl(),
      rangee:new FormControl(),
      niveau:new FormControl(),
      dateOpertaion:new FormControl(),
      code_Article:new FormControl(),
      code_Depot:new FormControl(),
      matriculation:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.idOperation=this.route.snapshot.params['idOperation'];
    this.operationService.getOperation(this.idOperation).subscribe({
      next:(operation)=>{
        this.operation=operation;
        this.updateOperationFormGroup=this.fb.group({
          idOperation:this.fb.control(this.operation.idOperation),
          typeOpr:this.fb.control(this.operation.typeOpr),
          code_Article:this.fb.control(this.operation.code_Article),
          designation:this.fb.control(this.operation.designation),
          code_Depot:this.fb.control(this.operation.code_Depot),
          matriculation:this.fb.control(this.operation.matriculation),
          quantite:this.fb.control(this.operation.quantite),
          n_Lot:this.fb.control(this.operation.n_Lot),
          allee:this.fb.control(this.operation.allee),
          rangee: this.fb.control(this.operation.rangee),
          niveau: this.fb.control(this.operation.niveau),
          dateOpertaion: this.fb.control(this.operation.dateOpertaion ),



        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateOperation() {
    let o= this.updateOperationFormGroup.value;
    o.idOperation=this.operation.idOperation;
    this.operationService.updateOperation(o).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/userOperations")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}

