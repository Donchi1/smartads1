declare module 'tronweb' {
  export default class TronWeb {
    constructor(options: TronWebOptions);

    // Methods related to accounts
    createAccount(): Promise<Account>;
    isAddress(address: string): boolean;
    toHex(address: string): string;
    fromHex(address: string): string;
    setPrivateKey(privateKey: string): void;

    // Encoding and Decoding methods
    fromAscii(str: string, padding?: number): string;
    toAscii(hex: string): string;
    fromUtf8(str: string, padding?: number): string;
    toUtf8(hex: string): string;
    toBigNumber(amount: number | string): BigNumber;

    // Transaction methods
    sign(transaction: any, privateKey?: string): Promise<any>;
    sendRawTransaction(signedTransaction: any): Promise<any>;
    getTransaction(transactionID: string): Promise<Transaction>;
    getTransactionInfo(transactionID: string): Promise<TransactionInfo>;

    // TRX Balance methods
    getBalance(address: string): Promise<number>;
    getUnconfirmedBalance(address: string): Promise<number>;
    getAccount(address: string): Promise<Account>;

    // Contract methods
    contract(abi: any[], address?: string): Contract;

    // Network methods
    getBlock(blockIdentifier?: number | string): Promise<Block>;
    getBlockNumber(): Promise<number>;

    // Other methods
    trx: {

        getCurrentBlock(): Promise<{blockID:string}>;
        getBalance(address: string): Promise<number>;
        sendTransaction(to: string, amount: number | string): Promise<any>;
        sign(transaction: any, privateKey?: string): Promise<any>;
        getAccount(address: string): Promise<Account>;
        getTransaction(transactionID: string): Promise<Transaction>;
        getTransactionInfo(transactionID: string): Promise<TransactionInfo>;
      };
    

    utils: {
      isAddress(address: string): boolean;
      fromUtf8(str: string): string;
      toUtf8(hex: string): string;
      toHex(str: string): string;
      fromHex(str: string): string;
      toAscii(str: string): string;
      fromAscii(str: string): string;
    };
  }

  // TronWeb Options Interface
  interface TronWebOptions {
    fullHost?: string | TronWebFullHost;
    privateKey?: string;
    solidityNode: string;
    eventServer: string;
    headers?: Record<string, string>;
  }

  interface TronWebFullHost {
    fullNode: string;
    solidityNode: string;
    eventServer: string;
    headers?: Record<string, string>;
  }

  // Types related to transactions
  interface Transaction {
    visible: boolean;
    txID: string;
    raw_data: any;
    raw_data_hex: string;
    signature?: string[];
  }

  interface TransactionInfo {
    id: string;
    fee: number;
    blockNumber: number;
    blockTimeStamp: number;
    contractResult: string[];
    contract_address: string;
    receipt: {
      net_usage: number;
      energy_usage: number;
      energy_usage_total: number;
      net_fee: number;
      result: string;
    };
  }

  // Types related to blocks
  interface Block {
    blockID: string;
    block_header: BlockHeader;
    transactions?: Transaction[];
  }

  interface BlockHeader {
    raw_data: {
      number: number;
      txTrieRoot: string;
      witness_address: string;
      parentHash: string;
      version: number;
      timestamp: number;
    };
    witness_signature: string;
  }

  // Account and Contract Types
  interface Account {
    address: string;
    balance: number;
    account_name?: string;
    type: string;
    active?: boolean;
  }

  interface Contract {
    new(options?: any): ContractInstance;
    at(address: string): ContractInstance;
  }

  interface ContractInstance {
    address: string;
    abi: any[];
    bytecode: string;
    balanceOf: (address: string) => {
      call: CallFunction<TronWeb.BigNumber>;
    };
    methods: {
      [methodName: string]: (...args: any[]) => {
        call: (options?: any) => Promise<any>;
        send: (options?: any) => Promise<any>;
        estimateGas: (options?: any) => Promise<number>;
      };
    };
  }

  // Utility Types
  interface BigNumber {
    toString(base?: number): string;
    toFixed(decimalPlaces?: number): string;
  }
}