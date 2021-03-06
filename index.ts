import { Buffer } from "buffer";

export * from "./bchrpc_pb";

export interface IBchrpc {
    GetMempoolInfoResponse: any;
    GetMempoolResponse: any;
    GetRawTransactionResponse: any;
    GetTransactionResponse: any;
    GetAddressTransactionsResponse: any;
    GetUnspentOutputResponse: any;
    GetAddressUnspentOutputsResponse: any;
    GetRawBlockResponse: any;
    GetBlockResponse: any;
    GetBlockInfoResponse: any;
    GetBlockchainInfoResponse: any;
    GetHeadersResponse: any;
    SlpRequiredBurn: SlpRequiredBurn;
    SubmitTransactionResponse: SubmitTransactionResponse;
    CheckSlpTransactionResponse: any;
    GetSlpTokenMetadataResponse: any;
    GetSlpTrustedValidationResponse: any;
    GetSlpParsedScriptResponse: any;
    GetSlpGraphSearchResponse: any;
}

export interface IGrpcClient {

    getMempoolInfo(): Promise<IBchrpc["GetMempoolInfoResponse"]>;

    getRawMempool({
        fullTransactions,
    }: {
        fullTransactions?: boolean,
    }): Promise<IBchrpc["GetMempoolResponse"]>;

    getRawTransaction({ hash, reversedHashOrder }:
        { hash: string; reversedHashOrder?: boolean; }): Promise<IBchrpc["GetRawTransactionResponse"]>;

    getTransaction({
        hash,
        reversedHashOrder,
        includeTokenMetadata,
    }: {
        hash: string;
        reversedHashOrder?: boolean;
        includeTokenMetadata?: boolean;
    }): Promise<IBchrpc["GetTransactionResponse"]>;

    getAddressTransactions({ address, nbSkip, nbFetch, height, hash, reversedHashOrder }:
        { address: string,
            nbSkip?: number, nbFetch?: number,
            height?: number,
            hash?: string,
            reversedHashOrder?: boolean,
        }):
        Promise<IBchrpc["GetAddressTransactionsResponse"]>;

    getUnspentOutput({ hash, vout, reversedHashOrder, includeMempool, includeTokenMetadata }:
        { hash: string, vout: number, reversedHashOrder?: boolean,
            includeMempool?: boolean, includeTokenMetadata?: boolean }): Promise<IBchrpc["GetUnspentOutputResponse"]>;

    getAddressUtxos({ address, includeMempool, includeTokenMetadata }:
        { address: string, includeMempool?: boolean, includeTokenMetadata?: boolean } ): Promise<IBchrpc["GetAddressUnspentOutputsResponse"]>;

    getRawBlock({ index, hash, reversedHashOrder }:
        { index?: number, hash?: string; reversedHashOrder?: boolean; }): Promise<IBchrpc["GetRawBlockResponse"]>;

    getBlock({ index, hash, reversedHashOrder, fullTransactions }:
        { index?: number, hash?: string, reversedHashOrder?: boolean,
            fullTransactions?: boolean }): Promise<IBchrpc["GetBlockResponse"]>;

    getBlockInfo({ index, hash, reversedHashOrder }:
        { index?: number, hash?: string, reversedHashOrder?: boolean }): Promise<IBchrpc["GetBlockInfoResponse"]>;

    getBlockchainInfo(): Promise<IBchrpc["GetBlockchainInfoResponse"]>;

    getBlockHeaders(stopHash: string): Promise<IBchrpc["GetHeadersResponse"]>;

    submitTransaction({
        txnBuf,
        txnHex,
        txn,
        requiredSlpBurns,
        skipSlpValidityChecks,
    }: {
        txnBuf?: Buffer,
        txnHex?: string,
        txn?: Uint8Array,
        requiredSlpBurns?: Array<IBchrpc["SlpRequiredBurn"]|any>,
        skipSlpValidityChecks?: boolean,
    }): Promise<IBchrpc["SubmitTransactionResponse"]>;

    subscribeTransactions({
        includeMempoolAcceptance,
        includeBlockAcceptance,
        includeSerializedTxn,
        includeOnlySlp,
        slpTokenIds,
        addresses,
        outpoints,
    }: {
        includeMempoolAcceptance?: boolean,
        includeBlockAcceptance?: boolean,
        includeSerializedTxn?: boolean,
        includeOnlySlp?: boolean,
        slpTokenIds?: string[],
        addresses?: string[],
        outpoints?: Array<{ txid: Buffer, vout: number }>,
    }): Promise<any>;

    subscribeBlocks({
        includeSerializedBlock,
        includeTxnHashes,
        includeTxnData,
    }: {
        includeSerializedBlock?: boolean,
        includeTxnHashes?: boolean,
        includeTxnData?: boolean,
    }): Promise<any>;

    checkSlpTransaction({
        txnBuf,
        txnHex,
        txn,
        requiredSlpBurns,
        useSpecValidityJudgement,
    }: {
        txnBuf?: Buffer,
        txnHex?: string,
        txn?: Uint8Array,
        requiredSlpBurns?: Array<IBchrpc["SlpRequiredBurn"]|any>,
        useSpecValidityJudgement?: boolean,
    }): Promise<IBchrpc["CheckSlpTransactionResponse"]>;

    getTokenMetadata(tokenIds: string[]|Buffer[]): Promise<IBchrpc["GetSlpTokenMetadataResponse"]>

    getTrustedSlpValidation({
        txos,
        reversedHashOrder,
        includeGraphSearchCount
    }: {
        txos: Array<{ hash: string; vout: number; }>,
        reversedHashOrder?: boolean,
        includeGraphSearchCount?: boolean
    }): Promise<IBchrpc["GetSlpTrustedValidationResponse"]>;

    getParsedSlpScript(script: string|Buffer): Promise<IBchrpc["GetSlpParsedScriptResponse"]>;

    getGraphSearchFor({
        hash,
        reversedHashOrder,
        knownValidHashes
    }: {
        hash: string,
        reversedHashOrder: boolean,
        knownValidHashes?: string[]
    }): Promise<IBchrpc["GetSlpGraphSearchResponse"]>;
}

export interface SlpRequiredBurn {
    tokenId: Buffer;
    tokenType: number;
    outpointHash?: Buffer;
    outpointVout?: number;
    amount?: string;
    setMintBatonVout?: number;
}

export interface SubmitTransactionResponse {
    getHash(): Uint8Array | string;
    getHash_asU8(): Uint8Array;
    getHash_asB64(): string;
    setHash(value: Uint8Array | string): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): any;
}
