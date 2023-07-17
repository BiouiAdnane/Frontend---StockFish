import {Famille} from "./famille";

export interface Article{
  code_Article:number;
  designiation:String;
  quantite_Article:number;
  size:Size;
  typeArticle:TypeArticle;
  ingredient:Famille;
  marque:Famille;
  nature:Famille;
  qualite:Famille;

}
export enum Size{
  Big="Big",
  Medium=" Medium",
  Small="Small"
}
export enum TypeArticle{
  Produit_Fini="Produit_Fini",
  Couverle=" Couverle",
  Boite_Vide="Boite_Vide",
  Etui="Etui",
  Carton="Carton"
}
