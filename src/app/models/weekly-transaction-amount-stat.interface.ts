import {WeeklyDataStat} from "./weekly-data-stat";

export interface WeeklyTransactionAmountStatInterface {
  cashTransactionStats: WeeklyDataStat;
  waveTransactionStats: WeeklyDataStat;
  omTransactionStats: WeeklyDataStat;
}
