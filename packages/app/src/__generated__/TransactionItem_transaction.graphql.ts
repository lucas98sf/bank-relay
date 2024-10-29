/**
 * @generated SignedSource<<bc4190b1dcbd1998939fca673ab73d21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransactionItem_transaction$data = {
  readonly amount: number | null | undefined;
  readonly createdAt: any | null | undefined;
  readonly fromAccount: {
    readonly id: string;
    readonly user: {
      readonly email: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly id: string;
  readonly toAccount: {
    readonly id: string;
    readonly user: {
      readonly email: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "TransactionItem_transaction";
};
export type TransactionItem_transaction$key = {
  readonly " $data"?: TransactionItem_transaction$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransactionItem_transaction">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransactionItem_transaction",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "fromAccount",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "toAccount",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Transaction",
  "abstractKey": null
};
})();

(node as any).hash = "e9dda6415249a74ef7e10f1246c9f93a";

export default node;
