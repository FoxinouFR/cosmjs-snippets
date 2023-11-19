
import { Tendermint37Client, pubkeyToRawAddress } from "@cosmjs/tendermint-rpc";
import { QueryClient, setupStakingExtension } from "@cosmjs/stargate";
import { fromBase64, toBech32 } from "@cosmjs/encoding";
import { decodePubkey } from "@cosmjs/proto-signing";

const rpcEndpoint = "https://rpc.cosmos.directory/bitsong";
const validatorAddress = "bitsongvaloper1cqg5qc5zce7rkga8cwdyk6g55jnsweyrt3lw7v";
const valconsPrefix = "bitsongvalcons";

// Query client
const tmClient = await Tendermint37Client.connect(rpcEndpoint);
const queryClient = QueryClient.withExtensions(tmClient, setupStakingExtension);

// Obtenir la clef de consensus publique
const validator = await queryClient.staking.validator(validatorAddress);

// Convertir consensusPubkey en adresse
const pubkey = decodePubkey(validator.validator.consensusPubkey);
const address8Array = pubkeyToRawAddress("ed25519", fromBase64(pubkey.value));
const valconsAddress = toBech32(valconsPrefix, address8Array);

console.log(valconsAddress);
