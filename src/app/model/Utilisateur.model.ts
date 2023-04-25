export interface Utilisateur{
matriculation:number;
typeEmploye:String;
prenom:String;
nom:String;
email:String;
adresse:String;
tel:String;

}

export enum typeEmploye{
  Administrateur="Administrateur",
  Gestionaire_Emballage="Gestionaire_Emballage",
  Gestionaire_ProduitFini="Gestionaire_ProduitFini,"
}
