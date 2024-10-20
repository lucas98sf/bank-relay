/**
 * @generated SignedSource<<32c9a7f1a5c0a4500fe27ea5dec73d79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type registerMutation$variables = {
  email: string;
  password: string;
};
export type registerMutation$data = {
  readonly register: {
    readonly __typename?: string;
    readonly data?: string;
    readonly error?: string | null | undefined;
  } | null | undefined;
};
export type registerMutation = {
  response: registerMutation$data;
  variables: registerMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "email",
    "variableName": "email"
  },
  {
    "kind": "Variable",
    "name": "password",
    "variableName": "password"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "data",
      "storageKey": null
    }
  ],
  "type": "MutationRegisterSuccess",
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
    "name": "registerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "register",
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
    "name": "registerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "register",
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
    "cacheID": "46ac2e5510c6ccf71e054a2de1b46175",
    "id": null,
    "metadata": {},
    "name": "registerMutation",
    "operationKind": "mutation",
    "text": "mutation registerMutation(\n  $email: String!\n  $password: String!\n) {\n  register(email: $email, password: $password) {\n    __typename\n    ... on MutationRegisterSuccess {\n      data\n    }\n    ... on Error {\n      __isError: __typename\n      __typename\n      error\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "37faca5f0968f7dd5c92bd7c2d8eed5a";

export default node;
