import {Component, OnInit} from '@angular/core';
import {Famille} from "../../model/famille";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {QualiteService} from "../../services/qualite.service";

@Component({
  selector: 'app-update-qualite',
  templateUrl: './update-qualite.component.html',
  styleUrls: ['./update-qualite.component.css']
})
export class UpdateQualiteComponent implements OnInit{

  id_Famille!:number;
  qualite!:Famille;
  updateQualiteFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public qualiteService : QualiteService, private fb : FormBuilder) {
    this.qualite=this.router.getCurrentNavigation()?.extras.state as Famille;
    this.updateQualiteFormGroup=new FormGroup({
      id_Famille:new FormControl(),
      nom:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.id_Famille=this.route.snapshot.params['id_Famille'];
    this.qualiteService.getQualite(this.id_Famille).subscribe({
      next:(qualite)=>{
        this.qualite=qualite;
        this.updateQualiteFormGroup=this.fb.group({
          id_Famille:this.fb.control(this.qualite.id_Famille),
          nom:this.fb.control(this.qualite.nom),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateQualite() {
    let q= this.updateQualiteFormGroup.value;
    q.id_Famille=this.qualite.id_Famille;
    this.qualiteService.saveQualite(q).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/qualite")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
