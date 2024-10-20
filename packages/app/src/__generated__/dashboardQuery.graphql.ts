/**
 * @generated SignedSource<<236c829cbe7089f8764dd02854f9eda9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type dashboardQuery$variables = Record<PropertyKey, never>;
export type dashboardQuery$data = {
  readonly accounts: {
    readonly data?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly _id: string | null | undefined;
          readonly balance: number | null | undefined;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type dashboardQuery = {
  response: dashboardQuery$data;
  variables: dashboardQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "QueryAccountsConnection",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "QueryAccountsConnectionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Account",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "_id",
                  "storageKey": null
                },
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
                  "name": "balance",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "QueryAccountsSuccess",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "dashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accounts",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "accounts(first:1)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "dashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accounts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "accounts(first:1)"
      }
    ]
  },
  "params": {
    "cacheID": "d30e11d44a6fffe83f52d9901fed71f6",
    "id": null,
    "metadata": {},
    "name": "dashboardQuery",
    "operationKind": "query",
    "text": "query dashboardQuery {\n  accounts(first: 1) {\n    __typename\n    ... on QueryAccountsSuccess {\n      data {\n        edges {\n          node {\n            _id\n            id\n            balance\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e2f2e6b5e563d0e459369030e830ff67";

export default node;
