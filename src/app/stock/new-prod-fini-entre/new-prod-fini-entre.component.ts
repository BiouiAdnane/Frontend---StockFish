import {Component, OnInit} from '@angular/core';
import {Operation, TypeOp} from "../../model/operation";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserOperationsService} from "../../services/user-operations.service";
import {RedirectService} from "../../services/redirect.service";

@Component({
  selector: 'app-new-prod-fini-entre',
  templateUrl: './new-prod-fini-entre.component.html',
  styleUrls: ['./new-prod-fini-entre.component.css']
})
export class NewProdFiniEntreComponent implements OnInit{
  operation!:Operation;
  newOperationPrdFiniFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})


  constructor(private route:ActivatedRoute,private router:Router, public operationService : UserOperationsService,
              private fb : FormBuilder,private redirectService: RedirectService) {
    this.newOperationPrdFiniFormGroup=new FormGroup({
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

    this.newOperationPrdFiniFormGroup=this.fb.group({
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
  }

  handleNlotpardefeaut(){
    let data: Operation=this.newOperationPrdFiniFormGroup.value;
    this.operationService.saveOperation(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait par succés");
        this.newOperationPrdFiniFormGroup.reset();
        this.router.navigateByUrl('/OpPfEntr')
      }, error:(err)=>{
        console.log(err)
      }
    })
  }

  handleNlotPersonaliser(){
    let data: Operation=this.newOperationPrdFiniFormGroup.value;
    this.operationService.updateOperation(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait par succés");
        this.newOperationPrdFiniFormGroup.reset();
        this.router.navigateByUrl('/OpPfEntr')
      }, error:(err)=>{
        console.log(err)
      }
    })
  }

  isCustomLot = false;

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
