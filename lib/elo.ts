export const K_FACTOR = 32; // Volatility. Higher = Faster rank changes.

export function calculateElo(winnerElo: number, loserElo: number) {
  // 1. Calculate Expected Score (Probability of winning)
  const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  
  // 2. Calculate Delta (Change)
  // If winner had 90% chance to win, they gain few points.
  // If winner had 10% chance to win (Upset), they gain MANY points.
  const delta = Math.round(K_FACTOR * (1 - expectedWinner));

  return {
    winnerNew: winnerElo + delta,
    loserNew: loserElo - delta,
    delta
  };
}