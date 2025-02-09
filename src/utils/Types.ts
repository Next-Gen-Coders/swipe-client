export enum RiskToleranceLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface SwipeCard {
  id: string;
  name: string;
  symbol: string;
  position_type: "long" | "short";
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  reasoning: string;
  base_contract: string;
  current_price: number;
  price_change_24h: number;
  image: {
    large: string;
    small: string;
    thumb: string;
  };
}
