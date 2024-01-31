import {EntiteBase} from "./entite-base";
import {PrestationInterface} from "./prestation.interface";
import {PersonnelInterface} from "./personnel.interface";

export interface TransactionInterface extends EntiteBase{
  id : number;
  token : string;
  amount : number;
  totalAmount : number;
  moyenPayment : MoyenPayment;
  transactionType : TransactionType;
  transactionStatus :  TransactionStatus;
  transactionAmount : number;
  referencePartenaire : string;
  prestation : PrestationInterface;
  personnel : PersonnelInterface

}

export enum MoyenPayment{
  ORANGE_MONEY = "ORANGE_MONEY",
  WAVE = "WAVE",
  FREE_MONEY = "FREE_MONEY",
  CASH_TOUCHPOINT = "CASH_TOUCHPOINT",
  CHEQUE = "CHEQUE",
  VIREMENT = "VIREMENT",
  ASSURANCE = "ASSURANCE",
  ESPECE = "ESPECE"
}

export enum TransactionStatus{
  INITIATED = "INITIATED",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  PENDING = "PENDING"
}

export enum TransactionType{
  ENCAISSEMENT = "ENCAISSEMENT"
}
