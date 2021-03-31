import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as demo_idl,
  canisterId as demo_id,
} from "dfx-generated/phone_book";

const agent = new HttpAgent();
const actor = Actor.createActor(demo_idl, { agent, canisterId: demo_id });

export default actor;
