import {Component, OnInit} from '@angular/core';
import {Depot} from "../../model/depot";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Famille} from "../../model/famille";
import {ActivatedRoute, Router} from "@angular/router";
import {DepotService} from "../../services/depot-service";
import {MarqueService} from "../../services/marque.service";

@Component({
  selector: 'app-update-marque',
  templateUrl: './update-marque.component.html',
  styleUrls: ['./update-marque.component.css']
})
export class UpdateMarqueComponent implements OnInit{

  id_Famille!:number;
  marque!:Famille;
  updateMarqueFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})

  constructor(private route:ActivatedRoute,private router:Router, public marqueService : MarqueService, private fb : FormBuilder) {
    this.marque=this.router.getCurrentNavigation()?.extras.state as Famille;
    this.updateMarqueFormGroup=new FormGroup({
      id_Famille:new FormControl(),
      nom:new FormControl(),
    })

  }

  ngOnInit(): void {
    this.id_Famille=this.route.snapshot.params['id_Famille'];
    this.marqueService.getMarque(this.id_Famille).subscribe({
      next:(marque)=>{
        this.marque=marque;
        this.updateMarqueFormGroup=this.fb.group({
          id_Famille:this.fb.control(this.marque.id_Famille),
          nom:this.fb.control(this.marque.nom),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

  handleUpdateMarque() {
    let m= this.updateMarqueFormGroup.value;
    m.id_Famille=this.marque.id_Famille;
    this.marqueService.saveMarque(m).subscribe({
      next : (data)=>{
        alert("La modification est faite avec succée");
        this.router.navigateByUrl("/marque")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
