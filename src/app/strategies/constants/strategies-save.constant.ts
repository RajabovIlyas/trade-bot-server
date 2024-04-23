import { StrategyAction } from '@prisma/client';
import { StrategiesService } from '../strategies.service';

export const SP_SAVE_PROPERTY: Array<{
  key: StrategyAction;
  strategyKey: keyof StrategiesService;
}> = [
  { key: StrategyAction.CCI, strategyKey: 'checkCCI' },
  { key: StrategyAction.RSI, strategyKey: 'checkRSI' },
  { key: StrategyAction.STOCH, strategyKey: 'checkSTOCH' },
  { key: StrategyAction.MACD, strategyKey: 'checkMACD' },
  { key: StrategyAction.PPO, strategyKey: 'checkPPO' },
  { key: StrategyAction.DEMA, strategyKey: 'checkDEMA' },
];
