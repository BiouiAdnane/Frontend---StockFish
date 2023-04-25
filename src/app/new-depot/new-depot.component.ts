import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DepotService} from "../services/depot-service";
import {Depot} from "../model/depot";

@Component({
  selector: 'app-new-depot',
  templateUrl: './new-depot.component.html',
  styleUrls: ['./new-depot.component.css']
})
export class NewDepotComponent implements OnInit{

  newDepotFormGroup!:FormGroup;

  constructor(private fb: FormBuilder, private depotService: DepotService) {
  }

  ngOnInit(): void {
    this.newDepotFormGroup = this.fb.group({
      nom_Depot: ['', Validators.required],
      qauntiteMax: ['', Validators.required],
      quantiteActuelle: ['', Validators.required],
      nbrMaxAllee: ['', Validators.required],
      nbrMaxRangee: ['', Validators.required],
      nbrMaxNiveau: ['', Validators.required]
    });
  }

  handleSaveDepot() {
    if (this.newDepotFormGroup.invalid) {
      alert("Veuillez remplir correctement tous les champs du formulaire.");
      return;
    }

    let data: Depot=this.newDepotFormGroup.value;
    this.depotService.saveDepot(data).subscribe({
      next:(data)=>{
        alert("L'enregistrement est fait avec succès");
        this.newDepotFormGroup.reset();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
