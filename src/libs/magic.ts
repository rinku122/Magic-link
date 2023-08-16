import { Magic } from "magic-sdk";

// Initialize the Magic instance
export const magic = new Magic("pk_live_57037683477BA2BB", {
  network: {
    rpcUrl:
      "https://eth-goerli.g.alchemy.com/v2/lGtgNbbWKPdScRo9t3qLpYxWs60DwBbw",
    chainId: 5,
  },
});
