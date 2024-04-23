import { StrategyAction, TradeAction } from '@prisma/client';

export interface TradeResult {
  status: TradeAction;
  calculated: number;
}

export interface CalculateStrategies {
  [StrategyAction.CCI]: TradeResult;
  [StrategyAction.RSI]: TradeResult;
  [StrategyAction.STOCH]: TradeResult;
  [StrategyAction.MACD]: TradeResult;
  [StrategyAction.PPO]: TradeResult;
  [StrategyAction.DEMA]: TradeResult;
}
