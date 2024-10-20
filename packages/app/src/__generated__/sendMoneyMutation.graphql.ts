/**
 * @generated SignedSource<<4e5cf5ee80574fb00b723f2c82929d7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
      readonly id: string;
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MutationSendTransactionSuccess",
  "abstractKey": null
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
};
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
          (v2/*: any*/),
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
          (v2/*: any*/),
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
    "cacheID": "85524773b04fbd813befa779a19c3586",
    "id": null,
    "metadata": {},
    "name": "sendMoneyMutation",
    "operationKind": "mutation",
    "text": "mutation sendMoneyMutation(\n  $amount: Int!\n  $fromAccountId: String!\n  $toAccountId: String!\n) {\n  sendTransaction(amount: $amount, fromAccountId: $fromAccountId, toAccountId: $toAccountId) {\n    __typename\n    ... on MutationSendTransactionSuccess {\n      data {\n        id\n        amount\n      }\n    }\n    ... on Error {\n      __isError: __typename\n      __typename\n      error\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "899b84ee260ae50aa2564960a547279f";

export default node;
