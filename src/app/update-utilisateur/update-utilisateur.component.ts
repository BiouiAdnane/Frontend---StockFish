import {Component, OnInit} from '@angular/core';
import {typeEmploye, Utilisateur} from "../model/Utilisateur.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {UtilisateurService} from "../services/utilisateur.service";

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.css']
})
export class UpdateUtilisateurComponent implements OnInit{
  matriculation!:number;
  personne!:Utilisateur;
  updatePersonneFormGroup!: FormGroup;
  form: FormGroup = this.fb.group({})
  selectedType!: typeEmploye;

  constructor(private route:ActivatedRoute,private router:Router, public utilisateurService : UtilisateurService, private fb : FormBuilder) {
    this.personne=this.router.getCurrentNavigation()?.extras.state as Utilisateur;

    this.updatePersonneFormGroup=new FormGroup({
      nom:new FormControl(),
      prenom:new FormControl(),
      email:new FormControl(),
      adresse:new FormControl(),
      typeEmploye:new FormControl(),
      tel:new FormControl()
    })

  }

  ngOnInit(): void {
    this.matriculation=this.route.snapshot.params['matriculation'];
    this.utilisateurService.getPersonne(this.matriculation).subscribe({
      next:(personne)=>{
        this.personne=personne;

        // Assigner la valeur sélectionnée à la propriété selectedType
        this.selectedType = this.personne.typeEmploye as typeEmploye;


        this.updatePersonneFormGroup=this.fb.group({
          matriculation:this.fb.control(this.personne.matriculation),
          nom:this.fb.control(this.personne.nom),
          prenom:this.fb.control(this.personne.prenom),
          adresse:this.fb.control(this.personne.adresse),
          email:this.fb.control(this.personne.email),
          tel: this.fb.control(this.personne.tel),
          typeEmploye:this.fb.control(this.selectedType),
        })
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }


  handleUpdatePersonne() {
    let p= this.updatePersonneFormGroup.value;
    p.matriculation=this.personne.matriculation;
    this.utilisateurService.updatePersonne(p).subscribe({
        next : (data)=>{
          alert("La modification est faite avec succée");
          this.updatePersonneFormGroup.reset();
          this.router.navigateByUrl("/users")
        },
      error:err => {
        console.log(err);
      }
    })

  }
}
