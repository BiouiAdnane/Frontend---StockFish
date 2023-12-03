import {Component, NgIterable, OnInit} from '@angular/core';
import {Operation, TypeOp} from "../../model/operation";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserOperationsService} from "../../services/user-operations.service";
import {RedirectService} from "../../services/redirect.service";
import {Observable} from "rxjs";
import {OperationsService} from "../../services/operations.service";
import {SaveOpExceptionService} from "../../services/save-op-exception.service";

@Component({
  selector: 'app-new-prod-fini-entre',
  templateUrl: './new-prod-fini-entre.component.html',
  styleUrls: ['./new-prod-fini-entre.component.css']
})
export class NewProdFiniEntreComponent implements OnInit{

  errorMessage!:string;
  operation!:Operation;
  newOperationPrfFormGroup!: FormGroup;
  isCustomLot = false;
  code_Depot:number=2;
  allees!: Observable<Array<number>> & NgIterable<number>;
  selectedAllee!: number ;
  selectedRangee!: number ;
  rangees!: Observable<Array<number>> & NgIterable<number>;
  niveaux!: Observable<Array<number>> & NgIterable<number>;
  form: FormGroup = this.fb.group({})


  constructor(private route:ActivatedRoute,private router:Router, public operationService : UserOperationsService,public opService :OperationsService,
              private fb : FormBuilder,private redirectService: RedirectService,public exceptionService:SaveOpExceptionService) {
    this.newOperationPrfFormGroup=new FormGroup({
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

    this.newOperationPrfFormGroup=this.fb.group({
      idOperation:this.fb.control(0),
      typeOpr: this.fb.control("E"),
      code_Article: this.fb.control(null),
      designation: this.fb.control(null),
      code_Depot: this.fb.control(2),
      matriculation: this.fb.control(null),
      quantite: this.fb.control(null),
      n_Lot: this.fb.control(null),
      allee: this.fb.control(null),
      rangee: this.fb.control(null),
      niveau: this.fb.control(null),
      dateOpertaion: this.fb.control(null),

    });
    this.allees=this.opService.getAlleeDispo(this.code_Depot)as Observable<Array<number>> & NgIterable<number>
    this.newOperationPrfFormGroup.get('allee')!.valueChanges.subscribe(value => {
      this.selectedAllee = value;
      this.rangees=this.opService.getRangeeDispo(this.code_Depot,this.selectedAllee)as Observable<number[]> & NgIterable<number>

    });
    this.newOperationPrfFormGroup.get('rangee')!.valueChanges.subscribe(value => {
      this.selectedRangee = value;
      this.niveaux=this.opService.getNiveauDispo(this.code_Depot,this.selectedAllee,this.selectedRangee)as Observable<number[]> & NgIterable<number>

    });

  }

  handleNlotpardefeaut(){
    let data: Operation=this.newOperationPrfFormGroup.value;
    this.operationService.saveOperation(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait par succés");
        this.newOperationPrfFormGroup.reset();
        this.router.navigateByUrl('/OpPfEntr')
      }, error:(err)=>{
        console.log(err);
        this.errorMessage = err; // stocke le message d'erreur dans la variable
      }
    })
  }

  handleNlotPersonaliser() {
    let data: Operation = this.newOperationPrfFormGroup.value;
    this.exceptionService.createNewOperation(data).subscribe({
      next: (data) => {
        alert("L'enregistrement est fait par succés");
        this.newOperationPrfFormGroup.reset();
        this.router.navigateByUrl('/OpPfEntr');
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }


  toggleButton(): void {
    const button = document.getElementById('myButton') as HTMLButtonElement;
    if (button.classList.contains('off')) {
      button.classList.remove('off');
      button.classList.add('on');
      button.innerHTML = "N° Lot d'aujourd'hui";
      this.isCustomLot = false;
    } else {
      button.classList.remove('on');
      button.classList.add('off');
      button.innerHTML = 'N° Lot personaliser';
      this.isCustomLot = true;
    }
  }

}

