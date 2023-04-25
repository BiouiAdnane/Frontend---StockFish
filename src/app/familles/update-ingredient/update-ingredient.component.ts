import {Component, OnInit} from '@angular/core';
import {Famille} from "../../model/famille";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientService} from "../../services/ingredient.service";

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrls: ['./update-ingredient.component.css']
})
export class UpdateIngredientComponent implements OnInit{

  id_Famille!:number;
  ingredient!:Famille;
  updateIngredientFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public ingredientService : IngredientService, private fb : FormBuilder) {
    this.ingredient=this.router.getCurrentNavigation()?.extras.state as Famille;
    this.updateIngredientFormGroup=new FormGroup({
      id_Famille:new FormControl(),
      nom:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.id_Famille=this.route.snapshot.params['id_Famille'];
    this.ingredientService.getIngredient(this.id_Famille).subscribe({
      next:(ingredient)=>{
        this.ingredient=ingredient;
        this.updateIngredientFormGroup=this.fb.group({
          id_Famille:this.fb.control(this.ingredient.id_Famille),
          nom:this.fb.control(this.ingredient.nom),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateIngredient() {
    let i= this.updateIngredientFormGroup.value;
    i.id_Famille=this.ingredient.id_Famille;
    this.ingredientService.saveIngredient(i).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/ingredient")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
