import {Component, OnInit} from '@angular/core';
import {Famille} from "../../model/famille";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MarqueService} from "../../services/marque.service";
import {NatureService} from "../../services/nature.service";

@Component({
  selector: 'app-update-nature',
  templateUrl: './update-nature.component.html',
  styleUrls: ['./update-nature.component.css']
})
export class UpdateNatureComponent implements OnInit{

  id_Famille!:number;
  nature!:Famille;
  updateNatureFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public natureService : NatureService, private fb : FormBuilder) {
    this.nature=this.router.getCurrentNavigation()?.extras.state as Famille;
    this.updateNatureFormGroup=new FormGroup({
      id_Famille:new FormControl(),
      nom:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.id_Famille=this.route.snapshot.params['id_Famille'];
    this.natureService.getNature(this.id_Famille).subscribe({
      next:(nature)=>{
        this.nature=nature;
        this.updateNatureFormGroup=this.fb.group({
          id_Famille:this.fb.control(this.nature.id_Famille),
          nom:this.fb.control(this.nature.nom),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateNature() {
    let n= this.updateNatureFormGroup.value;
    n.id_Famille=this.nature.id_Famille;
    this.natureService.saveNature(n).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/nature")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
