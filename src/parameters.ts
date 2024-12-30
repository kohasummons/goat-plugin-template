import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

/**
 * Schema for declaring an enemy.
 */
export class DeclareEnemyParams extends createToolParameters(
    z.object({
        enemy: z
            .string()
            .regex(
                /^0x[a-fA-F0-9]{40}$/,
                "The enemy must be a valid Ethereum address 42 hexadecimal characters included 0x-prefixed."
            ),
    })
) {}

/**
 * Schema for forgiving an enemy.
 */
export class ForgiveEnemyParams extends createToolParameters(
    z.object({
        enemy: z
            .string()
            .regex(
                /^0x[a-fA-F0-9]{40}$/,
                "The enemy must be a valid Ethereum address 42 hexadecimal characters included 0x-prefixed."
            ),
    })
) {}

/**
 * Schema for checking if an address is an enemy.
 */
export class isEnemyParams extends createToolParameters(
    z.object({
        address: z
            .string()
            .regex(
                /^0x[a-fA-F0-9]{40}$/,
                "The address must be a valid Ethereum address 42 hexadecimal characters included 0x-prefixed."
            ),
    })
) {}