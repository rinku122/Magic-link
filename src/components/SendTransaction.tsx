import { useState, useRef } from "react";
import { HStack, Box, VStack, Input, Button, Text } from "@chakra-ui/react";
import { useWeb3 } from "../context/Web3Context";
import { useUser } from "../context/UserContext";

const SendTransaction = () => {
  // Use the Web3Context to get the current instance of web3
  const { web3 } = useWeb3();
  // Use the UserContext to get the current logged-in user
  const { user } = useUser();

  // Initialize state for message and signature
  const [value, setValue] = useState("");
  const [destinationAddress, setdestinationAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Define the handler for input change, it updates the message state with input value
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleDestinationAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setdestinationAddress(e.target.value);

  // Define the signMessage function which is used to sign the message
  const handleSendTransaction = async () => {
    if (user && web3) {
      try {
        setLoading(true);
        // Sign the message using the connected wallet
        const tx = await web3.eth.sendTransaction({
          to: destinationAddress,
          value: web3.utils.toWei(value, "ether"),
        });
        setLoading(false);
        // console.log(web3.utils.toWei(value, "ether"));
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
          {/* Input field for the message to be signed */}
          <Input
            placeholder="Enter Value"
            maxLength={20}
            onChange={handleInputValue}
            w="300px"
          />
          <Input
            placeholder="Enter destinationAddress"
            maxLength={42}
            onChange={handleDestinationAddress}
            w="300px"
          />
          {/* Button to trigger the signMessage function */}
          <Button onClick={handleSendTransaction}>
            {loading ? "Sending Eth....." : "Send Eth"}
          </Button>
        </VStack>
        {/* Display the signature if available */}
      </Box>
    </HStack>
  );
};

export default SendTransaction;
