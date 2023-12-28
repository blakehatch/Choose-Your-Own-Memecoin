
import type {
    SelectedPick
  } from "@xata.io/client";

import type {
    TokenomicsRecord
} from "../xata";

export type NumbericI = {
    value?: number;
    increment: number;
    id: string;
    title: string;
    voted: boolean;
    wallets: any;
};