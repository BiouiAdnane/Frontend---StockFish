import {Component, NgIterable, OnInit} from '@angular/core';
import {Operation, TypeOp} from "../../model/operation";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserOperationsService} from "../../services/user-operations.service";
import {RedirectService} from "../../services/redirect.service";
import {SaveOpExceptionService} from "../../services/save-op-exception.service";
import {OperationsService} from "../../services/operations.service";
import {Observable} from "rxjs";
import {Entree} from "../../model/Entree";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../model/article";

@Component({
  selector: 'app-new-emballage-entre',
  templateUrl: './new-emballage-entre.component.html',
  styleUrls: ['./new-emballage-entre.component.css']
})
export class NewEmballageEntreComponent implements OnInit{
  codeArticle!:number;
  infoArticle! : Article;
  public isFormSubmitted: boolean = false;
  errorMessage!:string;
  operation!:Operation;
  newOperationEmbFormGroup!: FormGroup;
  newNbrOpEmbFormGroup!:FormGroup;
  isCustomLot = false;
  code_Depot:number=1;
  allees!: Observable<Array<number>> & NgIterable<number>;
  selectedAllee!: number ;
  selectedRangee!: number ;
  selectedQuantite!: number ;
  selectedArticle!: number ;
  palleteQuantite!:number;
  rangees!: Observable<Array<number>> & NgIterable<number>;
  niveaux!: Observable<Array<number>> & NgIterable<number>;
  nbrOperation!:number;
  listQuat!:number[];
  currentQuantiteIndex: number = 0;
  form: FormGroup = this.fb.group({})


  constructor(private route:ActivatedRoute,private router:Router, public operationService : UserOperationsService,public opService :OperationsService,
              private fb : FormBuilder,private redirectService: RedirectService,public exceptionService:SaveOpExceptionService,
              private articleService : ArticleService) {
    this.newOperationEmbFormGroup=new FormGroup({
      idOperation:new FormControl(),
      typeOpr:new FormControl(),
      quantite:new FormArray([new FormControl()]),
      quantiteTotale:new FormControl(),
      n_Lot:new FormControl(),
      allee:new FormControl(),
      rangee:new FormControl(),
      niveau:new FormControl(),
      dateOpertaion:new FormControl(),
      code_Article:new FormControl(),
      code_Depot:new FormControl(),
      matriculation:new FormControl(),
    });

    this.newNbrOpEmbFormGroup=new FormGroup({

      typeOpr:new FormControl(),
      quantiteTotale:new FormControl(),
      n_Lot:new FormControl(),
      code_Article:new FormControl(),
      code_Depot:new FormControl(),
      matriculation:new FormControl(),
    })

  }

  ngOnInit(): void {

    this.newNbrOpEmbFormGroup=this.fb.group({
      typeOpr: this.fb.control("E"),
      code_Article: this.fb.control(null),
      designation: this.fb.control(null),
      code_Depot: this.fb.control(1),
      matriculation: this.fb.control(null),
      quantiteTotale: this.fb.control(null),
      n_Lot: this.fb.control(null),


    });

    this.newOperationEmbFormGroup=this.fb.group({
      idOperation:this.fb.control(0),
      typeOpr: this.fb.control("E"),
      code_Article: this.fb.control(null),
      designation: this.fb.control(null),
      code_Depot: this.fb.control(1),
      matriculation: this.fb.control(null),
      quantite: this.fb.control(null),
      quantiteTotale: this.fb.control(null),
      n_Lot: this.fb.control(null),
      allee: this.fb.control(null),
      rangee: this.fb.control(null),
      niveau: this.fb.control(null),
      dateOpertaion: this.fb.control(null),

    });
    this.allees=this.opService.getAlleeDispo(this.code_Depot) as Observable<Array<number>> & NgIterable<number>
    this.newOperationEmbFormGroup.get('allee')!.valueChanges.subscribe(value => {
      this.selectedAllee = value;
      this.rangees=this.opService.getRangeeDispo(this.code_Depot,this.selectedAllee)as Observable<number[]> & NgIterable<number>

    });
    this.newOperationEmbFormGroup.get('rangee')!.valueChanges.subscribe(value => {
      this.selectedRangee = value;
      this.niveaux=this.opService.getNiveauDispo(this.code_Depot,this.selectedAllee,this.selectedRangee)as Observable<number[]> & NgIterable<number>

    });

    this.newNbrOpEmbFormGroup.get('quantiteTotale')!.valueChanges.subscribe(value => {
      this.selectedQuantite = value;
    });
    this.newNbrOpEmbFormGroup.get('code_Article')!.valueChanges.subscribe(value => {
      this.selectedArticle = value;
    });



  }

  get quantiteFormArray(): FormArray {
    return this.newOperationEmbFormGroup.get('quantite') as FormArray;
  }


  handelGetNbrOperations(){
     this.opService.getNbrOperations(this.selectedArticle, this.selectedQuantite).subscribe(
      (data: Entree) => {
        this.nbrOperation = data.nombre;
        this.listQuat = data.quantites;


        // Assurez-vous que l'index est inférieur à la taille de la liste
        if (this.currentQuantiteIndex < this.listQuat.length) {
          // Récupérez la valeur suivante de la liste ListQua
          const nextQuantite = this.listQuat[this.currentQuantiteIndex];

          // Mettez à jour la valeur de quantite dans le formulaire
          this.newOperationEmbFormGroup.patchValue({
            quantite: nextQuantite
          });

          // Incrémentez l'index pour la prochaine répétition
          this.currentQuantiteIndex++;
        }
      }
    );

  }



  handleNlotpardefeaut(){
    let data: Operation=this.newOperationEmbFormGroup.value;
    this.operationService.saveOperation(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait par succés");
      }, error:(err)=>{
        console.log(err);
        this.errorMessage = err;
      }
    })
  }

  handleNlotPersonaliser() {
    let data: Operation = this.newOperationEmbFormGroup.value;
    this.exceptionService.createNewOperation(data).subscribe({
      next: (data) => {
        alert("L'enregistrement est fait par succés");
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

  validateAndTransferFormValues() {
    const newNbrOpEmbFormValues = this.newNbrOpEmbFormGroup.value;

    // Transférer les valeurs vers newOperationEmbFormGroup
    this.newOperationEmbFormGroup.patchValue({
      code_Article: newNbrOpEmbFormValues.code_Article,
      quantiteTotale: newNbrOpEmbFormValues.quantiteTotale,
      n_Lot: newNbrOpEmbFormValues.n_Lot,
      matriculation: newNbrOpEmbFormValues.matriculation
    });

    // Marquer tous les champs du formulaire newOperationEmbFormGroup comme touchés
    this.markAllFieldsAsTouched(this.newOperationEmbFormGroup);
    this.isFormSubmitted = true;
    if (this.newNbrOpEmbFormGroup.valid) {
      this.articleService.getArticle(this.selectedArticle).subscribe(value => {
        this.infoArticle = value;
        if (this.infoArticle.size === "Big") {
          this.palleteQuantite = 3000;
        } else if (this.infoArticle.size === "Small") {
          this.palleteQuantite = 5000;
        } else {
          this.palleteQuantite = 4000;
        }
      });
    }
  }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}
