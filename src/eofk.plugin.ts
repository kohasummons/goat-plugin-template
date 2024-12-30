import { modeTestnet } from "viem/chains";
import { eofkService } from "./eofk.service";
import { type Chain, PluginBase } from "@goat-sdk/core";
import type { EVMWalletClient } from "@goat-sdk/wallet-evm";

// Define the supported blockchain networks for this plugin
const SUPPORTED_CHAINS = [modeTestnet];

// Define the EoFK Plugin class by extending the PluginBase class
export class eofkPlugin extends PluginBase<EVMWalletClient> {
    constructor() {
        // Call the superclass constructor with the plugin name ("eofk") and the service
        super("eofk", [new eofkService()]);
    }

     // Define the logic for checking if the plugin supports a given blockchain chain
    supportsChain = (chain: Chain) => chain.type === "evm" && SUPPORTED_CHAINS.some((c) => c.id === chain.id);
}

// Export a factory function to create a new instance of the plugin
export const eofk = () => new eofkPlugin();
