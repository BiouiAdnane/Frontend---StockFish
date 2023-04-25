import {Component, OnInit} from '@angular/core';
import {typeEmploye, Utilisateur} from "../model/Utilisateur.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilisateurService} from "../services/utilisateur.service";
import {Depot} from "../model/depot";
import {DepotService} from "../services/depot-service";

@Component({
  selector: 'app-update-depot',
  templateUrl: './update-depot.component.html',
  styleUrls: ['./update-depot.component.css']
})
export class UpdateDepotComponent implements OnInit{

  code_Depot!:number;
  depot!:Depot;
  updateDepotFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public depotService : DepotService, private fb : FormBuilder) {
    this.depot=this.router.getCurrentNavigation()?.extras.state as Depot;
    this.updateDepotFormGroup=new FormGroup({
      code_Depot:new FormControl(),
      nom_Depot:new FormControl(),
      qauntiteMax:new FormControl(),
      quantiteActuelle:new FormControl(),
      nbrMaxAllee:new FormControl(),
      nbrMaxRangee:new FormControl(),
      nbrMaxNiveau:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.code_Depot=this.route.snapshot.params['code_Depot'];
    this.depotService.getDepot(this.code_Depot).subscribe({
      next:(depot)=>{
        this.depot=depot;
        this.updateDepotFormGroup=this.fb.group({
          code_Depot:this.fb.control(this.depot.code_Depot),
          nom_Depot:this.fb.control(this.depot.nom_Depot),
          qauntiteMax:this.fb.control(this.depot.qauntiteMax),
          quantiteActuelle:this.fb.control(this.depot.quantiteActuelle),
          nbrMaxAllee:this.fb.control(this.depot.nbrMaxAllee),
          nbrMaxRangee: this.fb.control(this.depot.nbrMaxRangee),
          nbrMaxNiveau: this.fb.control(this.depot.nbrMaxNiveau),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateDepot() {
    let d= this.updateDepotFormGroup.value;
    d.code_Depot=this.depot.code_Depot;
    this.depotService.saveDepot(d).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/depot")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
