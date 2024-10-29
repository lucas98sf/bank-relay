/**
 * @generated SignedSource<<3081719f3f6de5bc6fe5fd3dd7213b80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sendMoneyMutation$variables = {
  amount: number;
  fromAccountId: string;
  toAccountId: string;
};
export type sendMoneyMutation$data = {
  readonly sendTransaction: {
    readonly __typename?: string;
    readonly data?: {
      readonly amount: number | null | undefined;
      readonly " $fragmentSpreads": FragmentRefs<"TransactionItem_transaction">;
    };
    readonly error?: string | null | undefined;
  } | null | undefined;
};
export type sendMoneyMutation = {
  response: sendMoneyMutation$data;
  variables: sendMoneyMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "amount"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "fromAccountId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "toAccountId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "amount",
    "variableName": "amount"
  },
  {
    "kind": "Variable",
    "name": "fromAccountId",
    "variableName": "fromAccountId"
  },
  {
    "kind": "Variable",
    "name": "toAccountId",
    "variableName": "toAccountId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "error",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
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
      },
      (v5/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sendMoneyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "sendTransaction",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Transaction",
                "kind": "LinkedField",
                "name": "data",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "TransactionItem_transaction"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "MutationSendTransactionSuccess",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "type": "Error",
            "abstractKey": "__isError"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "sendMoneyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "sendTransaction",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Transaction",
                "kind": "LinkedField",
                "name": "data",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v5/*: any*/),
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
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Account",
                    "kind": "LinkedField",
                    "name": "toAccount",
                    "plural": false,
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "MutationSendTransactionSuccess",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/)
            ],
            "type": "Error",
            "abstractKey": "__isError"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c166a04b0958575fa7ca5797e2b8b22a",
    "id": null,
    "metadata": {},
    "name": "sendMoneyMutation",
    "operationKind": "mutation",
    "text": "mutation sendMoneyMutation(\n  $amount: Int!\n  $fromAccountId: String!\n  $toAccountId: String!\n) {\n  sendTransaction(amount: $amount, fromAccountId: $fromAccountId, toAccountId: $toAccountId) {\n    __typename\n    ... on MutationSendTransactionSuccess {\n      data {\n        amount\n        ...TransactionItem_transaction\n        id\n      }\n    }\n    ... on Error {\n      __isError: __typename\n      __typename\n      error\n    }\n  }\n}\n\nfragment TransactionItem_transaction on Transaction {\n  id\n  amount\n  createdAt\n  fromAccount {\n    id\n    user {\n      email\n      id\n    }\n  }\n  toAccount {\n    id\n    user {\n      email\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "df423eee5d7fed72093efbe63eb59785";

export default node;
