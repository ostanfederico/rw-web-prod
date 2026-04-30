export const wrappedData = {
  year: 2025,
  totalVolume: 48291,
  totalTxCount: 80,
  activity: {
    buys: 34,
    sells: 12,
    swaps: 8,
    sends: 15,
    receives: 11,
  },
  topTokens: [
    { symbol: "BTC", name: "Bitcoin", volume: 28400 },
    { symbol: "ETH", name: "Ethereum", volume: 12800 },
    { symbol: "SOL", name: "Solana", volume: 5200 },
  ],
  favouriteActivity: "Buying",
  favouriteActivityPct: 43,
  biggestTx: { amount: 12400, token: "BTC", type: "purchase", date: "March 14" },
  personality: {
    title: "The HODLer",
    description:
      "You buy and rarely sell. Diamond hands. Your portfolio is in it for the long game.",
  },
  topPct: 8,
  topToken: "BTC",
  mostActiveMonth: "November",
  mostActiveMonthIndex: 10,
};

export type WrappedData = typeof wrappedData;
