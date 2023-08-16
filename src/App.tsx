import { VStack } from "@chakra-ui/react";
import { useUser } from "./context/UserContext";
import ConnectButton from "./components/ConnectButton";
import WalletDetail from "./components/WalletDetail";
import DisconnectButton from "./components/DisconnectButton";
import ShowUIButton from "./components/ShowUIButton";
import SignMessage from "./components/SignMessage";
import SendTransaction from "./components/SendTransaction";
import ContractTransaction from "./components/ContractTransaction";

function App() {
  // Use the UserContext to get the current logged-in user
  const { user } = useUser();

  return (
    <VStack justifyContent="center" alignItems="center" minH="100vh">
      {/* If no user is available, display the Connect button.
          Otherwise, display the Wallet details, Sign Message Component, Disconnect button, and ShowUI button. */}
      {!user ? (
        <ConnectButton />
      ) : (
        <>
          <WalletDetail />
          <SignMessage />
          <SendTransaction />
          <ContractTransaction />
          <DisconnectButton />
          <ShowUIButton />
        </>
      )}
    </VStack>
  );
}

export default App;
