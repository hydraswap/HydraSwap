import { USE_MARKETS } from './markets';

export const findTVMarketFromAddress = (marketAddressString: string) => {
  // USE_MARKETS.forEach((market) => {
  //   if (market.address.toBase58() === marketAddressString) {
  //     return market.name;
  //   }
  // });
  let market;
  for (let i = 0; i < USE_MARKETS.length; i++) {
    market = USE_MARKETS[i];
    if (market.address.toBase58() === marketAddressString) {
      return market.name;
    }
  }
  return 'SRM/USDC';
};
