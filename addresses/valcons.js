/*
 * This script is designed to interact with the BitSong blockchain network using Tendermint Client.
 * It establishes a connection to the network via an RPC address found in the cosmos.directory directory, and attempts to connect to a node of the blockchain.
 * Once connected, it fetches the data of a given validator, particularly its consensus public key.
 * Finally, the public consensus address is converted into a string in the bitsongvalcons...xxx format.
*/

import { Tendermint37Client, pubkeyToRawAddress } from "@cosmjs/tendermint-rpc";
import { QueryClient, setupStakingExtension } from "@cosmjs/stargate";
import { fromBase64, toBech32 } from "@cosmjs/encoding";
import { decodePubkey } from "@cosmjs/proto-signing";

const rpcEndpoint = "https://rpc.cosmos.directory/bitsong";
const validatorAddress = "bitsongvaloper1cqg5qc5zce7rkga8cwdyk6g55jnsweyrt3lw7v";
const valconsPrefix = "bitsongvalcons";

const tmClient = await Tendermint37Client.connect(rpcEndpoint);
const queryClient = QueryClient.withExtensions(tmClient, setupStakingExtension);

const validator = await queryClient.staking.validator(validatorAddress);

const pubkey = decodePubkey(validator.validator.consensusPubkey);
const address8Array = pubkeyToRawAddress("ed25519", fromBase64(pubkey.value));
const valconsAddress = toBech32(valconsPrefix, address8Array);

console.log(valconsAddress);
