export const EOFK_ADDRESSES: Record<number, string> = {
    919: "0x9745858b95a80CeAC0C032Bd104b2f24289ae251", // Mode Sepolia
};

export const EOFK_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_enemy",
                type: "address",
            },
        ],
        name: "declareEnemy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "enemy",
                type: "address",
            },
        ],
        name: "EnemyDeclared",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "exEnemy",
                type: "address",
            },
        ],
        name: "EnemyRemoved",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_enemy",
                type: "address",
            },
        ],
        name: "forgiveEnemy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "isEnemy",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;
