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

export enum MoyenPaymentFilter {
  ORANGE_MONEY = 'Orange Money',
  WAVE = 'Wave',
  FREE_MONEY = 'Free Money',
  CASH_TOUCHPOINT = 'Cash Touchpoint',
  CHEQUE = 'Chèque',
  CARTE_BANCAIRE = 'Carte Bancaire',
  ASSURANCE = 'Assurance',
  CASH = 'Cash'
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

export enum TransactionStatusFilter {
  INITIATED = 'Initié',
  SUCCESS = 'Succès',
  FAILED = 'Echec',
  PENDING = 'En cours'
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
