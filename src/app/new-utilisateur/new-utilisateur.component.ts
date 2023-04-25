import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../services/utilisateur.service";
import {typeEmploye, Utilisateur} from "../model/Utilisateur.model";

@Component({
  selector: 'app-new-utilisateur',
  templateUrl: './new-utilisateur.component.html',
  styleUrls: ['./new-utilisateur.component.css']
})
export class NewUtilisateurComponent implements OnInit{

  newPersonneFormGroup!:FormGroup;
  selectedType!: typeEmploye;


  constructor(private fb: FormBuilder, private utilisateurService: UtilisateurService) {
  }


  ngOnInit(): void {
    this.newPersonneFormGroup=this.fb.group({
      nom:this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      prenom:this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      email:this.fb.control(null, [Validators.required, Validators.email]),
      adresse:this.fb.control(null),
      tel:this.fb.control(212),
      typeEmploye:this.fb.control(null, [Validators.required]),
    })
  }

  handleSavePersonne(){

    let data: Utilisateur=this.newPersonneFormGroup.value;
    this.utilisateurService.savePersonne(data).subscribe({
        next:(data)=>{
          alert("L'enregistrement est fait par succés");
          this.newPersonneFormGroup.reset();

        }, error:(err)=>{
          console.log(err)
      }
    })


  }
}
