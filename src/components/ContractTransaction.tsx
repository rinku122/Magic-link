import { useState, useRef, useEffect } from "react";
import { HStack, Box, VStack, Input, Button, Text } from "@chakra-ui/react";
import { useWeb3 } from "../context/Web3Context";
import { useUser } from "../context/UserContext";
import { useContract } from "../context/Contract";

const ContractTransaction = () => {
  // Use the Web3Context to get the current instance of web3
  const { web3 } = useWeb3();
  // Use the UserContext to get the current logged-in user
  const { user } = useUser();
  // Use the ContractContext to get the contract object
  const { contract } = useContract();

  const [response, setResponse] = useState(0);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string>();


  const getContractValue = async () => {
    const ans = await contract.methods.retrieve().call();
    setResponse(ans.toString());
  };

  useEffect(() => {
    if (contract) {
      getContractValue();
    }
  }, [contract]);

  getContractValue();

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSendTransaction = async () => {
    if (user && web3 && contract) {
      try {
        setValue("");
        setLoading(true);
        const gasPrice = await web3.eth.getGasPrice();
        const gas = await contract.methods
          .store(value)
          .estimateGas({ from: user });
        await contract.methods.store(value).send({ from: user, gasPrice, gas });

        await getContractValue();
        setLoading(false);
      } catch (error) {
        // Log any errors that occur during the signing process
        console.error("handleSignMessage:", error);
      }
    }
  };

  // Render the component
  return (
    <HStack justifyContent="flex-start" alignItems="flex-start">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="10px"
      >
        <VStack>
          <Input
            placeholder="Enter Value"
            maxLength={5}
            onChange={handleInputValue}
            w="300px"
            value={value}
          />
          <Button onClick={handleSendTransaction}>
            {loading ? "Calling Contract....." : "Call Contract"}
          </Button>
        </VStack>
        <p> Value : {response} </p>
      </Box>
    </HStack>
  );
};

export default ContractTransaction;
