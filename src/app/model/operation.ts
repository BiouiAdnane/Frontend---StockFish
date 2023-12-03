import {Article} from "./article";
import {Depot} from "./depot";
import {Utilisateur} from "./Utilisateur.model";

export interface Operation{
  idOperation:number;
  typeOpr:TypeOp;
  code_Article:number;
  designation:String;
  code_Depot:number;
  matriculation:number;
  quantite:number;
  n_Lot:String
  allee:number;
  rangee:number;
  niveau:number;
  dateOpertaion:Date;
}


export enum TypeOp{
  E="E",
  S="S"
}
