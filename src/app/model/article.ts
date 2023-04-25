import {Famille} from "./famille";

export interface Article{
  code_Article:number;
  designiation:String;
  quantite_Article:number;
  ingredient:Famille;
  marque:Famille;
  nature:Famille;
  qualite:Famille;
}
