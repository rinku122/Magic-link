import React, { createContext, useContext, useEffect, useState } from "react";
import { useWeb3 } from "./Web3Context";

// Define the type for the user context.
type ContractContextType = {
  contract: any | null;
};

// Create a context for user data.
const ContractContext = createContext<ContractContextType>({
  contract: null,
});

// Custom hook for accessing user context data.
export const useContract = () => useContext(ContractContext);

// Provider component that wraps parts of the app that need user context.
export const ContractProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { web3 }: any = useWeb3();
  const [contract, setContract] = useState<any | null>(null);

  // Function to retrieve and set user's account.
  const initilaizeContract = async () => {
    // Use Web3 to get user's accounts.

    const _contract: any = new web3.eth.Contract(
      [
        {
          inputs: [],
          name: "retrieve",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "num",
              type: "uint256",
            },
          ],
          name: "store",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      "0xc8cce861eBD656e47029c80864Dc02CF962e2e7b"
    );

    // Update the user state with the first account (if available), otherwise set to null.
    setContract(_contract);
  };

  useEffect(() => {
    if (web3) {
      initilaizeContract();
    }
  }, [web3]);

  return (
    <ContractContext.Provider
      value={{
        contract: contract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
