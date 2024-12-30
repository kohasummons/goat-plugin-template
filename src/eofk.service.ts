import { Tool } from "@goat-sdk/core"; // The @Tool decorator is used to define tools
import { EVMWalletClient } from "@goat-sdk/wallet-evm"; // Wallet client for EVM chains
import { EOFK_ABI, EOFK_ADDRESSES } from "./abi/eofk"; // ABI and contract addresses
import {
    DeclareEnemyParams,
    ForgiveEnemyParams,
    isEnemyParams,
} from "./parameters"; // Parameter schemas for input validation

// Service class for interacting with the EnemiesOfKoha (EoK) contract
export class eofkService {
    @Tool({
        name: "eofk_declare_enemy", // tool name
        description:
            "Declare an enemy. This adds an address to a mapping of enemies. First check if the address is an enemy. If it is not, declare it.",
    })
    async declareEnemy(
        walletClient: EVMWalletClient, // Wallet client instance
        parameters: DeclareEnemyParams // Validated parameters for the tool
    ): Promise<string> {

        try {
            // Get the current chain information from the wallet client
            const network = walletClient.getChain();
            if (!network?.id) {
                throw new Error("Unable to determine chain ID from wallet client");
            }

            // Resolve the contract address for the current chain
            const address = EOFK_ADDRESSES[network.id];
            const contractAddress = await walletClient.resolveAddress(address);

            // Send the transaction to declare an enemy
            const { hash } = await walletClient.sendTransaction({
                to: contractAddress,
                abi: EOFK_ABI,
                functionName: "declareEnemy",
                args: [parameters.enemy as `0x${string}`], // Address of the enemy to declare
            });

            console.log("🔴 Transaction Hash:", hash);

            return hash; // Return the transaction hash
        } catch (error) {
            throw new Error(`Failed to declare enemy: ${error}`);
        }
    }

    @Tool({
        name: "eofk_forgive_enemy", // tool name
        description:
            "Forgive an enemy. This removes an address from a mapping of enemies. First check if the address is an enemy. If it is, forgive it.",
    })
    async forgiveEnemy(
        walletClient: EVMWalletClient, // Wallet client instance
        parameters: ForgiveEnemyParams // Validated parameters for the tool
    ): Promise<string> {
        try {
            const { enemy } = parameters; // Extract the enemy address from parameters

            // Get the current chain information from the wallet client
            const network = walletClient.getChain();
            if (!network?.id) {
                throw new Error("Unable to determine chain ID from wallet client");
            }

            // Resolve the contract address for the current chain
            const address = EOFK_ADDRESSES[network.id];
            const contractAddress = await walletClient.resolveAddress(address);

            // Send the transaction to forgive an enemy
            const { hash } = await walletClient.sendTransaction({
                to: contractAddress,
                abi: EOFK_ABI,
                functionName: "forgiveEnemy",
                args: [parameters.enemy as `0x${string}`], // Address of the enemy to forgive
            });

            console.log("🔴 Transaction Hash:", hash);

            return hash; // Return the transaction hash
        } catch (error) {
            throw new Error(`Failed to forgive enemy: ${error}`);
        }
    }


    @Tool({
        name: "eofk_is_enemy", // tool name
        description:
            "Check if an address is an enemy. Returns true if the address is an enemy, false otherwise.",
    })
    async isEnemy(
        walletClient: EVMWalletClient, // Wallet client instance
        parameters: isEnemyParams // Validated parameters for the tool
    ): Promise<boolean> {
        try {
            // Get the current chain information from the wallet client
            const network = walletClient.getChain();
            if (!network?.id) {
                throw new Error("Unable to determine chain ID from wallet client");
            }

            // Resolve the contract address for the current chain
            const address = EOFK_ADDRESSES[network.id];
            const contractAddress = await walletClient.resolveAddress(address);

            // Read the contract state to check if the address is an enemy
            const value = await walletClient.read({
                address: contractAddress,
                abi: EOFK_ABI,
                functionName: "isEnemy",
                args: [parameters.address as `0x${string}`], // Address to check
            });

            const result = (value as { value: boolean }).value; // Extract the boolean result

            return result; // Return whether the address is an enemy
        } catch (error) {
            throw new Error(`Failed to check if address is an enemy: ${error}`);
        }
    }
}
